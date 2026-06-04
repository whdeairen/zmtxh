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

// 将数字补零
function pad(n) { return String(n).padStart(2, '0'); }

// 生成 YYYYMMDD 格式日期字符串
function getDateStr() {
  const now = new Date();
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
}

// 将表单数据保存为 txt 并下载（使用 data URI，兼容 file:// 环境）
function saveApplicationTxt(data) {
  const now = new Date();
  const dateStr = getDateStr();
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const typeLabel = { personal: '个人会员', organization: '单位会员' };

  const lines = [
    '========================================',
    '    中卫市自媒体行业协会 入会申请记录',
    '========================================',
    `提交时间：${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)} ${timeStr}`,
    '----------------------------------------',
    `姓名 / 单位名称：${data.name}`,
    `联系电话：${data.phone}`,
    `微信号：${data.wechat || '（未填写）'}`,
    `会员类型：${typeLabel[data.type] || data.type}`,
    `主要运营平台：${data.platform || '（未填写）'}`,
    '----------------------------------------',
    '个人 / 单位简介：',
    data.intro || '（未填写）',
    '========================================',
  ];

  const content = lines.join('\r\n');

  // 文件名：日期+姓名，过滤掉不能用于文件名的字符
  const safeName = data.name.replace(/[\\/:*?"<>|]/g, '_');
  const fileName = `${dateStr}_${safeName}.txt`;

  // 使用 data URI 确保在 file:// 环境下也能正确触发下载
  const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  // 延迟清理，确保下载触发
  setTimeout(() => {
    document.body.removeChild(a);
  }, 200);
}

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

  // Collect all form data
  const formData = {
    name,
    phone,
    wechat: document.getElementById('wechat').value.trim(),
    type,
    platform: document.getElementById('platform').value.trim(),
    intro: document.getElementById('intro').value.trim(),
  };

  // 提交状态
  const submitBtn = joinForm.querySelector('button[type="submit"]');
  submitBtn.textContent = '提交中...';
  submitBtn.disabled = true;

  // 先触发 txt 下载，再显示成功提示
  saveApplicationTxt(formData);

  setTimeout(() => {
    joinForm.style.display = 'none';
    formSuccess.style.display = 'block';
  }, 600);
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
