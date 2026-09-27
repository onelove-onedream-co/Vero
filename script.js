document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link, .nav-trigger, .logo');
  const sections = document.querySelectorAll('.page-section');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  function navigateTo(pageId) {
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === pageId) {
        section.classList.add('active');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === pageId) {
        link.classList.add('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const pageId = link.dataset.page;
      if (pageId) {
        e.preventDefault();
        navigateTo(pageId);
      }
    });
  });

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu on outside tap or Escape key
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
      closeMenu();
    } 
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Form submission handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formFeedback.textContent = "Gracias por tu mensaje. Te responderé a la brevedad.";
      formFeedback.style.color = "var(--primary)";
      contactForm.reset();
    });
  }
});
