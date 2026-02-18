const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloaderBar');
const preloaderValue = document.getElementById('preloaderValue');
const preloaderHeadline = document.getElementById('preloaderHeadline');
const fontStylesheet = document.getElementById('fontStylesheet');
const pageTransition = document.getElementById('pageTransition');
const menuOverlay = document.getElementById('menuOverlay');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const langSwitch = document.getElementById('langSwitch');
const workList = document.getElementById('workList');
const coreList = document.getElementById('coreList');
const autoList = document.getElementById('autoList');
const cursor = document.querySelector('.cursor');
const heroScrollCue = document.querySelector('.hero-scroll-cue');
const workHoverPreview = document.getElementById('workHoverPreview');
const workHoverMedia = document.getElementById('workHoverMedia');
const workHoverStack = document.getElementById('workHoverStack');

const SUPPORTED_LANGUAGES = ['ru', 'en'];
const DEFAULT_LANGUAGE = 'ru';
const LANGUAGE_PATH_RE = /^\/(ru|en)(?=\/|$)/;

const UI = {
  ru: {
    metaTitle: 'Code by Qwuorty',
    metaDescription:
      '\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e qwuorty: design + fullstack \u0434\u043b\u044f e-commerce, \u043a\u0443\u043b\u044c\u0442\u0443\u0440\u043d\u044b\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0439.',
    strings: {
      'preloader.label': '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e',
      'menu.open': '\u041c\u0435\u043d\u044e',
      'menu.close': '\u0417\u0430\u043a\u0440\u044b\u0442\u044c',
      'header.code': '\u00a9 Code by qwuorty',
      'nav.home': '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
      'nav.work': '\u041a\u0435\u0439\u0441\u044b',
      'nav.about': '\u041e\u0431\u043e \u043c\u043d\u0435',
      'nav.contact': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
      'hero.location.line1': 'Based in',
      'hero.location.line2': 'UAE',
      'hero.role.line1': '\u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a & \u0414\u0438\u0437\u0430\u0439\u043d\u0435\u0440',
      'hero.role.line2': '',
      'hero.name': 'Qwuorty',
      'hero.cta.work': '\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442\u044b',
      'hero.cta.contact': '\u041d\u0430\u0447\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442',
      'work.kicker': '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u043a\u0435\u0439\u0441\u044b',
      'work.title': '\u041f\u0440\u043e\u0435\u043a\u0442\u044b',
      'work.head.project': '\u041f\u0440\u043e\u0435\u043a\u0442',
      'work.head.type': '\u0422\u0438\u043f',
      'work.head.year': '\u0413\u043e\u0434',
      'about.kicker': '\u041e\u0431\u043e \u043c\u043d\u0435',
      'about.title': '\u0423\u0441\u043b\u0443\u0433\u0438 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f',
      'about.intro.title': '\u0424\u0443\u043b\u043b\u0441\u0442\u0435\u043a-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a \u0434\u043b\u044f \u043f\u0440\u0435\u043c\u0438\u0443\u043c-\u0434\u0438\u0434\u0436\u0438\u0442\u0430\u043b \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432.',
      'about.intro.text':
        '\u0421\u043e\u0432\u043c\u0435\u0449\u0430\u044e \u0434\u0438\u0437\u0430\u0439\u043d-\u0432\u0438\u0434\u0435\u043d\u0438\u0435 \u0438 \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u043d\u0443\u044e \u0440\u0435\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044e, \u0447\u0442\u043e\u0431\u044b \u043a\u043b\u0438\u0435\u043d\u0442 \u043f\u043e\u043b\u0443\u0447\u0430\u043b \u043e\u0434\u0438\u043d \u0446\u0435\u043b\u043e\u0441\u0442\u043d\u044b\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043e\u0442 \u0438\u0434\u0435\u0438 \u0434\u043e \u0440\u0435\u043b\u0438\u0437\u0430.',
      'about.core': '\u041a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u0443\u0441\u043b\u0443\u0433\u0438',
      'about.auto': '\u0411\u043e\u0442\u044b \u0438 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438',
      'contact.kicker': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
      'contact.title': '\u041d\u0443\u0436\u0435\u043d \u0434\u0438\u0437\u0430\u0439\u043d + \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0432 \u043e\u0434\u043d\u0438\u0445 \u0440\u0443\u043a\u0430\u0445?',
      'contact.text':
        '\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0432 Telegram \u0438\u043b\u0438 \u043d\u0430 email, \u0438 \u044f \u0432\u0435\u0440\u043d\u0443 \u043f\u043b\u0430\u043d \u0440\u0435\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.',
      'footer.top': '\u041d\u0430\u0432\u0435\u0440\u0445'
    }
  },
  en: {
    metaTitle: 'Code by Qwuorty',
    metaDescription:
      'Portfolio of qwuorty: design plus fullstack delivery for e-commerce, cultural products and automation systems.',
    strings: {
      'preloader.label': 'Loading portfolio',
      'menu.open': 'Menu',
      'menu.close': 'Close',
      'header.code': '\u00a9 Code by qwuorty',
      'nav.home': 'Home',
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.location.line1': 'Based in',
      'hero.location.line2': 'UAE',
      'hero.role.line1': 'Developer & Designer',
      'hero.role.line2': '',
      'hero.name': 'Qwuorty',
      'hero.cta.work': 'View projects',
      'hero.cta.contact': 'Start project',
      'work.kicker': 'Selected Work',
      'work.title': 'Projects',
      'work.head.project': 'Project',
      'work.head.type': 'Type',
      'work.head.year': 'Year',
      'about.kicker': 'About',
      'about.title': 'Services and automation',
      'about.intro.title': 'Fullstack developer focused on high-end digital products.',
      'about.intro.text':
        'I combine design vision and engineering execution, so clients get one accountable person from concept to release.',
      'about.core': 'Core services',
      'about.auto': 'Automation and bots',
      'contact.kicker': 'Contact',
      'contact.title': 'Need design and development in one hands?',
      'contact.text': 'Write me in Telegram or email and I will send implementation plan.',
      'footer.top': 'Back to top'
    }
  }
};

