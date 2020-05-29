// Start Navigation
function init(){ // Initial animation of hori-selector
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
    setTimeout(function(){ init(); }, 300); // Runs init when page first loaded
  });
  $(window).on('resize', function(){
    setTimeout(function(){ init(); }, 500); // Runs init when page resized to ensure its in the correct place
  });
  $(".navbar-toggler").click(function(){
    setTimeout(function(){ init(); }); // Runs animation when navbar toggler pressed to add mobile support
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
        document.getElementById("toggler").click() // Closes nav toggler when a link is pressed in mobile view
      }
        _link = encodeURIComponent(($(this).attr("href")).trim()); // Get the href of the link pressed and decode it
        history.pushState(null, null, _link); // Add link to browser history
        loadContent(_link); // Run custom load instead of redirect
        return false; // Cancel redirection to prevent page loading like normal
    });

    function loadContent(href) {

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
            setTimeout(async function(){ // Set timeout instead of loading immediatly to allow for DOM delays e.g. loading of scroll bar
              // The following animates moving the hori selector and setting the active link
              $('#navbarSupportedContent ul li').removeClass("active");
              $('#navbarSupportedContent ul li a[href*="'+decodeURI(href)+'"]').parent().addClass("active")
              await $.get(location.href, function( my_var ) { document.title = $('<div />').append($.parseHTML(my_var)).find('title').text(); }) // Fetches title of page loaded and sets it
              var thiss = document.getElementsByClassName("active")[0]
              var activeWidthNewAnimHeight = $(thiss).innerHeight();
              var activeWidthNewAnimWidth = $(thiss).innerWidth();
              var itemPosNewAnimTop = $(thiss).position();
              var itemPosNewAnimLeft = $(thiss).position();
              $(".hori-selector").css({
                "top":itemPosNewAnimTop.top + "px", 
                "left":itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
              });
            }, 500);
         });

    });

  });
};
    
    $(window).bind('popstate', function(){ // Run on forward or back pressed
      _link = location.pathname.replace(/^.*[\\\/]/, ''); // Get filename only of the history link
      if(_link == ""){
        _link = "index.html" // Adds support for going back to just https://futurelucas4502.github.io/
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