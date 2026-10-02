(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const menuButton = document.getElementById('menuButton');
  const mobileNav = document.getElementById('mobileNav');
  const backToTop = document.getElementById('backToTop');
  const currentYear = document.getElementById('currentYear');
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav a, .mobile-nav a:not(.button)'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  function updateHeader() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 650);
  }

  function closeMenu() {
    menuButton.classList.remove('open');
    mobileNav.classList.remove('open');
    header.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }

  function toggleMenu() {
    const open = !mobileNav.classList.contains('open');
    menuButton.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    header.classList.toggle('menu-active', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  menuButton.addEventListener('click', toggleMenu);
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  document.querySelectorAll('.reveal').forEach(function (element) {
    observer.observe(element);
  });

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
})();
