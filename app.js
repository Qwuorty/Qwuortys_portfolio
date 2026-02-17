const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader__bar');
const cursor = document.querySelector('.cursor');
const langSwitch = document.getElementById('langSwitch');
const revealItems = document.querySelectorAll('[data-reveal]');
const counters = document.querySelectorAll('[data-counter]');
const magneticItems = document.querySelectorAll('.magnetic');
const tiltCards = document.querySelectorAll('[data-tilt]');

const SUPPORTED_LANGUAGES = ['ru', 'en'];
const LANGUAGE_PATH_RE = /^\/(ru|en)(?=\/|$)/;

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
  'hero.text': 'Next.js, Node.js, PostgreSQL, Docker. I help founders launch and grow SaaS, internal systems, and customer-facing web apps.',
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
  'about.p1': 'I combine frontend craft, backend reliability, and deployment ownership. You get one engineer who can turn ideas into production-ready software.',
  'about.p2': 'My process: audit, architecture, weekly milestones, measurable outcomes.',
  'contact.kicker': 'Contact',
  'contact.title': 'Need a fullstack partner for your next release?',
  'contact.text': 'Send your scope, and I will return architecture, timeline, and budget options within 60 minutes.',
  'contact.telegram': 'Telegram',
  'footer.top': 'Back to top'
};

const russianStrings = {
  'loader.label': '\u0417\u0430\u043f\u0443\u0441\u043a \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e...',
  'nav.work': '\u041a\u0435\u0439\u0441\u044b',
  'nav.about': '\u041e\u0431\u043e \u043c\u043d\u0435',
  'nav.contact': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b',
  'header.cta': '\u041d\u0430\u0447\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442',
  'hero.eyebrow': 'FULLSTACK \u0420\u0410\u0417\u0420\u0410\u0411\u041e\u0422\u0427\u0418\u041a',
  'hero.title.line1': '\u0421\u043e\u0437\u0434\u0430\u044e',
  'hero.title.line2': '\u0432\u0435\u0431-\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b,',
  'hero.title.line3': '\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0437\u0430\u043f\u0443\u0441\u043a\u0430\u044e\u0442\u0441\u044f \u0431\u044b\u0441\u0442\u0440\u043e \u0438 \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u0443\u044e\u0442\u0441\u044f.',
  'hero.text': 'Next.js, Node.js, PostgreSQL, Docker. \u041f\u043e\u043c\u043e\u0433\u0430\u044e \u0437\u0430\u043f\u0443\u0441\u043a\u0430\u0442\u044c \u0438 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0442\u044c SaaS, \u0432\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0438\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0438 \u043a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u0438\u0435 \u0432\u0435\u0431-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f.',
  'hero.btn.work': '\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043a\u0435\u0439\u0441\u044b',
  'hero.btn.contact': '\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443',
  'stats.projects': '\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432',
  'stats.products': '\u0417\u0430\u043f\u0443\u0449\u0435\u043d\u043e \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432 \u0441 \u043d\u0443\u043b\u044f',
  'stats.lighthouse': '\u0421\u0440\u0435\u0434\u043d\u0438\u0439 Lighthouse score',
  'work.kicker': '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b',
  'work.title': 'Fullstack \u043a\u0435\u0439\u0441\u044b',
  'card1.tag': 'B2B SaaS',
  'card1.title': '\u041f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430 Revenue Ops',
  'card1.text': '\u0421\u043e\u0431\u0440\u0430\u043b \u0440\u043e\u043b\u0435\u0432\u0443\u044e \u043f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0441 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u043e\u0439 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u043e\u0439 \u0438 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0435\u0439 Stripe Billing.',
  'card1.li1': 'Next.js + NestJS',
  'card1.li2': 'PostgreSQL + Redis',
  'card1.li3': '\u0417\u0430\u043f\u0443\u0441\u043a \u0437\u0430 21 \u0434\u0435\u043d\u044c',
  'card2.tag': '\u041c\u0430\u0440\u043a\u0435\u0442\u043f\u043b\u0435\u0439\u0441',
  'card2.title': '\u0426\u0435\u043d\u0442\u0440 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0434\u0430\u0432\u0446\u0430\u043c\u0438',
  'card2.text': '\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043b \u0440\u0443\u0442\u0438\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u044b: \u0441\u0447\u0435\u0442\u0430, \u043e\u0441\u0442\u0430\u0442\u043a\u0438 \u0438 \u043b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0443.',
  'card2.li1': 'React + Node API',
  'card2.li2': '\u041e\u0447\u0435\u0440\u0435\u0434\u0438 \u0437\u0430\u0434\u0430\u0447',
  'card2.li3': '-64% \u0440\u0443\u0447\u043d\u044b\u0445 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439',
  'card3.tag': '\u0424\u0438\u043d\u0442\u0435\u0445',
  'card3.title': '\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u0432',
  'card3.text': '\u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u044b\u0439 \u043e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u0441 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u043e\u0439 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432 \u0438 \u0430\u0443\u0434\u0438\u0442-\u043b\u043e\u0433\u0430\u043c\u0438.',
  'card3.li1': 'Next.js + Go microservice',
  'card3.li2': '\u0428\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u0444\u0430\u0439\u043b\u043e\u0432',
  'card3.li3': '4.9/5 \u043e\u0446\u0435\u043d\u043a\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u044b',
  'card4.tag': '\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0438\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b',
  'card4.title': '\u0414\u0432\u0438\u0436\u043e\u043a \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438',
  'card4.text': '\u0421\u043e\u0431\u0440\u0430\u043b \u043a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0432 \u0434\u043b\u044f \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u0442\u0438\u043a\u0435\u0442\u043e\u0432.',
  'card4.li1': 'TypeScript mono-repo',
  'card4.li2': '\u0421\u043e\u0431\u044b\u0442\u0438\u044f \u0432 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0438',
  'card4.li3': '+38% \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u043e\u0442\u0432\u0435\u0442\u0430',
  'about.kicker': '\u0427\u0442\u043e \u0434\u0430\u044e \u043f\u0440\u043e\u0435\u043a\u0442\u0443',
  'about.title': '\u0418\u043d\u0436\u0435\u043d\u0435\u0440\u0438\u044f \u0441 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432\u044b\u043c \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u0435\u043c',
  'about.p1': '\u041a\u043e\u043c\u0431\u0438\u043d\u0438\u0440\u0443\u044e \u0441\u0438\u043b\u044c\u043d\u044b\u0439 \u0444\u0440\u043e\u043d\u0442\u0435\u043d\u0434, \u043d\u0430\u0434\u0435\u0436\u043d\u044b\u0439 \u0431\u044d\u043a\u0435\u043d\u0434 \u0438 \u043f\u043e\u043b\u043d\u044b\u0439 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c \u0434\u0435\u043f\u043b\u043e\u044f. \u0412\u044b \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u0442\u0435 \u043e\u0434\u043d\u043e\u0433\u043e \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u0430, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0434\u043e\u0432\u043e\u0434\u0438\u0442 \u0438\u0434\u0435\u044e \u0434\u043e \u043f\u0440\u043e\u0434\u0430\u043a\u0448\u0435\u043d\u0430.',
  'about.p2': '\u041f\u0440\u043e\u0446\u0435\u0441\u0441: \u0430\u0443\u0434\u0438\u0442, \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430, \u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u044d\u0442\u0430\u043f\u044b \u0438 \u0438\u0437\u043c\u0435\u0440\u0438\u043c\u044b\u0435 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b.',
  'contact.kicker': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b',
  'contact.title': '\u041d\u0443\u0436\u0435\u043d fullstack-\u043f\u0430\u0440\u0442\u043d\u0435\u0440 \u0434\u043b\u044f \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0433\u043e \u0440\u0435\u043b\u0438\u0437\u0430?',
  'contact.text': '\u041e\u0442\u043f\u0440\u0430\u0432\u044c\u0442\u0435 \u043a\u0440\u0430\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438, \u0438 \u044f \u0432\u0435\u0440\u043d\u0443 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443, \u0441\u0440\u043e\u043a\u0438 \u0438 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b \u0431\u044e\u0434\u0436\u0435\u0442\u0430 \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 60 \u043c\u0438\u043d\u0443\u0442.',
  'contact.telegram': 'Telegram',
  'footer.top': '\u041d\u0430\u0432\u0435\u0440\u0445'
};

