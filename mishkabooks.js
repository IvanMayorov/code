"use strict";
/*!
 * fullpage.js Fading Effect Extension 0.2.0
 * for fullpage.js v4
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
/* eslint-disable */ window.fp_fadingEffectExtension = function () {
  var e,
    i,
    o,
    a,
    r,
    t,
    n = this,
    s = window.fp_utils,
    l = window.fullpage_api,
    f = s.$,
    c = l.getFullpageData(),
    d = c.options,
    p = c.internals,
    u = d.scrollingSpeed,
    m = ".fullpage-wrapper",
    v = ".active",
    g = ".fp-section",
    w = g + v,
    E = ".fp-slide",
    h = ".fp-slidesContainer",
    y = E + v,
    S = "fp-notransition",
    T = "fp-fading-animations",
    b = "#" + T,
    x = "fp-fading-sheet",
    O = "#" + x;
  function z(n) {
    s.addClass(r, S),
      clearTimeout(t),
      (t = setTimeout(function () {
        s.removeClass(r, S);
      }, 900));
  }
  function A(n) {
    n.detail ? ((a = !1), N()) : ((a = o.autoScrolling), F());
  }
  function C() {
    (r = f(m)[0]).addEventListener("afterResponsive", A),
      r.addEventListener("destroy", N),
      window.addEventListener("resize", z);
    var n = d.scrollOverflowHandler;
    (d.scrollOverflowHandler = null),
      (o = s.deepExtend({}, d)),
      (a = o.autoScrolling),
      (d.scrollOverflowHandler = n),
      (o.scrollOverflowHandler = n),
      (d.scrollBar = !1),
      L("sections") && l.setAutoScrolling(!0);
    var t = L("slides") ? k(E) : "",
      e = L("sections") ? k(g) : "";
    d.fadingEffect && B(x, e + t),
      p.removeAnimation(f(h)),
      clearTimeout(i),
      (i = setTimeout(H, 300));
  }
  function L(n) {
    return !0 === d.fadingEffect || d.fadingEffect === n;
  }
  function B(n, t) {
    if (!f("#" + n).length) {
      var e = document.head || document.getElementsByTagName("head")[0];
      s.appendTo(
        ((i = n),
        (o = t),
        ((a = document.createElement("style")).type = "text/css"),
        (a.id = i),
        a.styleSheet
          ? (a.styleSheet.cssText = o)
          : a.appendChild(document.createTextNode(o)),
        a),
        e
      );
    }
    var i, o, a;
  }
  function H() {
    e = "all " + u + "ms " + d.easingcss3;
    var n = L("slides") ? _(E) : "",
      t = L("sections") ? _(g) : "";
    B(
      T,
      n +
        t +
        "\n                .fp-notransition .fp-section,\n                .fp-notransition .fp-slide {\n                    -webkit-transition: none !important;\n                    transition: none !important;\n                }\n            "
    );
  }
  function _(n) {
    return (
      n +
      "{-webkit-transition: " +
      e +
      ";transition: " +
      e +
      ";transform: translatez(0);}"
    );
  }
  function k(n) {
    return (
      (n === E
        ? ".fp-slidesContainer {width: 100% !important;transform: none!important;transition: none !important;transform: translatez(0);}"
        : m + "{transition: none !important;transform: translatez(0);}") +
      n +
      "{width: 100% !important;position: absolute !important;left: 0;top: 0;visibility: hidden;opacity: 0;}" +
      n +
      ".active{visibility: visible;opacity: 1;z-index: 1}"
    );
  }
  function N() {
    if ((s.remove(f(b)), D())) {
      var n = f(y, f(w)[0])[0],
        t = f(h, f(w)[0]);
      p.removeAnimation(t),
        s.remove(f(O)),
        (d.scrollBar = o.scrollBar),
        l.setAutoScrolling(a),
        null != n && p.silentLandscapeScroll(n);
    }
  }
  function D() {
    return f(O).length;
  }
  function F() {
    (d.fadingEffect = o.fadingEffect),
      D() || (C(), window.scrollTo(0, 0), p.silentScroll(0));
  }
  (n.update = function (n) {
    s.remove(f(b)), (u = n), H();
  }),
    (n.turnOn = F),
    (n.turnOff = N),
    (n.apply = C),
    (n.c = p.c);
  var R = n["common".charAt(0)];
  return (
    "complete" === document.readyState && R("fadingEffect"),
    window.addEventListener("load", function () {
      R("fadingEffect");
    }),
    n
  );
};

