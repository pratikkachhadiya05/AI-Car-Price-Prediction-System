document.addEventListener('DOMContentLoaded', () => {

  /* ============ PREDICTOR RESULT REVEAL ============ */
  const resultCard = document.getElementById('resultCard');
  const priceValue = document.getElementById('priceValue');
  const rangeLow = document.getElementById('rangeLow');
  const rangeHigh = document.getElementById('rangeHigh');
  const gaugeFill = document.getElementById('gaugeFill');
  const confidenceValue = document.getElementById('confidenceValue');
  const GAUGE_CIRCUMFERENCE = 251; // matches stroke-dasharray in style.css

  if (resultCard && resultCard.dataset.hasPrediction === 'true') {
    const rawPrice = parseInt(priceValue.textContent.trim().replace(/,/g, ''), 10);

    if (!Number.isNaN(rawPrice)) {
      // Format the price with commas
      priceValue.textContent = rawPrice.toLocaleString('en-IN');

      // Estimated range: +/- 8% around the predicted price
      const low = Math.round(rawPrice * 0.92);
      const high = Math.round(rawPrice * 1.08);
      rangeLow.textContent = low.toLocaleString('en-IN');
      rangeHigh.textContent = high.toLocaleString('en-IN');

      // Static confidence indicator (the underlying model doesn't expose
      // a per-prediction confidence score, so this reflects overall model fit)
      const confidence = 90;
      confidenceValue.textContent = confidence + '%';

      requestAnimationFrame(() => {
        resultCard.classList.add('active');
        const offset = GAUGE_CIRCUMFERENCE * (1 - confidence / 100);
        gaugeFill.style.strokeDashoffset = offset;
        const check = document.getElementById('successCheck');
        if (check) check.style.display = 'flex';
      });
    }
  } else if (resultCard) {
    // No prediction yet: keep the gauge visually empty
    gaugeFill.style.strokeDashoffset = GAUGE_CIRCUMFERENCE;
  }

  /* ============ SHOW ERROR AS TOAST ============ */
  const apiNote = document.getElementById('apiNote');
  const toast = document.getElementById('toast');
  if (apiNote && toast && apiNote.textContent.trim()) {
    toast.textContent = apiNote.textContent.trim();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ============ SUBMIT BUTTON SPINNER ============ */
  const form = document.getElementById('predictorForm');
  const predictBtn = document.getElementById('predictBtn');
  if (form && predictBtn) {
    form.addEventListener('submit', () => {
      const label = predictBtn.querySelector('.btn-label');
      const spinner = predictBtn.querySelector('.spinner');
      predictBtn.disabled = true;
      if (spinner) spinner.hidden = false;
      if (label) label.textContent = 'Predicting…';
    });
  }

  /* ============ NAVBAR SCROLL STATE ============ */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');
  const onScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============ HAMBURGER / MOBILE NAV ============ */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ============ THEME TOGGLE ============ */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('carprice-theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('carprice-theme', next);
      themeToggle.querySelector('.theme-icon').textContent = next === 'light' ? '☀️' : '🌙';
    });
  }

  /* ============ FAQ ACCORDION ============ */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ============ FADE-IN ON SCROLL ============ */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ============ HERO TYPING EFFECT ============ */
  const typingTarget = document.getElementById('typingTarget');
  if (typingTarget) {
    const phrase = "Know Your Car's Worth Instantly";
    let i = 0;
    const type = () => {
      if (i <= phrase.length) {
        typingTarget.textContent = phrase.slice(0, i);
        i++;
        setTimeout(type, 45);
      }
    };
    type();
  }
});
