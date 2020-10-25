/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

    $.resizeend = function(el, options){
      var base = this;

      base.$el = $(el);
      base.el = el;

      base.$el.data("resizeend", base);
      base.rtime = new Date(1, 1, 2000, 12,00,00);
      base.timeout = false;
      base.delta = 200;

      base.init = function(){
          base.options = $.extend({},$.resizeend.defaultOptions, options);

          if(base.options.runOnStart) base.options.onDragEnd();

          $(base.el).resize(function() {

              base.rtime = new Date();
              if (base.timeout === false) {
                  base.timeout = true;
                  setTimeout(base.resizeend, base.delta);
              }
          });

      };
      base.resizeend = function() {
          if (new Date() - base.rtime < base.delta) {
              setTimeout(base.resizeend, base.delta);
          } else {
              base.timeout = false;
              base.options.onDragEnd();
          }
      };

      base.init();
  };

  $.resizeend.defaultOptions = {
      onDragEnd : function() {},
      runOnStart : false
  };

  $.fn.resizeend = function(options){
      return this.each(function(){
          (new $.resizeend(this, options));
      });
  };

  jQuery.fn.scrollOffset = function () {
      var win = $(window);
      var topSpace = this.offset().top - win.scrollTop();
      var bottomSpace = win.height() - this.height() - topSpace;
      var leftSpace = this.offset().left;
      var rightSpace = win.width() - this.width() - leftSpace;
      return { top: topSpace, bottom: bottomSpace, left: leftSpace, right: rightSpace };
  };

  function isElementInViewport (el, verticaloffset) {
    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = el.offset();
    bounds.right = bounds.left + el.outerWidth();
    bounds.bottom = bounds.top + el.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

  }

  function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
  }

  $.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];

  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });

  window.onscroll = function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  };
};

var moveItItem = function(el){
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop) {
  if ($(window).height() > 400) {
    var pageY = this.el.offset();
    var pos = (scrollTop - pageY.top) / this.speed;
    this.el.css('transform', 'translateY(' +pos + 'px)');
  }
};

$(function(){
  $('[data-scroll-speed]').moveIt();
});

$(function(){
  $('.features__stick--btn').on('click', function(){
    $(this).toggleClass('open');
    var description = $(this).closest('.features__stick--feature').find($('.features__stick--description'));
    description.toggleClass('open');
  });
});

$(function(){
  $('.nav-btn').on('click', function(){
    $(this).toggleClass('open');
    $('.nav').toggleClass('open');
    $('header').toggleClass('open');
  });
});


 function set_animation(el) {
    el.addClass('animated');
    if (el.hasClass('down')) {
      el.addClass('fadeInDown');
      el.removeClass('down');
    } else if (el.hasClass('left')) {
      el.addClass('fadeInLeft');
      el.removeClass('left');
    } else if (el.hasClass('right')) {
      el.addClass('fadeInRight');
      el.removeClass('right');
    } else if (el.hasClass('in')) {
      el.addClass('fadeIn');
      el.removeClass('in');
    } else if (el.hasClass('up')) {
      el.addClass('fadeInUp');
      el.removeClass('up');
    }
  }
// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {

  /*
    Preload
  */
  preload: {
    init: function() {
       $(window).on('scroll', function () {
        $('.scrolling').each(function() {
          if ( isElementInViewport($(this), 100) ) {
            $(this).removeClass('scrolling');
            set_animation($(this));
          }
        });
      });

      $('.scrolling').each(function() {
        if ( isElementInViewport($(this), 100) ) {
          $(this).removeClass('scrolling');
          set_animation($(this));
        }
      });

      $('.scroll-down, .scroll').click(function(){
        $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
        }, 700);
        return false;
      });

      $('.section__description--small li').on('click', function(){
        $('.section__description--small li').removeClass('active');
        $(this).addClass('active');

      });

      /* WayPoints */
      /* Waypoint */
      var waypoints = $('.section').waypoint({
        handler: function(direction){
          var blockColor = $(this.element).attr('data-block-color');
          if(direction === 'down'){
            switch(blockColor){
              case "light":
                $(".nav").addClass('nav--dark');
                break;
              case "dark":
                $(".nav").removeClass('nav--dark');
                break;
              default:
                $(".nav").removeClass('nav--dark');
                break;
            }
          } else{
            switch(blockColor){
              case "light":
                $(".nav").removeClass('nav--dark');
                break;
              case "dark":
                $(".nav").addClass('nav--dark');
                break;
              default:
                $(".nav").addClass('nav--dark');
                break;
            }
          }
        },
          offset: '50%'
      });

    }
  },

  /*
    Front Page
  */
  home: {
    init: function() {

    }
  },

  /*
    Postload
  */
  postload: {
    init: function() {

    }
  },

};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('preload');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });

    UTIL.fire('postload');
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery);
