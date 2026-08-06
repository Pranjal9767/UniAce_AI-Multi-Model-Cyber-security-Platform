/**
 * AegisAI - Core Application Controller
 * Handles header sticky scroll, scroll reveal observer, counter-up numbers, FAQ accordion,
 * audio FX synthesizer, and mobile navigation drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initScrollReveal();
  initCounters();
  initFAQAccordion();
  initAudioSynth();
  initMobileMenu();
});

/* Sticky Header on Scroll */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* IntersectionObserver for Scroll Reveal Animations */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* Statistics Number Counter Up */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.dataset.target);
          const suffix = counter.dataset.suffix || '';
          const prefix = counter.dataset.prefix || '';
          const decimals = counter.dataset.decimals ? parseInt(counter.dataset.decimals) : 0;
          
          let count = 0;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            counter.innerText = prefix + count.toFixed(decimals) + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* FAQ Accordion Toggle */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordions
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        playSynthBeep(440, 0.05);
      }
    });
  });
}

/* Audio FX Synthesizer (Web Audio API) */
let audioCtx = null;
let soundEnabled = false;

function initAudioSynth() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    soundEnabled = !soundEnabled;
    soundBtn.classList.toggle('active', soundEnabled);
    
    if (soundEnabled) {
      playSynthBeep(880, 0.1);
      soundBtn.title = 'Mute UI Sound Effects';
    } else {
      soundBtn.title = 'Enable UI Sound Effects';
    }
  });

  // Attach hover beep to buttons if sound enabled
  document.querySelectorAll('.btn, .scanner-tab, .filter-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (soundEnabled) playSynthBeep(520, 0.03);
    });
  });
}

function playSynthBeep(freq, duration) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio play exception', e);
  }
}

/* Mobile Menu Toggle */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'var(--bg-glass-heavy)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-glass)';
    }
  });
}
