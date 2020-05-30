// Start Navigation
var mobilehref
function init(href){ // Initial animation of hori-selector
  if(href != undefined){
    $('#navbarSupportedContent ul li').removeClass("active");
    $('#navbarSupportedContent ul li a[href*="'+decodeURI(href)+'"]').parent().addClass("active")
  }
  if(mobilehref != undefined){
    $('#navbarSupportedContent ul li').removeClass("active");
    $('#navbarSupportedContent ul li a[href*="'+decodeURI(mobilehref)+'"]').parent().addClass("active")
    mobilehref = undefined
  }
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
  };

  $(document).ready(function(){
    setTimeout(function(){ init(); }, 700); // Runs init when page first loaded
  });
  $(window).on('resize', function(){
    setTimeout(function(){ init(); }, 500); // Runs init when page resized to ensure its in the correct place
  });
  $(".navbar-toggler").click(function(){
      console.log("toggler clicked")
      setTimeout(function(){ init(); }, 200);
  });

  $(function() {

    if(Modernizr.history){ // Check if history pushing is enabled in this browser its 2020 so this probably isnt nessecary but just in case

    var $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0;
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("nav").delegate("a", "click", function() { // The code that executes when link pressed
      if (!(getComputedStyle(document.getElementById("toggler"), null).display == "none")){
        $('.navbar-collapse').collapse('hide'); // Closes nav toggler when a link is pressed in mobile view
      }
      try {
        _link = encodeURIComponent(($(this).attr("href")).trim()); // Get the href of the link pressed and decode it
        history.pushState(null, null, _link); // Add link to browser history
        loadContent(_link); // Run custom load instead of redirect
        return false; // Cancel redirection to prevent page loading like normal
      } catch {
        console.log("Dropdown pressed - I know this is a bad practise try catch ill fix it when the dropdown is fixed.")
      }
    });

    function loadContent(href) {
      if(href == "index.html")setTimeout(function(){indexReady()}, 500); // Set timeout instead of loading immediatly to allow for DOM delays

  $mainContent
    .find("#guts")
    .fadeOut(200, function() { // Fade out the content of the current page
      $mainContent
        .hide()
        .load(href + " #guts", function() { // Load the contents of whatever href is
          $mainContent.fadeIn(200, function() { // Fade in the content of the href
            $pageWrap.animate({
              height: baseHeight + $mainContent.height() + "px" // Smooth animate the page extending as the data fades in
            });
             // The following animates moving the hori selector and setting the active link
            $.get(location.href, function( my_var ) { document.title = $('<div />').append($.parseHTML(my_var)).find('title').text(); }) // Fetches title of page loaded and sets it
            if (getComputedStyle(document.getElementById("toggler"), null).display == "none"){
              setTimeout(function(){init(href)}, 700); // Set timeout instead of loading immediatly to allow for DOM delays e.g. loading of scroll bar
            } else {
              mobilehref = href
            }
         });
    });
  });
};
    
    $(window).bind('popstate', function(){ // Run on forward or back pressed
      _link = location.pathname.replace(/^.*[\\\/]/, ''); // Get filename only of the history link
      if(_link == "" || _link == "index"){
        _link = "index.html" // Adds support for going back to just https://futurelucas4502.github.io/
      }
      if (!(getComputedStyle(document.getElementById("toggler"), null).display == "none")){
        $('.navbar-collapse').collapse('hide'); // Closes nav toggler before loading past or future content
      }
      loadContent(_link); // Runs the load content function using the history href/_link
    });

}; // else {History is not supported, so nothing fancy here.}
});
$(document).ready(function () { // Closes nav toggler if opened on mobile and you dont press on it
  $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = !$(".navbar-toggler").hasClass("collapsed");
      if (_opened === true && !clickover.parent().hasClass("navbar-toggler")){
        document.getElementById("toggler").click()
      }
  });
});

// End Navigation

// Start Home Cards Loading
$(document).ready(function () {
  if(document.location.href == "https://futurelucas4502.github.io/index.html" || document.location == "https://futurelucas4502.github.io/index" || document.location == "https://futurelucas4502.github.io/" || document.location.href == "http://localhost/futurelucas4502.github.io/index.html" || document.location == "http://localhost/futurelucas4502.github.io/index" || document.location == "http://localhost/futurelucas4502.github.io/"){
    indexReady()
  } else {
    
  }
})
let response
async function indexReady() {
  response = await fetch("https://api.github.com/users/futurelucas4502/repos");
  response = await response.json();
  document.getElementById("loading").style.display = "none"
  for (let i = 0; i < response.length; i++) {
    var name = response[i]["name"].replace(/_/g, ' ');
    name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    document.getElementById("cards").innerHTML += `
    <div class="col-sm d-flex justify-content-center">
      <div class="card" style="width: 18rem;margin-top:20px">
        <img style="height:180px" id="${response[i]["name"]}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${response[i]["description"]}</p>
          <div class="vertical">
            <a style="display: block!important;margin-bottom:10px" href="#" class="btn btn-primary">View</a>
            <a style="display: block!important;" href="${response[i]["html_url"]}" class="btn btn-dark"><i class="fab fa-github"></i> View on GitHub</a>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById(response[i]["name"]).style.backgroundImage = `url(https://raw.githubusercontent.com/futurelucas4502/${response[i]['name']}/master/assets/screenshot.png),url(./assets/images/404.png)`
  }
}
// End Home Cards Loading