if (sessionStorage.getItem("login")) {
  showContent();
}

function showContent() {
  $("[data-login-box]").css("display", "none");
  $("[data-content]").css("display", "flex");
}

function hideContent() {
  $("[data-login-box]").css("display", "flex");
  $("[data-content]").css("display", "none");
}

//Р В Р ВµР С–Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘РЎРЏ
$("#wf-form-registration").submit(function (event) {
  $(".submit-box").addClass("preloader-active");
  event.preventDefault();
  let email = $(this).find("input[name=email]").val();
  let name = $(this).find("input[name=Name]").val();
  console.log(email);
  $.ajax({
    type: "POST",
    url: "https://virtual-book-production.up.railway.app/auth/register",
    data: `{ "email": "${email}" , "name": "${name}" , "code": "INVITE-123-INVITE" }`,
    success: function (data) {
      // getOtpCode(email);
      $(".box-form-access").hide();
      $(".register-success").show();
      $(".submit-box").removeClass("preloader-active");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("Error");
      $(".submit-box").addClass("preloader-active");
    },
    contentType: "application/json",
    dataType: "json",
  });

  return false;
});

//Р вЂєР С•Р С–Р С‘Р Р…
$("[data-login-box] form").submit(function (event) {
  event.preventDefault();
  $(".submit-box").addClass("preloader-active");
  $(".login-error").hide();
  let email = $(this).find("input[name=email]").val();
  let codeInput = $(this).find("input[name=number]");
  if (codeInput.is(":hidden")) {
    getOtpCode(email, codeInput);
  } else {
    $.ajax({
      type: "POST",
      url: "https://virtual-book-production.up.railway.app/auth/login",
      data: `{ "email": "${email}" ,"otpCode": "${codeInput.val()}" }`,
      success: function (data) {
        $(".submit-box").removeClass("preloader-active");
        showContent();
        sessionStorage.setItem("login", true);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        // let msg = jQuery.parseJSON(xhr.responseText);
        // alert(msg.message);
        $(".submit-box").removeClass("preloader-active");
        $(".login-error").show();
        // if (msg.message === "User not found") {
        //   alert("Alert User not found");
        // }
      },
      contentType: "application/json",
      dataType: "json",
    });
  }
  console.log(email);

  return false;
});

function getOtpCode(email, codeInput) {
  $(".submit-box").addClass("preloader-active");
  $(".login-error").hide();
  $.ajax({
    type: "POST",
    url: "https://virtual-book-production.up.railway.app/otp/request",
    data: `{ "email": "${email}"}`,
    success: function (data) {
      // alert("Success OTP");
      $(".submit-box").removeClass("preloader-active");
      codeInput.show();
      codeInput.prop("required", true);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $(".login-error").show();
      $(".submit-box").removeClass("preloader-active");
      // console.log(thrownError);
      // let msg = jQuery.parseJSON(xhr.responseText);
      // if (msg.message === "User not found") {
      //   alert("Alert User not found");
      // }
    },
    contentType: "application/json",
  });
}

//
// $("[data-link]").click(function () {
//   const link = $(this).attr("data-link");
//   window.open(link);
// });

