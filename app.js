const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader__bar');
const cursor = document.querySelector('.cursor');
const langGate = document.getElementById('langGate');
const langSwitch = document.getElementById('langSwitch');
const languageChoices = document.querySelectorAll('[data-lang-choice]');
const revealItems = document.querySelectorAll('[data-reveal]');
const counters = document.querySelectorAll('[data-counter]');
const magneticItems = document.querySelectorAll('.magnetic');
const tiltCards = document.querySelectorAll('[data-tilt]');

const STORAGE_KEY = 'portfolio_language';
const SUPPORTED_LANGUAGES = ['ru', 'en'];

const englishStrings = {
  'loader.label': 'Booting portfolio engine...',
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'header.cta': 'Start Project',
  'hero.eyebrow': 'FULLSTACK DEVELOPER',
  'hero.title.line1': 'I build',
  'hero.title.line2': 'products that ship',
  'hero.title.line3': 'fast and scale clean.',
  'hero.text':
    'Next.js, Node.js, PostgreSQL, Docker. I help founders launch and grow SaaS, internal systems, and customer-facing web apps.',
  'hero.btn.work': 'See Cases',
  'hero.btn.contact': 'Book a call',
  'stats.projects': 'Projects delivered',
  'stats.products': 'Products from scratch',
  'stats.lighthouse': 'Avg. Lighthouse score',
  'work.kicker': 'Selected Work',
  'work.title': 'Fullstack case studies',
  'card1.tag': 'B2B SaaS',
  'card1.title': 'Revenue Ops Platform',
  'card1.text': 'Built a role-based dashboard with custom analytics and Stripe billing flows.',
  'card1.li1': 'Next.js + NestJS',
  'card1.li2': 'PostgreSQL + Redis',
  'card1.li3': 'Launch in 21 days',
  'card2.tag': 'Marketplace',
  'card2.title': 'Vendor Control Hub',
  'card2.text': 'Replaced manual workflows with automations for invoices, stock, and logistics.',
  'card2.li1': 'React + Node API',
  'card2.li2': 'Queue workers',
  'card2.li3': '-64% manual ops time',
  'card3.tag': 'Fintech',
  'card3.title': 'Client Onboarding App',
  'card3.text': 'Implemented secure onboarding with document checks and audit logs.',
  'card3.li1': 'Next.js + Go microservice',
  'card3.li2': 'Encrypted file storage',
  'card3.li3': '4.9/5 internal rating',
  'card4.tag': 'Internal Tooling',
  'card4.title': 'Support Flow Engine',
  'card4.text': 'Delivered a workflow builder to route tickets automatically across teams.',
  'card4.li1': 'TypeScript mono-repo',
  'card4.li2': 'Real-time events',
  'card4.li3': '+38% first-response speed',
  'about.kicker': 'What I Bring',
  'about.title': 'Engineering with product mindset',
  'about.p1':
    'I combine frontend craft, backend reliability, and deployment ownership. You get one engineer who can turn ideas into production-ready software.',
  'about.p2': 'My process: audit, architecture, weekly milestones, measurable outcomes.',
  'contact.kicker': 'Contact',
  'contact.title': 'Need a fullstack partner for your next release?',
  'contact.text':
    'Send your scope, and I will return architecture, timeline, and budget options within 60 minutes.',
  'contact.telegram': 'Telegram',
  'footer.top': 'Back to top'
};

const translations = {
  en: {
    title: 'Alex Voss | Fullstack Developer',
    description:
      'Dennis-inspired portfolio skeleton for a fullstack developer focused on product delivery and performance.',
    strings: englishStrings
  },
  ru: {
    title: 'Alex Voss | Fullstack Developer',
    description:
      'Dennis-inspired portfolio skeleton for a fullstack developer focused on product delivery and performance.',
    strings: { ...englishStrings }
  }
};

let currentLang = 'en';
let progress = 0;
let appStarted = false;

const setMeta = (langPack) => {
  document.title = langPack.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', langPack.description);
  }
};

const applyTranslations = (lang) => {
  const langPack = translations[lang] || translations.en;
  document.documentElement.lang = lang;
  setMeta(langPack);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const translatedText = langPack.strings[key];
    if (typeof translatedText === 'string') {
      element.textContent = translatedText;
    }
  });

  if (langSwitch) {
    const switchLabel = lang === 'ru' ? 'EN' : 'RU';
    const ariaLabel = lang === 'ru' ? 'Switch to English' : 'Switch to Russian';
    langSwitch.textContent = switchLabel;
    langSwitch.setAttribute('aria-label', ariaLabel);
  }
};

const setSavedLanguage = (lang) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to persist language preference', error);
  }
};

const getSavedLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

const tickLoader = () => {
  progress += Math.random() * 14;
  if (progress >= 100) {
    progress = 100;
    loaderBar.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.style.overflow = 'auto';
    }, 250);
    return;
  }

  loaderBar.style.width = `${progress.toFixed(1)}%`;
  setTimeout(tickLoader, 120);
};

const runRevealObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item, idx) => {
    item.style.transitionDelay = `${Math.min(idx * 60, 240)}ms`;
    observer.observe(item);
  });
};

const animateCounter = (el) => {
  const target = Number(el.dataset.counter) || 0;
  const duration = 1100;
  const start = performance.now();

  const draw = (time) => {
    const pct = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - pct, 3);
    el.textContent = String(Math.floor(eased * target));
    if (pct < 1) requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
};

const runCounterObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const setupCursor = () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let currentX = x;
  let currentY = y;

  window.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
  });

  const loop = () => {
    currentX += (x - currentX) * 0.18;
    currentY += (y - currentY) * 0.18;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };

  loop();

  document.querySelectorAll('a, button, .card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
};

const setupMagnetic = () => {
  magneticItems.forEach((item) => {
    item.addEventListener('mousemove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0, 0)';
    });
  });
};

const setupTiltCards = () => {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const percentX = (event.clientX - rect.left) / rect.width;
      const percentY = (event.clientY - rect.top) / rect.height;

      const rotY = (percentX - 0.5) * 8;
      const rotX = (0.5 - percentY) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      card.style.setProperty('--mx', `${percentX * 100}%`);
      card.style.setProperty('--my', `${percentY * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
};

const setYear = () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
};

const startExperience = () => {
  if (appStarted) return;
  appStarted = true;

  progress = 0;
  loaderBar.style.width = '0%';
  loader.classList.remove('is-hidden');

  document.body.style.overflow = 'hidden';
  setupCursor();
  setupMagnetic();
  setupTiltCards();
  runRevealObserver();
  runCounterObserver();
  tickLoader();
};

const chooseLanguage = (lang, shouldStart) => {
  if (!SUPPORTED_LANGUAGES.includes(lang)) return;

  currentLang = lang;
  setSavedLanguage(lang);
  applyTranslations(lang);

  if (langGate) {
    langGate.classList.add('is-hidden');
  }

  if (shouldStart && !appStarted) {
    startExperience();
  }
};

setYear();
document.body.style.overflow = 'hidden';

languageChoices.forEach((button) => {
  button.addEventListener('click', () => {
    chooseLanguage(button.dataset.langChoice, true);
  });
});

if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';
    chooseLanguage(nextLang, false);
  });
}

const savedLanguage = getSavedLanguage();
if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
  currentLang = savedLanguage;
  applyTranslations(currentLang);
  if (langGate) langGate.classList.add('is-hidden');
  startExperience();
} else {
  applyTranslations('en');
  currentLang = 'en';
  if (loader) loader.classList.add('is-hidden');
  if (langGate) langGate.classList.remove('is-hidden');
}