const PRELOADER_CYCLE = {
  ru: ['qwuorty portfolio', '\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043c \u043a\u0435\u0439\u0441\u044b', '\u0413\u043e\u0442\u043e\u0432\u0438\u043c \u0433\u043b\u0430\u0432\u043d\u0443\u044e'],
  en: ['qwuorty portfolio', 'Loading projects', 'Preparing homepage']
};

const PROJECTS = [
  {
    slug: 'neformalnost',
    url: 'https://neformalnost.ru/',
    title: { ru: 'Неформальность', en: 'Neformalnost' },
    meta: { ru: 'Книжный магазин, дизайн и fullstack', en: 'Bookstore, design plus fullstack' },
    type: { ru: 'E-commerce', en: 'E-commerce' },
    year: '2024',
    result: {
      ru: 'Сокращен путь до покупки и улучшена SEO-индексация.',
      en: 'Checkout path was shortened and SEO crawlability improved.'
    }
  },
  {
    slug: 'kitchen-ceremony',
    url: 'https://kitchenceremony.com/',
    title: { ru: 'Kitchen Ceremony', en: 'Kitchen Ceremony' },
    meta: { ru: 'Бренд специй и digital-кампания', en: 'Spice brand plus digital campaign' },
    type: { ru: 'Brand commerce', en: 'Brand commerce' },
    year: '2024',
    result: {
      ru: 'Усилены вовлечение аудитории и узнаваемость бренда.',
      en: 'Brand recognition and audience engagement increased during campaign.'
    }
  },
  {
    slug: 'museum-az',
    url: 'https://museum-az.com/',
    title: { ru: 'Музей AZ', en: 'Museum AZ' },
    meta: { ru: 'Культурная платформа, дизайн и fullstack', en: 'Cultural platform, design plus fullstack' },
    type: { ru: 'Museum platform', en: 'Museum platform' },
    year: '2023',
    result: {
      ru: 'Навигация по выставкам и событиям стала понятнее.',
      en: 'Exhibition and event navigation became clearer for visitors.'
    }
  },
  {
    slug: 'goat',
    url: 'https://www.goat.com/',
    title: { ru: 'GOAT', en: 'GOAT' },
    meta: { ru: 'Обувной marketplace, дизайн и fullstack', en: 'Sneaker marketplace, design plus fullstack' },
    type: { ru: 'Marketplace', en: 'Marketplace' },
    year: '2023',
    result: {
      ru: 'Улучшены структура каталога и скорость сценариев.',
      en: 'Catalog structure and user flow performance were improved.'
    }
  },
  {
    slug: 'flaner-moscow',
    url: 'https://flanermoscow.ru/',
    title: { ru: 'Flaner Moscow', en: 'Flaner Moscow' },
    meta: { ru: 'Сайт двух ресторанов, дизайн и fullstack', en: 'Two-restaurant website, design plus fullstack' },
    type: { ru: 'Hospitality', en: 'Hospitality' },
    year: '2024',
    result: {
      ru: 'Сайт усилил бренд и упростил путь к бронированию.',
      en: 'Website strengthened branding and simplified reservation path.'
    }
  },
  {
    slug: 'unicorngo',
    url: 'https://unicorngo.ru',
    title: { ru: 'Unicorn GO', en: 'Unicorn GO' },
    meta: { ru: 'Магазин обуви + Telegram Mini App', en: 'Shoe store plus Telegram Mini App' },
    type: { ru: 'Web + Telegram', en: 'Web plus Telegram' },
    year: '2025',
    result: {
      ru: 'Собран единый путь продажи между вебом и Telegram.',
      en: 'Unified sales funnel between website and Telegram flow.'
    }
  },
  {
    slug: 'amocrm-platrum',
    url: '#about',
    title: { ru: 'AMOcrm x Platrum', en: 'AMOcrm x Platrum' },
    meta: { ru: 'Передача расходов из сделки в финансовый модуль', en: 'Deal expenses sync into finance module' },
    type: { ru: 'Automation', en: 'Automation' },
    year: '2025',
    result: {
      ru: 'Снижен ручной труд и ускорен управленческий учет.',
      en: 'Manual work reduced and management accounting became faster.'
    }
  }
];

