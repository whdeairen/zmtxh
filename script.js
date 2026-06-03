// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Menu =====
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Hero Particles =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}
createParticles();

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.about-card, .timeline-item, .news-card, .service-card, .contact-card, .join-info, .join-form-card'
  );

  elements.forEach(el => {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
initScrollReveal();

// ===== Form Submission =====
const joinForm = document.getElementById('joinForm');
const formSuccess = document.getElementById('formSuccess');

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const type = document.getElementById('type').value;

  if (!name || !phone || !type) {
    alert('请填写所有必填项');
    return;
  }

  // Phone validation
  if (!/^1[3-9]\d{9}$/.test(phone) && !/^\d{7,12}$/.test(phone)) {
    alert('请输入正确的联系电话');
    return;
  }

  // Simulate form submission
  const submitBtn = joinForm.querySelector('button[type="submit"]');
  submitBtn.textContent = '提交中...';
  submitBtn.disabled = true;

  setTimeout(() => {
    joinForm.style.display = 'none';
    formSuccess.style.display = 'block';
  }, 1200);
});

// ===== Smooth scroll offset for fixed navbar =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });
});
