/**
 * DEVELOPER DOCUMENTATION
 *
 * Include your custom JavaScript here.
 *
 * The theme Focal has been developed to be easily extensible through the usage of a lot of different JavaScript
 * events, as well as the usage of custom elements (https://developers.google.com/web/fundamentals/web-components/customelements)
 * to easily extend the theme and re-use the theme infrastructure for your own code.
 *
 * The technical documentation is summarized here.
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A VARIANT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a the user has changed the variant in a selector. The target get you the form
 * that triggered this event.
 *
 * Example:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   let variant = event.detail.variant; // Gives you access to the whole variant details
 *   let form = event.target;
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * MANUALLY CHANGE A VARIANT
 * ------------------------------------------------------------------------------------------------------------
 *
 * You may want to manually change the variant, and let the theme automatically adjust all the selectors. To do
 * that, you can get the DOM element of type "<product-variants>", and call the selectVariant method on it with
 * the variant ID.
 *
 * Example:
 *
 * const productVariantElement = document.querySelector('product-variants');
 * productVariantElement.selectVariant(12345);
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A NEW VARIANT IS ADDED TO THE CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a variant is added to the cart through a form selector (product page, quick
 * view...). This event DOES NOT include any change done through the cart on an existing variant. For that,
 * please refer to the "cart:updated" event.
 *
 * Example:
 *
 * document.addEventListener('variant:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN THE CART CONTENT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever the cart content has changed (if the quantity of a variant has changed, if a variant
 * has been removed, if the note has changed...). This event will also be emitted when a new variant has been
 * added (so you will receive both "variant:added" and "cart:updated"). Contrary to the variant:added event,
 * this event will give you the complete details of the cart.
 *
 * Example:
 *
 * document.addEventListener('cart:updated', function(event) {
 *   var cart = event.detail.cart; // Get the updated content of the cart
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * REFRESH THE CART/MINI-CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * If you are adding variants to the cart and would like to instruct the theme to re-render the cart, you cart
 * send the cart:refresh event, as shown below:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 *
 * ------------------------------------------------------------------------------------------------------------
 * USAGE OF CUSTOM ELEMENTS
 * ------------------------------------------------------------------------------------------------------------
 *
 * Our theme makes extensive use of HTML custom elements. Custom elements are an awesome way to extend HTML
 * by creating new elements that carry their own JavaScript for adding new behavior. The theme uses a large
 * number of custom elements, but the two most useful are drawer and popover. Each of those components add
 * a "open" attribute that you can toggle on and off. For instance, let's say you would like to open the cart
 * drawer, whose id is "mini-cart", you simply need to retrieve it and set its "open" attribute to true (or
 * false to close it):
 *
 * document.getElementById('mini-cart').open = true;
 *
 * Thanks to the power of custom elements, the theme will take care automagically of trapping focus, maintaining
 * proper accessibility attributes...
 *
 * If you would like to create your own drawer, you can re-use the <drawer-content> content. Here is a simple
 * example:
 *
 * // Make sure you add "aria-controls", "aria-expanded" and "is" HTML attributes to your button:
 * <button type="button" is="toggle-button" aria-controls="id-of-drawer" aria-expanded="false">Open drawer</button>
 *
 * <drawer-content id="id-of-drawer">
 *   Your content
 * </drawer-content>
 *
 * The nice thing with custom elements is that you do not actually need to instantiate JavaScript yourself: this
 * is done automatically as soon as the element is inserted to the DOM.
 *
 * ------------------------------------------------------------------------------------------------------------
 * THEME DEPENDENCIES
 * ------------------------------------------------------------------------------------------------------------
 *
 * While the theme tries to keep outside dependencies as small as possible, the theme still uses third-party code
 * to power some of its features. Here is the list of all dependencies:
 *
 * "vendor.js":
 *
 * The vendor.js contains required dependencies. This file is loaded in parallel of the theme file.
 *
 * - custom-elements polyfill (used for built-in elements on Safari - v1.0.0): https://github.com/ungap/custom-elements
 * - web-animations-polyfill (used for polyfilling WebAnimations on Safari 12, this polyfill will be removed in 1 year - v2.3.2): https://github.com/web-animations/web-animations-js
 * - instant-page (v5.1.0): https://github.com/instantpage/instant.page
 * - tocca (v2.0.9); https://github.com/GianlucaGuarini/Tocca.js/
 * - seamless-scroll-polyfill (v2.0.0): https://github.com/magic-akari/seamless-scroll-polyfill
 *
 * "flickity.js": v2.2.0 (with the "fade" package). Flickity is only loaded on demand if there is a product image
 * carousel on the page. Otherwise it is not loaded.
 *
 * "photoswipe": v4.1.3. PhotoSwipe is only loaded on demand to power the zoom feature on product page. If the zoom
 * feature is disabled, then this script is never loaded.
 */

// const brandNavs = document.querySelectorAll(".brand-nav-wrap li")

// brandNavs.forEach((listItem) => {
//   listItem.addEventListener('click', function(event) {
//     event.preventDefault();
//     if (listItem.getElementsByTagName('ul')[0]) listItem.getElementsByTagName('ul')[0].style.display = 'flex';
//   })
// })

// console.log(brandNavs)

