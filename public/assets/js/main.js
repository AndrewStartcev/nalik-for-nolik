/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/***/ (function() {

eval("document.addEventListener('DOMContentLoaded', () => {\n  const header = document.querySelector('header');\n  const toggleHeader = () => header.classList.toggle('header-show', window.scrollY > 80);\n  const nf = new Intl.NumberFormat('ru-RU');\n  const toNum = v => (typeof v === 'number' ? v : +(String(v).replace(/[^\\d.-]/g, '') || 0));\n\n  toggleHeader();\n  initFormSliders();\n\n  window.addEventListener('scroll', toggleHeader);\n\n  function initFormSliders(root = document) {\n    root.querySelectorAll('.form__slider').forEach(box => {\n      const sliderEl = box.querySelector('._slider');\n      if (!sliderEl || sliderEl.noUiSlider) return;\n\n      const valueEl = box.querySelector('._value');\n\n      const min = toNum(box.dataset.min ?? 1000);\n      const max = toNum(box.dataset.max ?? 100000);\n      const step = toNum(box.dataset.step ?? 100);\n      const start = toNum(box.dataset.start ?? min);\n      const suffix = box.dataset.suffix ?? ' ₽';\n\n      noUiSlider.create(sliderEl, {\n        start,\n        step,\n        range: { min, max },\n        connect: [true, false],\n        tooltips: false,\n        format: { to: v => v, from: v => v },\n      });\n\n      const render = v => {\n        if (valueEl) valueEl.textContent = nf.format(Math.round(v)) + suffix;\n      };\n      sliderEl.noUiSlider.on('update', (values, handle) => render(values[handle]));\n      render(start);\n    });\n  }\n\n  new Swiper('.home-slider', {\n    slidesPerView: 'auto',\n    spaceBetween: 20,\n    loop: true,\n    grabCursor: true,\n    speed: 600,\n    autoplay: {\n      delay: 2500,\n      disableOnInteraction: false,\n      pauseOnMouseEnter: true,\n    },\n    breakpoints: {\n      640: { spaceBetween: 14 },\n      1024: { spaceBetween: 16 },\n    },\n  });\n\n  new Swiper('.reviews__slider', {\n    slidesPerView: 1.2,\n    spaceBetween: 16,\n    speed: 500,\n    loop: true,\n    autoplay: {\n      delay: 2500,\n    },\n    navigation: {\n      prevEl: '.reviews__btn-prev',\n      nextEl: '.reviews__btn-next',\n    },\n    pagination: {\n      el: '.reviews__pagination',\n      clickable: true,\n    },\n    breakpoints: {\n      768: { slidesPerView: 2.3, spaceBetween: 20 },\n      1200: { slidesPerView: 3, spaceBetween: 20 },\n    },\n  });\n});\n\n\n//# sourceURL=webpack://gulp-starter/./src/assets/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/main.js"]();
/******/ 	
/******/ })()
;