const CORE_SERVICES = {
  ru: [
    '\u0414\u0438\u0437\u0430\u0439\u043d + fullstack \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0441\u0430\u0439\u0442\u043e\u0432 \u043f\u043e\u0434 \u043a\u043b\u044e\u0447.',
    '\u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u043c\u0430\u0433\u0430\u0437\u0438\u043d\u044b, \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0438, \u043e\u043f\u043b\u0430\u0442\u044b, CRM-\u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438.',
    '\u0411\u0440\u0435\u043d\u0434\u043e\u0432\u044b\u0435 \u0438 \u0438\u043c\u0438\u0434\u0436\u0435\u0432\u044b\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b \u0441 \u0432\u044b\u0441\u043e\u043a\u0438\u043c \u0443\u0440\u043e\u0432\u043d\u0435\u043c motion UX.',
    '\u0422\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u0432\u0435\u0434\u0435\u043d\u0438\u0435: \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430, \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f, \u0440\u0435\u043b\u0438\u0437\u044b.'
  ],
  en: [
    'Design plus fullstack website delivery end-to-end.',
    'E-commerce systems: catalog, checkout, payment and CRM integrations.',
    'Brand and editorial products with strong motion UX.',
    'Technical ownership: architecture, optimization and release pipeline.'
  ]
};

const AUTOMATIONS = {
  ru: [
    'AMOcrm -> Platrum: \u0430\u0432\u0442\u043e\u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043f\u0440\u044f\u043c\u044b\u0445 \u0440\u0430\u0441\u0445\u043e\u0434\u043e\u0432 \u0432 \u043c\u043e\u0434\u0443\u043b\u044c \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432.',
    '@Dodologistic_bot: \u0432\u044b\u043a\u0443\u043f \u0438 \u043b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0430 \u0442\u043e\u0432\u0430\u0440\u043e\u0432 \u0438\u0437 POIZON.',
    '@ClevVPN_bot, @NextGenVPN_bot: \u0431\u043e\u0442\u044b \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f VPN-\u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430\u043c\u0438.',
    '@monoflore_bot: \u0437\u0430\u043a\u0430\u0437 \u0446\u0432\u0435\u0442\u043e\u0432 \u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u043e\u0439 \u043f\u043e \u041c\u043e\u0441\u043a\u0432\u0435.'
  ],
  en: [
    'AMOcrm -> Platrum integration for direct expense sync.',
    '@Dodologistic_bot: POIZON sourcing and logistics automation.',
    '@ClevVPN_bot and @NextGenVPN_bot: VPN subscription bots.',
    '@monoflore_bot: flower order and delivery flow in Telegram.'
  ]
};