const translations = {
  en: {
    title: 'Alex Voss | Fullstack Developer',
    description: 'Dennis-inspired portfolio skeleton for a fullstack developer focused on product delivery and performance.',
    strings: englishStrings
  },
  ru: {
    title: 'Alex Voss | Fullstack \u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a',
    description: '\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e fullstack-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0430: \u0437\u0430\u043f\u0443\u0441\u043a \u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u0432\u0435\u0431-\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432 \u0441 \u0444\u043e\u043a\u0443\u0441\u043e\u043c \u043d\u0430 \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0438 \u043d\u0430\u0434\u0435\u0436\u043d\u043e\u0441\u0442\u044c.',
    strings: russianStrings
  }
};

let currentLang = 'ru';
let progress = 0;
let appStarted = false;

const detectLanguageFromPath = () => {
  const match = window.location.pathname.match(LANGUAGE_PATH_RE);
  return match ? match[1] : null;
};

const stripLanguagePrefix = (path) => {
  const stripped = path.replace(LANGUAGE_PATH_RE, '');
  return stripped === '' ? '/' : stripped;
};

const buildPathForLanguage = (lang, path = window.location.pathname) => {
  const basePath = stripLanguagePrefix(path);
  return basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;
};

const syncLanguagePath = (lang, replaceHistory) => {
  const nextPath = buildPathForLanguage(lang);
  const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    const historyAction = replaceHistory ? 'replaceState' : 'pushState';
    window.history[historyAction]({}, '', nextUrl);
  }
};

const setMeta = (langPack) => {
  document.title = langPack.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', langPack.description);
  }
};

const applyTranslations = (lang) => {
  const langPack = translations[lang] || translations.ru;
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

const chooseLanguage = (lang, replaceHistory) => {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return;
  }

  currentLang = lang;
  applyTranslations(lang);
  syncLanguagePath(lang, replaceHistory);
};

const resolveInitialLanguage = () => {
  const pathLanguage = detectLanguageFromPath();
  if (pathLanguage) {
    return pathLanguage;
  }
  syncLanguagePath('ru', true);
  return 'ru';
};

setYear();
document.body.style.overflow = 'hidden';

const initialLanguage = resolveInitialLanguage();
chooseLanguage(initialLanguage, true);
startExperience();

if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';
    chooseLanguage(nextLang, false);
  });
}

window.addEventListener('popstate', () => {
  const pathLanguage = detectLanguageFromPath();
  const normalizedLanguage = pathLanguage || 'ru';

  if (!pathLanguage) {
    syncLanguagePath('ru', true);
  }

  if (normalizedLanguage !== currentLang) {
    currentLang = normalizedLanguage;
    applyTranslations(currentLang);
  }
});