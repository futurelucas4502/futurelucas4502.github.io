// Start Navigation
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

    var $mainContent = $("#main-content"),
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
            setTimeout(function(){
              $('#navbarSupportedContent ul li').removeClass("active");
              $('#navbarSupportedContent ul li a[href*="'+decodeURI(href)+'"]').parent().addClass("active")
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
    
    $(window).bind('popstate', function(){
      _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
      loadContent(_link);
    });

}; // otherwise, history is not supported, so nothing fancy here.  
});

// End Navigation