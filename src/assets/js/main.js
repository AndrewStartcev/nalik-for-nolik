document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const toggleHeader = () => header.classList.toggle('header-show', window.scrollY > 80);
  const nf = new Intl.NumberFormat('ru-RU');
  const toNum = v => (typeof v === 'number' ? v : +(String(v).replace(/[^\d.-]/g, '') || 0));

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

  document.querySelectorAll('.home-slider').forEach(root => {
    // гарантируем нужные классы/структуру
    root.classList.add('swiper');
    const wrapper =
      root.querySelector('.swiper-wrapper') ||
      (() => {
        const w = document.createElement('div');
        w.className = 'swiper-wrapper';
        while (root.firstChild) w.appendChild(root.firstChild);
        root.appendChild(w);
        return w;
      })();
    wrapper.querySelectorAll(':scope > *').forEach(el => el.classList.add('swiper-slide'));

    // инициализация
    new Swiper(root, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      speed: 600,
      watchOverflow: true,
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
  });
});
