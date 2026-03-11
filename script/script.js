/* ============================================
   lafa.codes_ — 2026 Portfolio Scripts
   ============================================ */

(() => {
  'use strict';

  // --- Typing Effect ---
  const phrases = [
    'matter.',
    'think.',
    'automate.',
    'protect.',
    'innovate.',
    'scale.',
  ];

  const typedTarget = document.getElementById('typedTarget');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedTarget.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }

  if (typedTarget) typeLoop();

  // --- Cursor Glow ---
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      cursorGlow.style.left = cx + 'px';
      cursorGlow.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // --- Nav Scroll Effect ---
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1500;
          const start = performance.now();

          function updateCount(now) {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(updateCount);
          }

          requestAnimationFrame(updateCount);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => counterObserver.observe(c));

  // --- Smooth anchor scroll (offset for fixed nav) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Dynamic Footer Year ---
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Theme Toggle (Light / Dark) ---
  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

  }

  // Apply theme immediately
  setTheme(getPreferredTheme());

  // Toggle buttons (desktop + mobile)
  document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // Listen for OS preference changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });

})();
