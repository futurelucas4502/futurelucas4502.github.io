// Start Navigation
var mobilehref
var converter = new showdown.Converter();
var closeNavMobile = window.matchMedia("(max-width: 991px)")
closeNavMobile.addListener(closeNavMobileFunc) // Attach listener function on state changes

function closeNavMobileFunc(){
    $('.navbar-collapse').collapse('hide');
}
function init(href){ // Initial animation of hori-selector
  if(href != undefined){
    $('#navbarSupportedContent ul li').removeClass("active");
    if($('#navbarSupportedContent ul li a[href="'+decodeURI(href)+'"]').parent()[0].id == "navDropdownInner"){
      $('#navbarSupportedContent ul li a[href="'+decodeURI(href)+'"]').parent().parent().addClass("active")
    } else {
      $('#navbarSupportedContent ul li a[href="'+decodeURI(href)+'"]').parent().addClass("active")
    }
  }
  if(mobilehref != undefined){
    $('#navbarSupportedContent ul li').removeClass("active");
    if($('#navbarSupportedContent ul li a[href="'+decodeURI(mobilehref)+'"]').parent()[0].id == "navDropdownInner"){
      $('#navbarSupportedContent ul li a[href="'+decodeURI(mobilehref)+'"]').parent().parent().addClass("active")
    } else {
      $('#navbarSupportedContent ul li a[href="'+decodeURI(mobilehref)+'"]').parent().addClass("active")
    }
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
    setTimeout(function(){ mobileNavRightCut(); }, 275)
  };

  $(window).on('resize', function(){
    setTimeout(function(){ init(); }, 500); // Runs init when page resized to ensure its in the correct place
  });
  $(".navbar-toggler").click(function(){
      console.log("toggler clicked")
      setTimeout(function(){ init(); }, 200);
  });

  $(function() {
    if(Modernizr.history){ // Check if history pushing is enabled in this browser its 2020 so this probably isnt nessecary but just in case
    $("nav").delegate("a", "click", function(e) { // The code that executes when link pressed
      if (getComputedStyle(document.getElementById("toggler"), null).display != "none" && this.id != "navbarDropdown"){
        $('.navbar-collapse').collapse('hide'); // Closes nav toggler when a link is pressed in mobile view
      }
      try {
        _link = ($(this).attr("href")).trim(); // Get the href of the link pressed and decode it
        history.pushState(null, null, _link); // Add link to browser history
        loadContent(_link); // Run custom load instead of redirect
        e.preventDefault(); // Cancel redirection to prevent page loading like normal
      } catch {
      }
    });

    function loadContent(href) {
      if(href == "index.html"){
        indexReady()
      }else {
        otherReady(href.split("=")[1])
      }
      if (getComputedStyle(document.getElementById("toggler"), null).display == "none"){
        setTimeout(function(){init(href)}, 400); // Set timeout instead of loading immediatly to allow for DOM delays e.g. loading of scroll bar
      } else {
        mobilehref = href
      }
    };
    
    $(window).bind('popstate', function(){ // Run on forward or back pressed
      _link = location.pathname.replace(/^.*[\\\/]/, '') // Get filename only of the history link
      if(location.href.split("?")[1] != undefined)_link+=("?"+location.href.split("?")[1]); // Add the page request
      if(_link == "" || _link == "index"){
        _link = "index.html" // Adds support for going back to just https://futurelucas4502.github.io/
      }
      if (!(getComputedStyle(document.getElementById("toggler"), null).display == "none")){
        $('.navbar-collapse').collapse('hide'); // Closes nav toggler before loading past or future content
      }
      loadContent(_link); // Runs the load content function using the history href/_link
    });

} // else {History is not supported, so nothing fancy here.}
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

function mobileNavRightCut(){
  if($('#navbarSupportedContent').find('.active')[0].children[0].id == "navbarDropdown" && closeNavMobile.matches){
    document.getElementById("right").style.display = "none"
  } else{
    document.getElementById("right").style.display = "block"
  }
}

// End Navigation

// Start Basic Page Setup
let indexResponse = undefined
$(document).ready(async function () {
  indexResponse = await fetch("https://api.github.com/users/futurelucas4502/repos");
  indexResponse = await indexResponse.json();
  if(document.location.href == "https://futurelucas4502.github.io/index.html" || document.location.href == "https://futurelucas4502.github.io/index" || document.location.href == "https://futurelucas4502.github.io/" || document.location.href == "http://localhost/futurelucas4502.github.io/index.html" || document.location.href == "http://localhost/futurelucas4502.github.io/index" || document.location.href == "http://localhost/futurelucas4502.github.io/"){
    indexReady()
  } else {
    otherReady(location.href.split("=")[1])
  }
  for (let i = 0; i < indexResponse.length; i++) { // Add links to dropdown
    var name = indexResponse[i]["name"].replace(/_/g, ' ');
    name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    if(name == "Management Console" || name == "Management Console Mobile"){
    }else {
      document.getElementById("navDropdownInner").innerHTML += `<a href="index.html?page=${indexResponse[i]["name"]}" class="dropdown-item">${name}</a>`
    }
  }
  if(location.href.split("?")[1] != undefined){
    $('#navbarSupportedContent ul li').removeClass("active");
    if($('#navbarSupportedContent ul li a[href="'+decodeURI("index.html?"+location.href.split("?")[1])+'"]').parent()[0].id == "navDropdownInner"){
      $('#navbarSupportedContent ul li a[href="'+decodeURI("index.html?"+location.href.split("?")[1])+'"]').parent().parent().addClass("active")
    } else {
      $('#navbarSupportedContent ul li a[href="'+decodeURI("index.html?"+location.href.split("?")[1])+'"]').parent().addClass("active")
    }
  }
  setTimeout(function(){ init(); }, 700); // Runs init when page first loaded
})
async function indexReady() {
  document.getElementById("main-content").innerHTML = `<div style="margin:20px 0px" class="text-center">
  <h1>Welcome to my work and personal projects!</h1>
  <h6 class="text-muted">Only my Open-Source work and projects are shown as some work needs to be kept
      Closed-Source.</h6>
  <div class="container">
      <h4 style="margin:20px 0px" class="text-muted" id="loading"><span class="spinner-border m-1"
              style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status"
              aria-hidden="true"></span>Loading...</h4>
      <div id="content">
        <div class="row" id="cards"></div>
      </div>
  </div>
  <h6 style="margin:20px 0px" class="text-muted">Disclaimer: All work shown here is owned and
      maintained by Lucas Wilson (futurelucas4502).</h6>
</div>`
if(indexResponse == undefined){
  indexResponse = await fetch("https://api.github.com/users/futurelucas4502/repos");
  indexResponse = await indexResponse.json();
}
  for (let i = 0; i < indexResponse.length; i++) {
    var name = indexResponse[i]["name"].replace(/_/g, ' ');
    name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    document.getElementById("loading").style.display = "none"
    document.getElementById("cards").innerHTML += `
    <div class="col-sm d-flex justify-content-center">
      <div class="card" style="width: 18rem;margin-top:20px">
        <img style="height:180px" id="${indexResponse[i]["name"]}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${indexResponse[i]["description"]}</p>
          <div class="vertical">
            <a style="display: block!important;margin-bottom:10px" href="index.html?page=${indexResponse[i]["name"]}" class="btn btn-primary">View</a>
            <a style="display: block!important;" href="${indexResponse[i]["html_url"]}" class="btn btn-dark"><i class="fab fa-github"></i> View on GitHub</a>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById(indexResponse[i]["name"]).style.backgroundImage = `url(https://raw.githubusercontent.com/futurelucas4502/${indexResponse[i]['name']}/master/assets/screenshot.png),url(./assets/images/404.png)`
  }
}
// End Basic Page Setup

// Start Other Pages Loading
let otherResponse = Array
async function otherReady(name) {
  document.getElementById("main-content").innerHTML = `<div style="margin:20px 0px" class="text-center">
  <div class="container">
      <h4 style="margin:20px 0px" class="text-muted" id="loading"><span class="spinner-border m-1"
              style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status"
              aria-hidden="true"></span>Loading...</h4>
      <div id="content">
        <div class="row" id="cards"></div>
      </div>
  </div>
  <h6 style="margin:20px 0px" class="text-muted">Disclaimer: ${name} is owned and
      maintained by Lucas Wilson (futurelucas4502).</h6>
</div>`
// if(otherResponse[name]==undefined){ // Method using github API which has a rate limit of 60 requests an hour
//   otherResponse[name] = await fetch(`https://api.github.com/repos/futurelucas4502/${name}/readme`);
//   otherResponse[name] = await otherResponse[name].json();
// }
if(otherResponse[name]==undefined){ // Method where I fetch the file contents of the readme manually
    await fetch(`https://raw.githubusercontent.com/futurelucas4502/${name}/master/README.md`).then(res => {
      return res.text();
  })
  .then(data => {
    otherResponse[name] = data;
  });
  }
  var html = converter.makeHtml(otherResponse[name]);
  document.getElementById("loading").style.display = "none"
  document.getElementById("content").innerHTML = html
}
// End Other Pages Loading