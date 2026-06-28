// Navbar scroll effect
const navbar = document.getElementById('navbar');
const handleScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu toggle with improved accessibility
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

const closeMenu = () => {
  toggle.classList.remove('open');
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
};

const openMenu = () => {
  toggle.classList.add('open');
  links.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
};

toggle.addEventListener('click', () => {
  if (toggle.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu when clicking on a link
links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-links') && !e.target.closest('.nav-toggle')) {
    closeMenu();
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// Intersection Observer for reveal animations with mobile optimization
const observerOptions = {
  threshold: window.innerWidth < 768 ? 0.05 : 0.12,
  rootMargin: '50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contact form submission
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  
  // Simple validation
  if (!name || !email || !msg) {
    alert('Please fill in all fields');
    return;
  }
  
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Hi Praveen,\n\n${msg}\n\n— ${name}\n${email}`);
  
  window.location.href = `mailto:praveenkumar27281@gmail.com?subject=${subject}&body=${body}`;
  
  // Reset form after submission
  form.reset();
});

// Handle viewport changes for responsive behavior
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  
  // Reset menu if viewport changes from mobile to desktop
  if ((lastWidth <= 767 && currentWidth > 767) || (lastWidth > 767 && currentWidth <= 767)) {
    closeMenu();
  }
  
  lastWidth = currentWidth;
}, { passive: true });

// Prevent horizontal scrolling on mobile
document.addEventListener('DOMContentLoaded', () => {
  const preventScroll = (e) => {
    if (e.touches.length > 1 && e.touches[0].clientX + e.touches[0].radiusX > window.innerWidth) {
      e.preventDefault();
    }
  };
  
  document.addEventListener('touchmove', preventScroll, { passive: false });
});