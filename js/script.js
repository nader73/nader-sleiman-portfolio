(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const menuButton = document.getElementById('menuButton');
  const mobileNav = document.getElementById('mobileNav');
  const backToTop = document.getElementById('backToTop');
  const currentYear = document.getElementById('currentYear');
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav a, .mobile-nav a:not(.button)'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  function updateHeader() {
    const scrolled = window.scrollY > 40;
    if (header) header.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 650);
  }

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.classList.remove('open');
    mobileNav.classList.remove('open');
    if (header) header.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }

  function toggleMenu() {
    if (!menuButton || !mobileNav) return;
    const open = !mobileNav.classList.contains('open');
    menuButton.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    if (header) header.classList.toggle('menu-active', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  if (menuButton) menuButton.addEventListener('click', toggleMenu);
  if (mobileNav) mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealItems.forEach((element) => observer.observe(element));
  } else {
    revealItems.forEach((element) => element.classList.add('visible'));
  }

  function setActiveSection(id) {
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