let currentLanguage = DEFAULT_LANGUAGE;
let transitionLock = false;
let revealObserver;
let activeWorkPreviewIndex = -1;
let workPreviewHideTimer = 0;
let activeWorkPreviewLink = null;
let workHoverPointerX = -1;
let workHoverPointerY = -1;
let workPreviewTrackingBound = false;

const detectLanguageFromPath = (pathname = window.location.pathname) => {
  const match = pathname.match(LANGUAGE_PATH_RE);
  return match ? match[1] : null;
};

const stripLanguagePrefix = (pathname = window.location.pathname) => {
  const stripped = pathname.replace(LANGUAGE_PATH_RE, '');
  return stripped === '' ? '/' : stripped;
};

const buildLanguagePath = (lang, pathname = window.location.pathname) => {
  const base = stripLanguagePrefix(pathname);
  return base === '/' ? `/${lang}` : `/${lang}${base}`;
};

const syncLanguagePath = (lang, replaceHistory) => {
  const targetPath = buildLanguagePath(lang);
  if (targetPath === window.location.pathname) {
    return;
  }

  const nextUrl = `${targetPath}${window.location.search}${window.location.hash}`;
  const method = replaceHistory ? 'replaceState' : 'pushState';
  window.history[method]({}, '', nextUrl);
};

const setMeta = (lang) => {
  const config = UI[lang];
  document.title = config.metaTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) {
    desc.setAttribute('content', config.metaDescription);
  }
};

const applyStaticTranslations = (lang) => {
  const dict = UI[lang].strings;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      node.textContent = dict[key];
    }
  });
};

const renderWorkPreviewStack = (lang) => {
  if (!workHoverStack) {
    return;
  }

  workHoverStack.innerHTML = PROJECTS.map((project, idx) => {
    const preview = `/work/${project.slug}/cover.jpg`;
    const title = project.title[lang];
    return `
      <img
        class="work-hover-stack-image"
        src="${preview}"
        alt="${title}"
        data-preview-index="${idx}"
        loading="eager"
        decoding="async"
        draggable="false"
      />
    `;
  }).join('');

  workHoverStack.style.transform = 'translate3d(0, 0%, 0)';
  activeWorkPreviewIndex = -1;
};

const renderProjects = (lang) => {
  const html = PROJECTS.map((project, idx) => {
    const index = String(idx + 1).padStart(2, '0');
    const isExternal = !project.url.startsWith('#');
    const externalAttrs = isExternal ? 'target="_blank" rel="noreferrer"' : '';
    return `
      <article class="work-row" data-reveal>
        <a
          class="work-link"
          href="${project.url}"
          ${externalAttrs}
          data-preview-index="${idx}"
        >
          <span class="work-index">${index}</span>
          <div class="work-main">
            <h3 class="work-title">${project.title[lang]}</h3>
            <p class="work-meta">${project.meta[lang]}</p>
          </div>
          <p class="work-type">${project.type[lang]}</p>
          <p class="work-year">${project.year}</p>
          <span class="work-arrow">&#8599;</span>
        </a>
      </article>
    `;
  }).join('');

  workList.innerHTML = html;
  renderWorkPreviewStack(lang);
  if (workPreviewHideTimer) {
    window.clearTimeout(workPreviewHideTimer);
    workPreviewHideTimer = 0;
  }
  workList.classList.remove('is-hovering');
  if (workHoverPreview) {
    workHoverPreview.classList.remove('is-visible');
  }
  bindReveal();
  bindWorkPreview();
};

const renderLists = (lang) => {
  coreList.innerHTML = CORE_SERVICES[lang].map((item) => `<li>${item}</li>`).join('');
  autoList.innerHTML = AUTOMATIONS[lang].map((item) => `<li>${item}</li>`).join('');
};

const applyLanguage = (lang, replaceHistory) => {
  const normalized = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  currentLanguage = normalized;
  document.documentElement.lang = normalized;

  setMeta(normalized);
  applyStaticTranslations(normalized);
  renderProjects(normalized);
  renderLists(normalized);

  langSwitch.textContent = normalized === 'ru' ? 'EN' : 'RU';
  langSwitch.setAttribute('aria-label', normalized === 'ru' ? 'Switch to English' : 'Switch to Russian');

  syncLanguagePath(normalized, replaceHistory);
};

