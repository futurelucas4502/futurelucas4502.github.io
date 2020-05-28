// ---------Responsive-navbar-active-animation-----------
function test(){
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
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  };
  $(document).ready(function(){
    setTimeout(function(){ test(); }, 300);
  });
  $(window).on('resize', function(){
    setTimeout(function(){ test(); }, 500);
  });
  $(".navbar-toggler").click(function(){
    setTimeout(function(){ test(); });
  });

  $(function() {

    if(Modernizr.history){

    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0;
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("nav").delegate("a", "click", function() {
        _link = encodeURIComponent(($(this).attr("href")).trim());
        history.pushState(null, null, _link);
        loadContent(_link);
        return false;
    });

    function loadContent(href) {

  $mainContent
    .find("#guts")
    .fadeOut(200, function() { // fade out the content of the current page
      $mainContent
        .hide()
        .load(href + " #guts", function() { // load the contents of whatever href is
          $mainContent.fadeIn(200, function() {
            $pageWrap.animate({
              height: baseHeight + $mainContent.height() + "px"
            });
         });

    });

  });

};
    
    $(window).bind('popstate', function(){
      _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
      loadContent(_link);
      $('#navbarSupportedContent ul li').removeClass("active");
      $('#navbarSupportedContent ul li a[href*="'+decodeURI(_link)+'"]').parent().addClass("active")
      test()
    });

}; // otherwise, history is not supported, so nothing fancy here.

    
});