(function ($) {
  "use strict";

  /**
   * Detect mobile devices
   */
  window.isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
  window.windowHeight = window.innerHeight;
  window.windowWidth = window.innerWidth;

  /**
   * Match height for elements
   */
  $(".row-eq-height > [class*='col-']").matchHeight();

  var myEfficientFn = debounce(function () {
    $(".row-eq-height > [class*='col-']").matchHeight();
  }, 250);

  window.addEventListener("resize", myEfficientFn);

  /**
   * Debounce function
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Masonry grid
   */
  $(".grid__inner").masonry({
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
  });

  /**
   * Grid CSS with Isotope filtering
   */
  function work() {
    $(".grid-css").each(function () {
      var workWrapper = $(this),
        workContainer = $(".grid__inner", workWrapper),
        filters = $(".filter", workWrapper),
        duration = 0.3;

      workContainer.imagesLoaded(function () {
        workContainer.isotope({
          layoutMode: "masonry",
          itemSelector: ".grid-item",
          transitionDuration: duration + "s",
          masonry: {
            columnWidth: ".grid-sizer",
          },
        });
      });

      filters.on("click", "a", function (e) {
        e.preventDefault();
        var $el = $(this),
          selector = $el.attr("data-filter");

        filters.find(".current").removeClass("current");
        $el.parent().addClass("current");

        workContainer.isotope({
          filter: selector,
        });
      });
    });
  }
  work();

  /**
   * Swiper Slider
   */
  $(".swiper").each(function () {
    var self = $(this),
      wrapper = $(".swiper-wrapper", self),
      optData = JSON.parse(self.attr("data-options") || "{}"), // Fix eval() security issue
      optDefault = {
        paginationClickable: true,
        pagination: self.find(".swiper-pagination-custom"),
        nextButton: self.find(".swiper-button-next-custom"),
        prevButton: self.find(".swiper-button-prev-custom"),
        spaceBetween: 30,
      },
      options = $.extend(optDefault, optData);

    wrapper.children().wrap('<div class="swiper-slide"></div>');
    var swiper = new Swiper(self, options);

    function thumbnails(selector) {
      if (selector.length > 0) {
        var wrapperThumbs = selector.children(".swiper-wrapper"),
          optDataThumbs = JSON.parse(selector.attr("data-options") || "{}"),
          optDefaultThumbs = {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 3,
            touchRatio: 0.3,
            slideToClickedSlide: true,
            pagination: selector.find(".swiper-pagination-custom"),
            nextButton: selector.find(".swiper-button-next-custom"),
            prevButton: selector.find(".swiper-button-prev-custom"),
          },
          optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);

        wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
        var swiperThumbs = new Swiper(selector, optionsThumbs);
        swiper.params.control = swiperThumbs;
        swiperThumbs.params.control = swiper;
      }
    }

    thumbnails(self.next(".swiper-thumbnails"));
  });

  /**
   * Email form submission
   */
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    if (form) {
      form.addEventListener("submit", sendEmail);
    }
  });

document.getElementById("send-email").addEventListener("click", function() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Construct mailto link
    const mailtoLink = `mailto:smith.mike@mac.com,mike@mikeqsmith.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`
    )}`;

    // Open the user's default email client
    window.location.href = mailtoLink;
});

  /**
   * Header interactions
   */
  var header_main = $("header"),
    toggle_search = $(".search-btn"),
    close_search = $(".searchbar__close"),
    toggleMenu = $(".header-menu__toggle"),
    headerMenu = $(".header-01__menu");

  toggle_search.on("click", function () {
    header_main.toggleClass("search-active");
  });

  close_search.on("click", function () {
    header_main.removeClass("search-active");
  });

  $(window).on("load resize", function () {
    var hHeader = $("header").height();
    if (header_main.hasClass("header-fixheight")) {
      if ($(".md-content").children(".fix-header").length == 0) {
        $(".md-content").prepend(
          '<div class="fix-header" style="height:' + hHeader + 'px"></div>'
        );
      } else {
        $(".fix-header").css("height", hHeader);
      }
    }
  }).trigger("resize");

  /**
   * Navbar toggle
   */
  $(".navbar-toggle").on("click", function () {
    $(".page-wrap").toggleClass("active");
  });

  $(window).on("resize", function () {
    var ww = $(window).width();
    if (ww < 1200) {
      console.log("khanh");
    } else {
      $(".page-wrap").removeClass("active");
    }
  }).trigger("resize");

  /**
   * One Page Navigation
   */
  var header_height = header_main.height();
  $(".raising-nav").onePageNav({
    currentClass: "current",
    scrollOffset: header_height,
  });

  /**
   * Gallery Popup
   */
  $(".gallery-wrap").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: { enabled: true },
  });
})(jQuery);