const bindReveal = () => {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  document.querySelectorAll('[data-reveal]').forEach((node, index) => {
    if (node.dataset.revealBound === '1') {
      return;
    }
    node.dataset.revealBound = '1';
    node.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
    revealObserver.observe(node);
  });
};

const runTransition = (callback) => {
  if (transitionLock) {
    callback();
    return;
  }

  transitionLock = true;
  pageTransition.classList.add('is-active');
  window.setTimeout(() => callback(), 220);
  window.setTimeout(() => {
    pageTransition.classList.remove('is-active');
    transitionLock = false;
  }, 860);
};

const closeMenu = () => {
  menuOverlay.classList.remove('is-open');
  menuOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
};

const openMenu = () => {
  menuOverlay.classList.add('is-open');
  menuOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
};

const handleAnchorNav = (event) => {
  const href = event.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) {
    closeMenu();
    return;
  }

  const target = document.querySelector(href);
  if (!target) {
    closeMenu();
    return;
  }

  event.preventDefault();
  closeMenu();
  runTransition(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const bindNavigationLinks = () => {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', handleAnchorNav);
  });
};

const bindHeroScrollCue = () => {
  if (!heroScrollCue) {
    return;
  }

  const update = () => {
    heroScrollCue.classList.toggle('is-hidden', window.scrollY > 22);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
};

const bindCursor = () => {
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  document.body.classList.add('has-custom-cursor');

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let cx = x;
  let cy = y;

  const applyCursorMode = (control) => {
    if (control && control.closest('.work-link')) {
      cursor.classList.add('is-active');
      cursor.classList.remove('is-interactive');
      return;
    }

    if (control) {
      cursor.classList.remove('is-active');
      cursor.classList.add('is-interactive');
      return;
    }

    cursor.classList.remove('is-active');
    cursor.classList.remove('is-interactive');
  };

  const syncCursorFromPointer = () => {
    const hoveredElement = document.elementFromPoint(x, y);
    const control = hoveredElement ? hoveredElement.closest('a, button') : null;
    applyCursorMode(control);
  };

  window.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
    cursor.classList.add('is-visible');
    syncCursorFromPointer();
  });

  const frame = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(frame);
  };

  frame();

  window.addEventListener(
    'scroll',
    () => {
      syncCursorFromPointer();
    },
    { passive: true }
  );

  window.addEventListener('blur', () => {
    cursor.classList.remove('is-visible');
    cursor.classList.remove('is-active');
    cursor.classList.remove('is-interactive');
  });
};