(function ($) {
  "use strict";
  var backbtn =
    '<li><a href="#" class="back-btn"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.51351 1L1 6.5M1 6.5L6.51351 12M1 6.5H13" stroke="#707070"/></svg>Back</a></li>';
  $(".brand-nav-wrap ul").prepend(backbtn);

  $(".brand-nav-wrap li a:not(.back-btn)").on("click", function (e) {
    if ($(this).siblings("ul").length > 0) {
      console.log("yes");
      $(this).parents("ul").find("> li").hide();
      $(this).parents("li").show();
      $(this).hide();
      $(this).siblings("ul").css("display", "flex");
      const ulHeight = $(this).siblings("ul").innerHeight();
      $(".brand-nav").css("min-height", ulHeight + 15);
      //       console.log(ulHeight);
      e.preventDefault();
    }
  });

  $(".back-btn").on("click", function (e) {
    console.log($(this).parent("ul"));
    $(this).parent().parent("ul").hide();
    $(this).parents("ul").find("> li").show();
    $(this).parents("ul").siblings("a").show();
    e.preventDefault();
  });

  if ($("#backHeightControl").length > 0) {
    $(".back-btn").html(
      '<span class="link_bg_img" style="display: flex;"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.51351 1L1 6.5M1 6.5L6.51351 12M1 6.5H13" stroke="#707070"></path></svg> Back</span>'
    );
  }
})(jQuery);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3.5,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});
/*---------- Video Play Button -------------*/

function playVid(videoId) {
  var str = videoId;
  str = str.substring(1);

  console.log(str);
  // Get the modal
  var modal = document.getElementById(str);

  // Get the button that opens the modal
  var btn = document.getElementById(videoId);

  // // Get the <span> element that closes the modal
  var span = document.getElementById(str + "B");

  // When the user clicks the button, open the modal
  // btn.onclick = function() {
  modal.style.display = "block";
  modal.classList.add("mystyle");
  document.body.style.overflow = "hidden";
  // }

  // when the video is clicked play nad puse
  //  modal.addEventListener("click", playPause, false);
  $("#" + str)
    .find("video")[0]
    .addEventListener("click", playPause, false);

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    modal.classList.remove("mystyle");
    $("#" + str)
      .find("video")[0]
      .pause();
    document.body.style.overflow = "auto";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modal.classList.remove("mystyle");
      $("#" + str)
        .find("video")[0]
        .pause();
      document.body.style.overflow = "auto";
    }
  };

  // intializePlayer(str);
  intializePlayer(str);

  //When the user clicks anywhere outside of the modal, close it
  $("#" + str)
    .find("video")[0]
    .addEventListener("touchmove", touchmove);
  $("#" + str)
    .find("video")[0]
    .addEventListener("touchstart", touchstart);

  var startX, startY;

  function touchstart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function touchmove(e) {
    var deltaY = e.touches[0].clientY - startY;

    console.log("Delta y", deltaY);
    if (deltaY > 70 || deltaY < -70) {
      modal.style.display = "none";
      modal.classList.remove("mystyle");
      $("#" + str)
        .find("video")[0]
        .pause();
      document.body.style.overflow = "auto";
    }
  }
}

//video player
var vid,
  playbtn,
  seekslider,
  curtimetext,
  durtimetext,
  mutebtn,
  volumeslider,
  fullscreenbtn,
  str;
function intializePlayer(strx) {
  str = strx;
  // Set object references
  vid = $("#" + strx).find("video")[0];
  playbtn = document.getElementById(strx + "playpausebtn");
  seekslider = document.getElementById(strx + "seekslider");
  curtimetext = document.getElementById(strx + "curtimetext");
  durtimetext = document.getElementById(strx + "durtimetext");
  mutebtn = document.getElementById(strx + "mutebtn");
  volumeslider = document.getElementById(strx + "volumeslider");
  fullscreenbtn = document.getElementById(strx + "fullscreenbtn");
  // Add event listeners
  playbtn.addEventListener("click", playPause, false);
  seekslider.addEventListener("change", vidSeek, false);
  vid.addEventListener("timeupdate", seektimeupdate, false);
  mutebtn.addEventListener("click", vidmute, false);
  volumeslider.addEventListener("change", setvolume, false);
  fullscreenbtn.addEventListener("click", toggleFullScreen, false);
}

function playPause() {
  if (vid.paused) {
    vid.play();
    playbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" style="width: 20px;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
</svg>
`;
  } else {
    vid.pause();
    playbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" style="width: 20px;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
</svg>`;
  }
}
function vidSeek() {
  var seekto = vid.duration * (seekslider.value / 100);
  vid.currentTime = seekto;
}
function seektimeupdate() {
  var nt = vid.currentTime * (100 / vid.duration);
  seekslider.value = nt;
  var curmins = Math.floor(vid.currentTime / 60);
  var cursecs = Math.floor(vid.currentTime - curmins * 60);
  var durmins = Math.floor(vid.duration / 60);
  var dursecs = Math.floor(vid.duration - durmins * 60);
  if (cursecs < 10) {
    cursecs = "0" + cursecs;
  }
  if (dursecs < 10) {
    dursecs = "0" + dursecs;
  }
  if (curmins < 10) {
    curmins = "0" + curmins;
  }
  if (durmins < 10) {
    durmins = "0" + durmins;
  }
  curtimetext.innerHTML = curmins + ":" + cursecs;
  durtimetext.innerHTML = durmins + ":" + dursecs;
}
function vidmute() {
  if (vid.muted) {
    vid.muted = false;
        mutebtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" style="width: 20px;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
</svg>
`;

  } else {
    vid.muted = true;
    mutebtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" style="width: 20px;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
</svg>
`;
  }
}
function setvolume() {
  vid.volume = volumeslider.value / 100;
}
function toggleFullScreen() {
  if (vid.requestFullScreen) {
    vid.requestFullScreen();
  } else if (vid.webkitRequestFullScreen) {
    vid.webkitRequestFullScreen();
  } else if (vid.mozRequestFullScreen) {
    vid.mozRequestFullScreen();
  }
}

$(document).ready(function () {
  $(".homeSec3LBInner").hover(
    function () {
      $(this).children("video")[0].play();
    },
    function () {
      var el = $(this).children("video")[0];
      el.pause();
      el.currentTime = 1;
    }
  );
});