if (window.matchMedia("(min-width: 479px)").matches) {
  $("#video1 ")[0].src = "https://kinescope.io/ns6n9PF7PiRtkya6wZM2v1/1080p";
  $("#video1 ").attr("autoplay", true);
  setTimeout(() => {
    $("#video2 ")[0].src = "https://kinescope.io/wTU53VzMxe4MAXWrdnUCDH/1080p";
    $("#video3 ")[0].src = "https://kinescope.io/9etj7jNNo24VE1hRVaJhJ4/1080p";
    $("#video4 ")[0].src = "https://kinescope.io/oNvx7jQA93KPeQqw8ChAut/1080p";
    $("#video5 ")[0].src = "https://kinescope.io/oSb3aN5KxZQJPNWEmwJKj6/1080p";
    $("#video6 ")[0].src = "https://kinescope.io/o6eM4E77HkpKrs6eYbc8wD/1080p";
  }, 500);
}
if (window.matchMedia("(max-width: 479px)").matches) {
  $("#video1 ")[0].src = "https://kinescope.io/sBnvfTR3qicgF6a6xrP99B/1080p";
  $("#video1 ").attr("autoplay", true);
  $("#video2")[0].src = "https://kinescope.io/ajtwpy7ogwF1k32361qjVi/1080p";
  $("#video3 ")[0].src = "https://kinescope.io/gZUzkGYndtVAzGDEW5HMNs/1080p";
  $("#video4 ")[0].src = "https://kinescope.io/tKVu9duzuapjNRPYzCY7eg/1080p";
  $("#video5 ")[0].src = "https://kinescope.io/4EY5nfJpWCqogedmTC387w/1080p";
  $("#video6 ")[0].src = "https://kinescope.io/5oZb59xX3wH65abMdUsZTr/1080p";
}
const linkBox = $(".box-link");
// onmousewheel = (event) => {
//   console.log("wheel");
// };
let muted = true;
$(".link-page").removeClass("active");
// const circleStep = $(".list-item-link").height();
const circle = $(".circle-link");
const allVideos = $(".box-video").children();
const disatnce =
  $(".list-item-link").eq(1).offset().top -
  $(".list-item-link").eq(1).parent().offset().top -
  $(".list-item-link").eq(1).parent().scrollTop();
// const gap = ($(".box-link").height() - circleStep * 2) / 2;

// const slideHeight = 100 / $("#fullpage").children().length;
const slideHeight = 20;
// $(".wrapper-author").hide();
new fullpage("#fullpage", {
  // menu: "#menu",
  fixedElements: ".section-menu, .wrapper-box-link",
  scrollingSpeed: 10,
  credits: {
    enabled: false,
    label: "Made",
    position: "right",
  },
  normalScrollElements: ".wrapper-author, .wrapper-feedback, .wrapper-benefit",
  licenseKey: "5172D4F4-1EFD4C7A-934B4F78-5284A4ED",
  fadingEffectKey:
    "TU9iV2x6YUd0aFltOXZhM011WTI5dDhBXzNuS1ptRmthVzVuUldabVpXTjA3S1M=",
  fadingEffect: true,
  lazyLoading: false,
  // afterLoad: function (origin, destination, direction, trigger) {
  //   setTimeout(() => {
  //     $(origin.item).find("video").trigger("play");
  //   }, 300);
  // },
  onLeave: function (origin, destination, direction, trigger) {
    $(origin.item).find("video").trigger("pause");
    $(destination.item).find("video").trigger("play");
    if (destination.index === 0) {
      $(".mobile-icon").show();
    } else {
      $(".mobile-icon").hide();
    }
    // console.log(fullpage_api.getActiveSlide().index);
    $(".box-link").css(
      "transform",
      `translate(0%, ${slideHeight * -destination.index}%)`
    );
    circle.css(
      "transform",
      `translate(0px, ${disatnce * destination.index}px)`
    );
    //Р вЂ™РЎвЂ№Р С”Р В»РЎР‹РЎвЂЎР В°РЎР‹ Р В·Р Р†РЎС“Р С”
    allVideos.each(function () {
      if ($(this).find("video").length > 0) {
        $(this).find("video")[0].muted = true;
      }
      // $(this).removeClass("video-active");
    });
    // console.log();
    // video.addClass("video-active");
    if (!muted) {
      $(destination.item).find("video")[0].muted = false;
    }
  },
});

const box = document.querySelector(".wrapper-box-link");
box.addEventListener("swiped", function (e) {
  if (e.detail.dir === "up") {
    fullpage_api.moveSectionDown();
  } else if (e.detail.dir === "down") {
    fullpage_api.moveSectionUp();
  }
  // $(".fp-section.active").find("video").trigger("play");
});

