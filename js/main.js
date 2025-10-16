// ===================================
// Navigation & Theme Toggle
// ===================================

const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');

// Sticky Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

// Mobile Menu Toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Theme Toggle
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark');
  themeToggle.querySelector('i').classList.remove('fa-moon');
  themeToggle.querySelector('i').classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  
  if (document.documentElement.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Back to Top Button
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===================================
// Typing Animation
// ===================================

const typingText = document.getElementById('typing-text');
const roles = [
  'CSIT Student',
  'Full-Stack Developer',
  'Web Developer',
  'PHP Developer',
  'Python Developer',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing new role
  }
  
  setTimeout(typeRole, typingSpeed);
}

// Start typing animation
setTimeout(typeRole, 1000);

// ===================================
// Smooth Scroll
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Scroll Reveal Animation
// ===================================

function revealOnScroll() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Add scroll-reveal class to elements
const elementsToReveal = document.querySelectorAll(`
  .about-content,
  .stat-card,
  .skill-category,
  .project-card,
  .experience-item,
  .gallery-item,
  .contact-card
`);

elementsToReveal.forEach(element => {
  element.classList.add('scroll-reveal');
});

// Initial check for elements in view
setTimeout(revealOnScroll, 100);

// ===================================
// Skill Bars Animation
// ===================================

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (barTop < windowHeight - 100) {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    }
  });
}

let skillsAnimated = false;
window.addEventListener('scroll', () => {
  if (!skillsAnimated) {
    const skillsSection = document.getElementById('skills');
    const skillsTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (skillsTop < windowHeight - 200) {
      animateSkillBars();
      skillsAnimated = true;
    }
  }
});

// ===================================
// Gallery Lightbox
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentGalleryIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentGalleryIndex = index;
    openLightbox(index);
  });
});

function openLightbox(index) {
  const item = galleryItems[index];
  const placeholder = item.querySelector('.gallery-placeholder').cloneNode(true);
  
  lightboxContent.innerHTML = '';
  lightboxContent.appendChild(placeholder);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', () => {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentGalleryIndex);
});

lightboxNext.addEventListener('click', () => {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
  openLightbox(currentGalleryIndex);
});

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
  
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentGalleryIndex);
    } else if (e.key === 'ArrowRight') {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      openLightbox(currentGalleryIndex);
    }
  }
});

// ===================================
// Lazy Loading (for future images)
// ===================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Loading State
// ===================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===================================
// Performance: Reduce motion for users who prefer it
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--transition-fast', '0ms');
  document.documentElement.style.setProperty('--transition-base', '0ms');
  document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ===================================
// Console Easter Egg
// ===================================

console.log(`
%c
╔═══════════════════════════════════════════╗
║                                           ║
║   Hi there, Developer!                    ║
║                                           ║
║   Looking for a Full-Stack Developer?    ║
║   Let's build something amazing together! ║
║                                           ║
║   Email: sujanbasnet7206@gmail.com       ║
║   GitHub: github.com/sujan7206           ║
║                                           ║
╚═══════════════════════════════════════════╝
`,
'color: #2563eb; font-family: monospace; font-size: 12px;'
);
