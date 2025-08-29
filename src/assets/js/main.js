document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const toggleHeader = () => header.classList.toggle('header-show', window.scrollY > 80);
  const nf = new Intl.NumberFormat('ru-RU');
  const toNum = v => (typeof v === 'number' ? v : +(String(v).replace(/[^\d.-]/g, '') || 0));

  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  burger.addEventListener('click', function (e) {
    mobileMenu.classList.toggle('show');
    burger.classList.toggle('show');
  });

  toggleHeader();
  initFormSliders();

  window.addEventListener('scroll', toggleHeader);

  function initFormSliders(root = document) {
    root.querySelectorAll('.form__slider').forEach(box => {
      const sliderEl = box.querySelector('._slider');
      if (!sliderEl || sliderEl.noUiSlider) return;

      const valueEl = box.querySelector('._value');

      const min = toNum(box.dataset.min ?? 1000);
      const max = toNum(box.dataset.max ?? 100000);
      const step = toNum(box.dataset.step ?? 100);
      const start = toNum(box.dataset.start ?? min);
      const suffix = box.dataset.suffix ?? ' ₽';

      noUiSlider.create(sliderEl, {
        start,
        step,
        range: { min, max },
        connect: [true, false],
        tooltips: false,
        format: { to: v => v, from: v => v },
      });

      const render = v => {
        if (valueEl) valueEl.textContent = nf.format(Math.round(v)) + suffix;
      };
      sliderEl.noUiSlider.on('update', (values, handle) => render(values[handle]));
      render(start);
    });
  }

  new Swiper('.home-slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    speed: 600,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: { spaceBetween: 14 },
      1024: { spaceBetween: 16 },
    },
  });

  new Swiper('.reviews__slider', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 2500,
    },
    navigation: {
      prevEl: '.reviews__btn-prev',
      nextEl: '.reviews__btn-next',
    },
    pagination: {
      el: '.reviews__pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2.3, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 },
    },
  });

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    if (input) {
      new PhoneInputFormatter(input);
    }
  });
  document.querySelectorAll('.accordion-header').forEach(header => new Accordion(header));

  const popupTriggers = document.querySelectorAll('[data-popup]');
  const closeButtonsPopup = document.querySelectorAll('.popup__close, .popup-close');

  function closePopup() {
    document.querySelectorAll('.popup.show').forEach(popup => {
      popup.classList.remove('show');
    });
  }

  popupTriggers.forEach(popupTrigger => {
    popupTrigger.addEventListener('click', function (event) {
      event.preventDefault();

      const popupId = popupTrigger.getAttribute('data-popup');
      const popupElement = document.querySelector(popupId);

      if (!popupElement) {
        console.error(`Popup с id ${popupId} не найден.`);
        return;
      }

      closePopup(); // Закрываем все попапы перед открытием нового
      popupElement.classList.add('show');
    });
  });

  closeButtonsPopup.forEach(closeButton => {
    closeButton.addEventListener('click', function (event) {
      event.preventDefault();
      closePopup();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closePopup();
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      closePopup();
    }
  });
});

/* Slide Toggle */
let _slideUp = (target, duration = 500, displayCSS = 'block') => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};

let _slideDown = (target, duration = 500, displayCSS = 'block') => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') display = displayCSS;
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};

let _slideToggle = (target, duration = 500, displayCSS = 'block') => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration, displayCSS);
    } else {
      return _slideUp(target, duration, displayCSS);
    }
  }
};

class PhoneInputFormatter {
  constructor(input) {
    this.input = input;
    this.initEvents();
  }

  getInputNumbersValue() {
    return this.input.value ? this.input.value.replace(/\D/g, '') : '';
  }

  onPhonePaste(e) {
    const inputNumbersValue = this.getInputNumbersValue();
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        this.input.value = inputNumbersValue;
      }
    }
  }

  onPhoneInput(e) {
    let inputNumbersValue = this.getInputNumbersValue(),
      selectionStart = this.input.selectionStart,
      formattedInputValue = '';

    if (!inputNumbersValue) {
      return (this.input.value = '');
    }

    if (this.input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        this.input.value = inputNumbersValue;
      }
      return;
    }

    if (['7', '8', '9'].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
      const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = firstSymbols + ' ';
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    this.input.value = formattedInputValue;
  }

  onPhoneKeyDown(e) {
    const inputValue = this.input.value.replace(/\D/g, '');
    if (e.keyCode === 8 && inputValue.length === 1) {
      this.input.value = '';
    }
  }

  initEvents() {
    this.input.addEventListener('keydown', e => this.onPhoneKeyDown(e));
    this.input.addEventListener('input', e => this.onPhoneInput(e), false);
    this.input.addEventListener('paste', e => this.onPhonePaste(e), false);
  }
}

class Accordion {
  constructor(header) {
    this.header = header;
    this.accordionItem = header.closest('.accordion-item');
    this.accordionBody = this.accordionItem.querySelector('.accordion-body');
    this.button = this.accordionItem.querySelector('.accordion-buttom');

    if (!this.accordionItem.classList.contains('active')) {
      this.accordionBody.style.display = 'none';
    }

    this.initEvent();
  }

  toggleAccordion() {
    const isActive = this.accordionItem.classList.toggle('active');
    _slideToggle(this.accordionBody, 300);
    Accordion.closeOthers(this.accordionItem);
  }

  static closeOthers(currentItem) {
    document.querySelectorAll('.accordion-item').forEach(otherItem => {
      if (otherItem !== currentItem) {
        otherItem.classList.remove('active');
        const otherBody = otherItem.querySelector('.accordion-body');
        _slideUp(otherBody, 300);
      }
    });
  }

  initEvent() {
    if (this.button) {
      this.button.addEventListener('click', () => this.toggleAccordion());
    }
    if (this.header) {
      this.header.addEventListener('click', () => this.toggleAccordion());
    }
  }
}
