document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню

  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuCloseBtn = document.querySelector(
    ".mobile-menu__header-close"
  );
  const mobileMenuOpenBtn = document.querySelector(".head-header__burger");
  const mobileMenuNavLinks = document.querySelectorAll(
    ".mobile-menu__nav-link"
  );
  const mobileMenuCallBtn = document.querySelector(".mobile-menu__call-btn");

  for (let i = 0; i < mobileMenuNavLinks.length; i++) {
    mobileMenuNavLinks[i].addEventListener("click", function () {
      closeMobileMenu();
    });
  }

  mobileMenuCloseBtn.addEventListener("click", function () {
    closeMobileMenu();
  });

  mobileMenuOpenBtn.addEventListener("click", function () {
    openMobileMenu();
  });

  mobileMenuCallBtn.addEventListener("click", function () {
    closeMobileMenu();

    scrollToClick("consultation");
  });

  function openMobileMenu() {
    mobileMenu.classList.add("mobile-menu--active");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("mobile-menu--active");
  }

  const footerBtnCall = document.querySelector(".footer-call-btn");
  const headerBtnCall = document.querySelector(".head-header__call-btn");
  const headBtnConsultation = document.querySelector(
    ".head-content__action-btns-second"
  );
  const headBtnEstimation = document.querySelector(
    ".head-content__action-btns-main"
  );
  const tariffsBtns = document.querySelectorAll(".tariffs-list__tariff-btn");

  footerBtnCall.addEventListener("click", function (e) {
    e.preventDefault();

    scrollToClick("consultation");
  });

  headerBtnCall.addEventListener("click", function (e) {
    e.preventDefault();

    scrollToClick("consultation");
  });

  headBtnConsultation.addEventListener("click", function (e) {
    e.preventDefault();

    scrollToClick("consultation");
  });

  headBtnEstimation.addEventListener("click", function (e) {
    e.preventDefault();

    scrollToClick("estimation");
  });

  for (let i = 0; i < tariffsBtns.length; i++) {
    tariffsBtns[i].addEventListener("click", function (e) {
      scrollToClick("estimation");
    });
  }

  function scrollToClick(blockID) {
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // Навигация
  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  let intiWidth = window.innerWidth;

  // Слайдер тарифов
  let tariffActive = 2;
  let tariffLeft = 0;
  let tariffLeftShift = 0;

  function calcTariffLeft() {
    if (window.innerWidth > 840) {
      tariffLeft = 970;
    } else if (window.innerWidth <= 840 && window.innerWidth > 660) {
      tariffLeft = 690;
    } else if (window.innerWidth < 660 && window.innerWidth > 580) {
      tariffLeft = 580;
    } else if (window.innerWidth < 580 && window.innerWidth > 471) {
      tariffLeft = 480;
    } else if (window.innerWidth < 471) {
      tariffLeft = 390;
    }
  }

  let tariffShift = 0;
  let tariffsLength = 3;
  const tariffLeftBtn = document.querySelector(".tariffs-controller-left");
  const tariffRightBtn = document.querySelector(".tariffs-controller-right");
  const tariffsList = document.querySelector(".tariffs-list");
  const tariffsDotsActive = document.querySelectorAll(
    ".tariffs-controller__state-dot"
  );

  tariffLeftBtn.addEventListener("click", function () {
    tariffLeftSlide();
  });

  tariffRightBtn.addEventListener("click", function () {
    tariffRightSlide();
  });

  function tariffLeftSlide() {
    calcTariffLeft();

    if (tariffActive > 1) {
      tariffsDotsActive[tariffActive - 1].classList.remove(
        "tariffs-controller__state-dot--active"
      );
      tariffsDotsActive[tariffActive - 2].classList.add(
        "tariffs-controller__state-dot--active"
      );
      tariffActive--;
      tariffLeftShift += tariffLeft;
      tariffsList.style.left = tariffLeftShift + "px";
    }
  }

  function tariffRightSlide() {
    calcTariffLeft();

    if (tariffActive < tariffsLength) {
      tariffsDotsActive[tariffActive - 1].classList.remove(
        "tariffs-controller__state-dot--active"
      );
      tariffsDotsActive[tariffActive].classList.add(
        "tariffs-controller__state-dot--active"
      );
      tariffActive++;
      tariffLeftShift -= tariffLeft;
      tariffsList.style.left = tariffLeftShift + "px";
    }
  }

  let tariffSliderSwipeEl = document.getElementById("tariffs-list");

  let tariffReviews = new Hammer(tariffSliderSwipeEl);

  tariffReviews.on("swipeleft swiperight", function (ev) {
    if (ev.type === "swipeleft" && window.innerWidth <= 1230) {
      tariffRightSlide();
    }

    if (ev.type === "swiperight" && window.innerWidth <= 1230) {
      tariffLeftSlide();
    }
  });

  // Слайдер портфолио

  const portfolioSlidesCount = document.querySelectorAll(
    ".portfolio-slider__view-item"
  ).length;
  let portfolioAllSlides = portfolioSlidesCount;
  let portfolioThisSlide = 1;
  let portfolioLeft = 0;
  let portfolioMargin = 0;
  const portfolioSlider = document.querySelector(".portfolio-slider__view");
  const portfolioSliderLeftBtn = document.querySelector(
    ".portfolio-slider__controll-left"
  );
  const portfolioSliderRightBtn = document.querySelector(
    ".portfolio-slider__controll-right"
  );
  const allSlidesBlock = document.querySelector(
    ".portfolio-slider__controll-state__all"
  );
  const thisSlidesBlock = document.querySelector(
    ".portfolio-slider__controll-state__this"
  );

  function calcAllSlides(width) {
    if (width > 1240) {
      portfolioAllSlides = Math.ceil(portfolioSlidesCount / 3);
      allSlidesBlock.innerText = portfolioAllSlides;
      clearSlider();
    } else if (width > 768 && width <= 1240) {
      portfolioAllSlides = Math.ceil(portfolioSlidesCount / 2);
      allSlidesBlock.innerText = portfolioAllSlides;
      clearSlider();
    } else {
      portfolioAllSlides = portfolioSlidesCount;
      allSlidesBlock.innerText = portfolioAllSlides;
      clearSlider();
    }
  }

  function portfolioSliderRight() {
    if (portfolioThisSlide < portfolioAllSlides) {
      thisSlidesBlock.innerText = ++portfolioThisSlide;
      portfolioLeft -= 100;
      portfolioMargin -= 30;

      portfolioSlider.style.left =
        "calc(" +
        (portfolioLeft + "%") +
        " + " +
        (portfolioMargin + "px") +
        ")";
    }
  }

  function portfolioSliderLeft() {
    if (portfolioThisSlide > 1) {
      thisSlidesBlock.innerText = --portfolioThisSlide;

      portfolioLeft += 100;
      portfolioMargin += 30;

      portfolioSlider.style.left =
        "calc(" +
        (portfolioLeft + "%") +
        " + " +
        (portfolioMargin + "px") +
        ")";
    }
  }

  let allSlidesInterval = setTimeout(function () {
    calcAllSlides(window.innerWidth);
  }, 100);

  function clearSlider() {
    portfolioThisSlide = 1;
    portfolioSlider.style.left = "0";
    thisSlidesBlock.innerText = portfolioThisSlide;
    portfolioLeft = 0;
    portfolioMargin = 0;
  }

  calcAllSlides(window.innerWidth);

  thisSlidesBlock.innerText = portfolioThisSlide;

  window.addEventListener("resize", function () {
    calcAllSlides(window.innerWidth);
  });

  let portfolioSliderSwipeEl = document.getElementById("portfolio-slider");

  let swipePortfolio = new Hammer(portfolioSliderSwipeEl);

  swipePortfolio.on("swipeleft swiperight", function (ev) {
    if (ev.type === "swipeleft") {
      portfolioSliderRight();
    }

    if (ev.type === "swiperight") {
      portfolioSliderLeft();
    }
  });

  portfolioSliderRightBtn.addEventListener("click", function () {
    portfolioSliderRight();
  });

  portfolioSliderLeftBtn.addEventListener("click", function () {
    portfolioSliderLeft();
  });

  calcAllSlides(window.innerWidth);

  // Слайдер отзывы

  const reviewSlider = document.querySelector(".reviews-slider");
  const reviewSlides = document.querySelectorAll(".reviews-slider__slide");
  const reviewSlidesCount = reviewSlides.length;
  let reviewAllSlides = reviewSlidesCount;
  let reviewThisSlide = 2;
  let activeSlideWidth = getComputedStyle(
    document.querySelector(".reviews-slider__slide--active")
  ).width;
  let slideMargin = getComputedStyle(
    document.querySelector(".reviews-slider__slide--active")
  ).marginRight;
  let reviewLeftPC = 0;
  let reviewLeftTablet = 1;
  let reviewLeftMobile = 1;

  let sliderLeft = -773;

  const reviewSliderLeftBtn = document.querySelector(
    ".reviews-slider__controll-left"
  );
  const reviewSliderRightBtn = document.querySelector(
    ".reviews-slider__controll-right"
  );

  const reviewThisSliderBlock = document.querySelector(
    ".reviews-slider__controll-state__this"
  );
  const reviewAllSliderBlock = document.querySelector(
    ".portfolio-slider__controll-state__all"
  );

  reviewAllSliderBlock.innerText = reviewSlidesCount;

  reviewSlider.style.width = reviewSlidesCount * 100 + "%";

  function reviewSliderLeft() {
    if (reviewThisSlide > 1) {
      reviewThisSliderBlock.innerText = --reviewThisSlide;

      if (reviewSlides[reviewThisSlide - 2]) {
        reviewSlides[reviewThisSlide - 2].classList.add(
          "reviews-slider__slide--left"
        );
      }

      if (reviewSlides[reviewThisSlide - 1]) {
        reviewSlides[reviewThisSlide - 1].classList.remove(
          "reviews-slider__slide--left"
        );
        reviewSlides[reviewThisSlide - 1].classList.add(
          "reviews-slider__slide--active"
        );
      }

      reviewSlides[reviewThisSlide].classList.add(
        "reviews-slider__slide--right"
      );
      reviewSlides[reviewThisSlide].classList.remove(
        "reviews-slider__slide--active"
      );

      if (reviewSlides[reviewThisSlide + 1])
        reviewSlides[reviewThisSlide + 1].classList.remove(
          "reviews-slider__slide--right"
        );

      if (window.innerWidth > 1200) {
        reviewLeftPC--;

        reviewSlider.style.left =
          "calc(" +
          sliderLeft +
          "px" +
          " + " +
          -933 +
          "px" +
          " * " +
          reviewLeftPC;
      } else if (window.innerWidth < 1200 && window.innerWidth > 768) {
        reviewLeftTablet--;

        for (let i = 0; i < reviewSlidesCount; i++) {
          reviewSlides[i].style.left = -788 * reviewLeftTablet + "px";
        }
      } else {
        reviewLeftMobile--;

        for (let i = 0; i < reviewSlidesCount; i++) {
          reviewSlides[i].style.left = -340 * reviewLeftMobile + "px";
        }
      }
    }
  }

  function reviewSliderRight() {
    if (reviewThisSlide < reviewAllSlides) {
      reviewThisSliderBlock.innerText = ++reviewThisSlide;

      if (reviewSlides[reviewThisSlide - 3]) {
        reviewSlides[reviewThisSlide - 3].classList.remove(
          "reviews-slider__slide--left"
        );
      }

      if (reviewSlides[reviewThisSlide - 2]) {
        reviewSlides[reviewThisSlide - 2].classList.add(
          "reviews-slider__slide--left"
        );
        reviewSlides[reviewThisSlide - 2].classList.remove(
          "reviews-slider__slide--active"
        );
      }

      reviewSlides[reviewThisSlide - 1].classList.add(
        "reviews-slider__slide--active"
      );
      reviewSlides[reviewThisSlide - 1].classList.remove(
        "reviews-slider__slide--right"
      );

      if (reviewSlides[reviewThisSlide])
        reviewSlides[reviewThisSlide].classList.add(
          "reviews-slider__slide--right"
        );

      if (window.innerWidth > 1200) {
        reviewLeftPC++;

        reviewSlider.style.left =
          "calc(" +
          sliderLeft +
          "px" +
          " + " +
          -933 +
          "px" +
          " * " +
          reviewLeftPC;
      } else if (window.innerWidth < 1200 && window.innerWidth > 768) {
        reviewLeftTablet++;

        for (let i = 0; i < reviewSlidesCount; i++) {
          reviewSlides[i].style.left = -788 * reviewLeftTablet + "px";
        }
      } else {
        reviewLeftMobile++;

        for (let i = 0; i < reviewSlidesCount; i++) {
          reviewSlides[i].style.left = -340 * reviewLeftMobile + "px";
        }
      }
    }
  }

  let reviewsSliderSwipeEl = document.getElementById("reviews-slider");

  let swipeReviews = new Hammer(reviewsSliderSwipeEl);

  swipeReviews.on("swipeleft swiperight", function (ev) {
    if (ev.type === "swipeleft") {
      reviewSliderRight();
    }

    if (ev.type === "swiperight") {
      reviewSliderLeft();
    }
  });

  reviewSliderLeftBtn.addEventListener("click", function () {
    reviewSliderLeft();
  });

  reviewSliderRightBtn.addEventListener("click", function () {
    reviewSliderRight();
  });
});