const bindMagnetic = () => {
  document.querySelectorAll('.magnetic').forEach((node) => {
    if (node.dataset.magneticBound === '1') {
      return;
    }
    node.dataset.magneticBound = '1';

    node.addEventListener('mousemove', (event) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px)`;
    });

    node.addEventListener('mouseleave', () => {
      node.style.transform = 'translate(0, 0)';
    });
  });
};

const setWorkPreviewIndex = (index, immediate = false) => {
  if (!workHoverStack || !Number.isFinite(index) || index < 0) {
    return;
  }

  const nextTransform = `translate3d(0, ${index * -100}%, 0)`;

  if (immediate) {
    const previousTransition = workHoverStack.style.transition;
    workHoverStack.style.transition = 'none';
    workHoverStack.style.transform = nextTransform;
    void workHoverStack.offsetHeight;
    workHoverStack.style.transition = previousTransition;
  } else {
    workHoverStack.style.transform = nextTransform;
  }

  activeWorkPreviewIndex = index;
};

const bindWorkPreview = () => {
  const isHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isHover || !workHoverPreview || !workHoverMedia || !workHoverStack) {
    return;
  }

  const positionWorkPreview = (clientX, clientY) => {
    const offsetX = 32;
    const offsetY = 18;
    const width = workHoverPreview.offsetWidth || 420;
    const height = workHoverPreview.offsetHeight || 260;

    const maxX = window.innerWidth - width - 18;
    const maxY = window.innerHeight - height - 18;
    const nextX = Math.max(18, Math.min(clientX + offsetX, maxX));
    const nextY = Math.max(18, Math.min(clientY + offsetY, maxY));

    workHoverPreview.style.left = `${nextX}px`;
    workHoverPreview.style.top = `${nextY}px`;
  };

  const clearActiveRow = () => {
    if (!activeWorkPreviewLink) {
      return;
    }
    const prevRow = activeWorkPreviewLink.closest('.work-row');
    if (prevRow) {
      prevRow.classList.remove('is-active');
    }
    activeWorkPreviewLink = null;
  };

  const hideWorkPreview = () => {
    if (workPreviewHideTimer) {
      window.clearTimeout(workPreviewHideTimer);
      workPreviewHideTimer = 0;
    }
    clearActiveRow();
    workList.classList.remove('is-hovering');
    workHoverPreview.classList.remove('is-visible');
    activeWorkPreviewIndex = -1;
  };

  const activateWorkLink = (link) => {
    if (!link) {
      return;
    }

    if (workPreviewHideTimer) {
      window.clearTimeout(workPreviewHideTimer);
      workPreviewHideTimer = 0;
    }

    const previewIndex = Number(link.dataset.previewIndex || -1);
    if (!Number.isFinite(previewIndex) || previewIndex < 0) {
      return;
    }

    if (activeWorkPreviewLink && activeWorkPreviewLink !== link) {
      const previousRow = activeWorkPreviewLink.closest('.work-row');
      if (previousRow) {
        previousRow.classList.remove('is-active');
      }
    }

    const row = link.closest('.work-row');
    if (row) {
      row.classList.add('is-active');
    }
    activeWorkPreviewLink = link;
    workList.classList.add('is-hovering');

    const shouldJump = !workHoverPreview.classList.contains('is-visible') || activeWorkPreviewIndex < 0;
    setWorkPreviewIndex(previewIndex, shouldJump);
    workHoverPreview.classList.add('is-visible');
  };

  const syncWorkPreviewFromPointer = () => {
    if (workHoverPointerX < 0 || workHoverPointerY < 0) {
      return;
    }

    const hoveredElement = document.elementFromPoint(workHoverPointerX, workHoverPointerY);
    const hoveredLink = hoveredElement ? hoveredElement.closest('.work-link') : null;

    if (hoveredLink) {
      positionWorkPreview(workHoverPointerX, workHoverPointerY);
      activateWorkLink(hoveredLink);
      return;
    }

    if (workHoverPreview.classList.contains('is-visible')) {
      hideWorkPreview();
    }
  };

  if (!workPreviewTrackingBound) {
    workPreviewTrackingBound = true;

    document.addEventListener('mousemove', (event) => {
      workHoverPointerX = event.clientX;
      workHoverPointerY = event.clientY;
    });

    window.addEventListener(
      'scroll',
      () => {
        syncWorkPreviewFromPointer();
      },
      { passive: true }
    );
  }

  document.querySelectorAll('.work-link').forEach((link) => {
    if (link.dataset.hoverBound === '1') {
      return;
    }
    link.dataset.hoverBound = '1';

    link.addEventListener('mouseenter', (event) => {
      workHoverPointerX = event.clientX;
      workHoverPointerY = event.clientY;
      activateWorkLink(event.currentTarget);
      positionWorkPreview(event.clientX, event.clientY);
    });

    link.addEventListener('mousemove', (event) => {
      workHoverPointerX = event.clientX;
      workHoverPointerY = event.clientY;
      positionWorkPreview(event.clientX, event.clientY);
    });

    link.addEventListener('mouseleave', () => {
      if (workPreviewHideTimer) {
        window.clearTimeout(workPreviewHideTimer);
      }

      workPreviewHideTimer = window.setTimeout(() => {
        syncWorkPreviewFromPointer();
      }, 70);
    });
  });
};

const PRELOAD_TIMEOUT_MS = 3200;
const REQUIRED_FONT_DESCRIPTORS = [
  '400 1em "Manrope"',
  '500 1em "Manrope"',
  '700 1em "Manrope"',
  '500 1em "Syne"',
  '700 1em "Syne"',
  '800 1em "Syne"'
];

const collectPreloadAssets = () => {
  const covers = PROJECTS.map((project) => `/work/${project.slug}/cover.jpg`);
  return ['/work/profile/portrait.png', ...covers];
};

const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (typeof image.decode === 'function') {
        image
          .decode()
          .catch(() => null)
          .finally(() => resolve(src));
        return;
      }
      resolve(src);
    };
    image.onerror = () => resolve(src);
    image.src = src;
  });

const settleWithTimeout = (promise, timeoutMs = PRELOAD_TIMEOUT_MS) =>
  new Promise((resolve) => {
    let isDone = false;
    const finish = () => {
      if (isDone) {
        return;
      }
      isDone = true;
      window.clearTimeout(timer);
      resolve();
    };

    const timer = window.setTimeout(finish, timeoutMs);
    Promise.resolve(promise)
      .catch(() => null)
      .then(finish);
  });

const waitForFontStylesheet = () => {
  if (!fontStylesheet) {
    return Promise.resolve();
  }

  const hasLoadedSheet = Array.from(document.styleSheets).some((sheet) => sheet.href === fontStylesheet.href);
  if (hasLoadedSheet) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const done = () => {
      fontStylesheet.removeEventListener('load', done);
      fontStylesheet.removeEventListener('error', done);
      resolve();
    };

    fontStylesheet.addEventListener('load', done, { once: true });
    fontStylesheet.addEventListener('error', done, { once: true });
  });
};

const collectFontPreloadTasks = () => {
  const tasks = [settleWithTimeout(waitForFontStylesheet())];

  if (!document.fonts || typeof document.fonts.load !== 'function') {
    return tasks;
  }

  REQUIRED_FONT_DESCRIPTORS.forEach((descriptor) => {
    tasks.push(settleWithTimeout(document.fonts.load(descriptor, 'qwuorty 0123456789')));
  });

  tasks.push(settleWithTimeout(document.fonts.ready));
  return tasks;
};

const runPreloader = async () => {
  if (!preloader || !preloaderBar || !preloaderValue) {
    return;
  }

  document.body.style.overflow = 'hidden';
  const startedAt = performance.now();
  const cycle = PRELOADER_CYCLE[currentLanguage] || PRELOADER_CYCLE[DEFAULT_LANGUAGE];
  let cycleIndex = 0;

  if (preloaderHeadline && cycle.length > 0) {
    preloaderHeadline.textContent = cycle[0];
  }

  const cycleTimer = window.setInterval(() => {
    if (!preloaderHeadline || cycle.length === 0) {
      return;
    }
    cycleIndex = (cycleIndex + 1) % cycle.length;
    preloaderHeadline.textContent = cycle[cycleIndex];
  }, 560);

  const assets = Array.from(new Set(collectPreloadAssets()));
  const tasks = [...assets.map((src) => preloadImage(src)), ...collectFontPreloadTasks()];
  let loaded = 0;

  const setProgress = (value) => {
    const safeValue = Math.max(0, Math.min(100, value));
    preloaderBar.style.width = `${safeValue}%`;
    preloaderValue.textContent = `${Math.round(safeValue)}%`;
  };

  setProgress(0);
  if (tasks.length > 0) {
    await Promise.all(
      tasks.map((task) =>
        Promise.resolve(task)
          .catch(() => null)
          .then(() => {
            loaded += 1;
            setProgress((loaded / tasks.length) * 100);
          })
      )
    );
  }

  setProgress(100);

  const elapsed = performance.now() - startedAt;
  if (elapsed < 950) {
    await new Promise((resolve) => window.setTimeout(resolve, 950 - elapsed));
  }

  window.clearInterval(cycleTimer);
  preloader.classList.add('is-hidden');
  document.body.style.overflow = '';
};

const setYear = () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
};

const initLocationGlobe = () => {
  const canvas = document.querySelector('.hero-location__globe-canvas');
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const latitudes = [-54, -32, -10, 10, 32, 54];
  const longitudes = Array.from({ length: 12 }, (_, idx) => -150 + idx * 30);
  const segmentStep = 7;
  const baseTiltX = 0;
  const tiltSwingAmplitude = 0.58;
  const tiltZ = 0;
  const maxDeviceRatio = 2;
  const frontDepthEpsilon = 0;

  let rafId = 0;
  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let centerYBase = 0;
  let radius = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, maxDeviceRatio);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    width = rect.width;
    height = rect.height;
    centerX = width / 2;
    centerY = height / 2;
    centerYBase = centerY;
    radius = Math.min(width, height) * 0.36;
  };

  const project = (latDeg, lonDeg, spinY, tiltX) => {
    const lat = (latDeg * Math.PI) / 180;
    const lon = (lonDeg * Math.PI) / 180;

    const x = Math.cos(lat) * Math.sin(lon) * radius;
    const y = Math.sin(lat) * radius;
    const z = Math.cos(lat) * Math.cos(lon) * radius;

    const cosY = Math.cos(spinY);
    const sinY = Math.sin(spinY);
    let xr = x * cosY + z * sinY;
    let yr = y;
    let zr = -x * sinY + z * cosY;

    const cosX = Math.cos(tiltX);
    const sinX = Math.sin(tiltX);
    const yTilt = yr * cosX - zr * sinX;
    const zTilt = yr * sinX + zr * cosX;
    yr = yTilt;
    zr = zTilt;

    const cosZ = Math.cos(tiltZ);
    const sinZ = Math.sin(tiltZ);
    const xTwist = xr * cosZ - yr * sinZ;
    const yTwist = xr * sinZ + yr * cosZ;
    xr = xTwist;
    yr = yTwist;

    return { x: centerX + xr, y: centerY + yr, z: zr };
  };

  const drawFrontSegments = (points) => {
    for (let i = 1; i < points.length; i += 1) {
      const a = points[i - 1];
      const b = points[i];
      if (a.z <= frontDepthEpsilon && b.z <= frontDepthEpsilon) {
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  };

  const drawCurves = (spinY, tiltX) => {
    const buildLatitude = (lat) => {
      const points = [];
      for (let lon = -180; lon <= 180; lon += segmentStep) {
        points.push(project(lat, lon, spinY, tiltX));
      }
      return points;
    };

    const buildLongitude = (lon) => {
      const points = [];
      for (let lat = -90; lat <= 90; lat += segmentStep) {
        points.push(project(lat, lon, spinY, tiltX));
      }
      return points;
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(1.04, Math.min(width, height) * 0.0145);

    ctx.strokeStyle = 'rgba(28, 33, 38, 0.42)';
    latitudes.forEach((lat) => drawFrontSegments(buildLatitude(lat)));

    ctx.strokeStyle = 'rgba(8, 11, 14, 0.92)';
    longitudes.forEach((lon) => drawFrontSegments(buildLongitude(lon)));
  };

  const drawFrame = (time) => {
    if (!width || !height) {
      resize();
    }
    if (!width || !height) {
      rafId = requestAnimationFrame(drawFrame);
      return;
    }

    const spinY = reducedMotion.matches ? 0.32 : time * 0.0003;
    const rockPhase = reducedMotion.matches ? 0 : time * 0.0018;
    const tiltX = baseTiltX + Math.sin(rockPhase - Math.PI / 2) * tiltSwingAmplitude;
    const verticalBob = reducedMotion.matches ? 0 : Math.sin(rockPhase) * radius * 0.08;
    centerY = centerYBase + verticalBob;
    ctx.clearRect(0, 0, width, height);

    drawCurves(spinY, tiltX);

    ctx.strokeStyle = 'rgba(8, 11, 14, 0.96)';
    ctx.lineWidth = Math.max(1.55, Math.min(width, height) * 0.022);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    if (!reducedMotion.matches) {
      rafId = requestAnimationFrame(drawFrame);
    }
  };

  const start = () => {
    cancelAnimationFrame(rafId);
    resize();
    drawFrame(performance.now());
  };

  start();
  window.addEventListener('resize', start);
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', start);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(start);
  }
};

const resolveInitialLanguage = () => {
  const lang = detectLanguageFromPath();
  if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
    return lang;
  }
  syncLanguagePath(DEFAULT_LANGUAGE, true);
  return DEFAULT_LANGUAGE;
};

bindNavigationLinks();
bindCursor();
bindMagnetic();
bindHeroScrollCue();
setYear();
initLocationGlobe();

const initialLanguage = resolveInitialLanguage();
applyLanguage(initialLanguage, true);
runPreloader();

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

langSwitch.addEventListener('click', () => {
  const next = currentLanguage === 'ru' ? 'en' : 'ru';
  runTransition(() => {
    applyLanguage(next, false);
  });
});

window.addEventListener('popstate', () => {
  const lang = detectLanguageFromPath();
  applyLanguage(lang || DEFAULT_LANGUAGE, true);
});