const book = $(".book-video"),
  author = $(".author-video"),
  game = $(".game-video"),
  vr = $(".vr-video"),
  buy = $(".buy-video"),
  feedback = $(".feedback-video");

function changeMenu(step, background) {
  $(".list-item-link").removeClass("active");
  $(".list-item-link").eq(step).addClass("active");
  circle.css("transform", `translate(0px, ${disatnce * step}px)`);
  showVideo(background);
}

//Р СњР В°Р Р†Р ВµР Т‘Р ВµР Р…Р С‘Р Вµ Р Р…Р В° Р С—РЎС“Р Р…Р С”РЎвЂљРЎвЂ№ Р СР ВµР Р…РЎР‹
$(".list-item-link").on("mouseenter", function () {
  const atr = $(this).attr("data-category");
  const localDisatnce =
    $(this).offset().top -
    $(this).parent().offset().top -
    $(this).parent().scrollTop();
  circle.css("transform", `translate(0px, ${localDisatnce}px)`);

  // showBack(atr);
});

//Р С™Р В»Р С‘Р С” Р С—Р С• Р С‘Р С”Р С•Р Р…Р С”Р В°Р С
$(".link-page").click(function () {
  $(".mobile-icon").hide();
  fullpage_api.moveTo($(this).index() + 1);
  // console.log($(this).index());
  $(".wrapper-box-link").css("pointer-events", "none");
  const atr = $(this).attr("data-category");
  // showBack(atr);
  // scrollLock.disablePageScroll();
  fullpage_api.setAllowScrolling(false);
  if (window.matchMedia("(max-width: 479px)").matches) {
    $(".wrapper-link-page").hide();
  }
  $(".link-page").removeClass("active");
  $(this).addClass("active");
});
//Р С™Р В»Р С‘Р С” Р С—Р С• Р СР ВµР Р…РЎР‹ Р В±РЎС“РЎР‚Р С–Р ВµРЎР‚Р В°
$(".mob-link").click(function () {
  if (window.matchMedia("(max-width: 479px)").matches) {
    $(".wrapper-link-page").hide();
    $(".mobile-icon").hide();
    fullpage_api.moveTo($(this).index() + 1);
  }
});
//Р С™Р В»Р С‘Р С” Р С—Р С• РЎвЂљР ВµР С”РЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р С Р С—РЎС“Р Р…Р С”РЎвЂљР В°Р С Р СР ВµР Р…РЎР‹
$(".list-item-link").click(function () {
  fullpage_api.moveTo($(this).index());
  $(".mobile-icon").hide();
  $(".wrapper-box-link").css("pointer-events", "none");
  if (window.matchMedia("(max-width: 479px)").matches) {
    $(".wrapper-link-page").hide();
  }
  // scrollLock.disablePageScroll();
  // fullpage_api.setAllowScrolling(false);
  fullpage_api.setAllowScrolling(false);
  // fullpage_api.setAutoScrolling(false);
});

//Р С™Р В»Р С‘Р С” Р С—Р С• Р С”Р Р…Р С•Р С—Р С”Р Вµ Р Р…Р В°Р В·Р В°Р Т‘
$(".wrapper-back").click(function () {
  setTimeout(() => {
    $(".wrapper-link-page").show();
  }, 1000);

  setTimeout(() => {
    $(".wrapper-box-link").css("pointer-events", "auto");
  }, 1000);

  $(".link-page").removeClass("active");
  // scrollLock.clearQueueScrollLocks();
  // scrollLock.enablePageScroll();
  fullpage_api.setAllowScrolling(true);
});

function showVideo(video) {
  // changeMuteIcon("mute");
  //
  allVideos.each(function () {
    if ($(this).find("video").length > 0) {
      $(this).find("video")[0].muted = true;
    }
    // $(this).removeClass("video-active");
  });

  // video.addClass("video-active");
  if (!muted) {
    video.find("video")[0].muted = false;
  }
  // allVideos.css("z-index", "1");
  // allVideos.css("opacity", "0");
  // video.css("z-index", "999");
  // video.css("opacity", "1");
}
function showBack(atr) {
  if (atr === "book") {
    showVideo(book);
  }
  if (atr === "buy") {
    showVideo(buy);
  }
  if (atr === "game") {
    showVideo(game);
  }
  if (atr === "author") {
    showVideo(author);
  }
  if (atr === "vr") {
    showVideo(vr);
  }
  if (atr === "feedback") {
    showVideo(feedback);
  }
}

//Р С™Р Р…Р С•Р С—Р С”Р В° Р С•РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ Р С—Р С•Р С—Р В°Р С—Р В°
$(".wrapper-play-gallery").click(function () {
  const video = $(".video-active").find("video")[0];
  video.muted = true;
  changeMuteIcon("mute");
  $("iframe.yt-video")[0].contentWindow.postMessage(
    '{"event":"command","func":"' + "playVideo" + '","args":""}',
    "*"
  );
});
//Р С™Р Р…Р С•Р С—Р С”Р В° Р С—Р ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР ВµР Р…Р С‘РЎРЏ РЎРѓР В»Р В°Р в„–Р Т‘Р В°
$(".next").click(function () {
  $("iframe.yt-video")[0].contentWindow.postMessage(
    '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
    "*"
  );
});
//Р С™Р Р…Р С•Р С—Р С”Р В° Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ Р С—Р С•Р С—Р В°Р С—Р В°
$(".close-popup").click(function () {
  $("iframe.yt-video")[0].contentWindow.postMessage(
    '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
    "*"
  );
});

function changeMuteIcon(state) {
  if (state === "mute") {
    muted = true;
    $(".icon-voice").show();
    $(".icon-mute").hide();
  } else {
    muted = false;
    $(".icon-mute").show();
    $(".icon-voice").hide();
  }
}

//Р С™Р В»Р С‘Р С” Р С—Р С• Р С‘Р С”Р С•Р Р…Р С”Р Вµ mute
$(".wrapper-box-audio").click(function () {
  const video = $(".fp-section.active").find("video")[0];
  // video.muted = true;
  // console.log("vide-test");
  if ($(".fp-section.active").find("video").length > 0) {
    if (video.muted === false) {
      video.muted = true;
      // console.log("mute");
      changeMuteIcon("mute");
    } else {
      // console.log("unmute");
      video.muted = false;
      changeMuteIcon("unmute");
    }
  }
});

$('[data-name="Выбрать страну"] select').change(function () {
  $('[aria-label="Выбрать страну"]').attr("data-name", $(this).val());
});

// $("select").change(function () {
//   // console.log($(this).val());
//   const form = $(this).closest("form");
//   // initialName = form.attr("name");
//   form.attr("data-name", $(this).val());
//   console.log(form.attr("data-name"));
//

const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "style") {
      const element = mutation.target;
      if (
        element.style.display === "none" &&
        element.classList.contains("preloader")
      ) {
        // Получаем текущий URL и параметры
        const urlParams = new URLSearchParams(window.location.search);

        // Проверка на наличие параметра "buy"
        if (urlParams.has("buy")) {
          const buyElement = document.querySelector('[data-category="buy"]');
          if (buyElement) {
            buyElement.click();
          } else {
            console.warn('Элемент с атрибутом data-category="buy" не найден.');
          }
        }
        if (urlParams.has("goroshinka")) {
          const buyElement = document.querySelector('[data-category="book"]');
          buyElement.click();
        }
        if (urlParams.has("contact")) {
          const buyElement = document.querySelector('[data-category="feedback"]');
          buyElement.click();
        }
        if (urlParams.has("game")) {
          const buyElement = document.querySelector('[data-category="game"]');
          buyElement.click();
        }
        if (urlParams.has("ar")) {
          const buyElement = document.querySelector('[data-category="ar"]');
          buyElement.click();
        }
      }
    }
  }
});

const preloaderElements = document.querySelectorAll(".preloader");
preloaderElements.forEach((element) => {
  observer.observe(element, { attributes: true });
});
