const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloaderBar');
const preloaderValue = document.getElementById('preloaderValue');
const pageTransition = document.getElementById('pageTransition');
const menuOverlay = document.getElementById('menuOverlay');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const langSwitch = document.getElementById('langSwitch');
const workList = document.getElementById('workList');
const coreList = document.getElementById('coreList');
const autoList = document.getElementById('autoList');
const cursor = document.querySelector('.cursor');
const workHoverPreview = document.getElementById('workHoverPreview');
const workHoverImage = document.getElementById('workHoverImage');
const workHoverTitle = document.getElementById('workHoverTitle');

const SUPPORTED_LANGUAGES = ['ru', 'en'];
const DEFAULT_LANGUAGE = 'ru';
const LANGUAGE_PATH_RE = /^\/(ru|en)(?=\/|$)/;

const UI = {
  ru: {
    metaTitle: '\u041c\u0430\u043a\u0441\u0438\u043c qwuorty | Fullstack \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a',
    metaDescription:
      '\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e qwuorty: design + fullstack \u0434\u043b\u044f e-commerce, \u043a\u0443\u043b\u044c\u0442\u0443\u0440\u043d\u044b\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0439.',
    strings: {
      'preloader.label': '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e',
      'menu.open': '\u041c\u0435\u043d\u044e',
      'menu.close': '\u0417\u0430\u043a\u0440\u044b\u0442\u044c',
      'nav.home': '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
      'nav.work': '\u041a\u0435\u0439\u0441\u044b',
      'nav.about': '\u041e\u0431\u043e \u043c\u043d\u0435',
      'nav.contact': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
      'hero.kicker': 'Design plus Fullstack',
      'hero.line1': '\u0421\u043e\u0437\u0434\u0430\u044e \u0441\u0430\u0439\u0442\u044b \u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u044b',
      'hero.line2': '\u0441 \u043f\u0440\u0435\u043c\u0438\u0443\u043c-\u043f\u043e\u0434\u0430\u0447\u0435\u0439,',
      'hero.line3': '\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0431\u044b\u0441\u0442\u0440\u044b \u0438 \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u044b.',
      'hero.text':
        '\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b: \u043a\u043e\u043d\u0446\u0435\u043f\u0442, UI/UX, frontend, backend, \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0438 \u0440\u0435\u043b\u0438\u0437.',
      'hero.cta.work': '\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442\u044b',
      'hero.cta.contact': '\u041d\u0430\u0447\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442',
      'work.kicker': '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u043a\u0435\u0439\u0441\u044b',
      'work.title': '\u041f\u0440\u043e\u0435\u043a\u0442\u044b',
      'about.kicker': '\u041e\u0431\u043e \u043c\u043d\u0435',
      'about.title': '\u0423\u0441\u043b\u0443\u0433\u0438 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f',
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
    metaTitle: 'qwuorty | Fullstack Developer',
    metaDescription:
      'Portfolio of qwuorty: design plus fullstack delivery for e-commerce, cultural products and automation systems.',
    strings: {
      'preloader.label': 'Loading portfolio',
      'menu.open': 'Menu',
      'menu.close': 'Close',
      'nav.home': 'Home',
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.kicker': 'Design plus Fullstack',
      'hero.line1': 'I build websites',
      'hero.line2': 'that feel premium,',
      'hero.line3': 'perform and convert.',
      'hero.text': 'End-to-end delivery: concept, interface, frontend, backend, integrations, release.',
      'hero.cta.work': 'View projects',
      'hero.cta.contact': 'Start project',
      'work.kicker': 'Selected Work',
      'work.title': 'Projects',
      'about.kicker': 'About',
      'about.title': 'Services and automation',
      'about.core': 'Core services',
      'about.auto': 'Automation and bots',
      'contact.kicker': 'Contact',
      'contact.title': 'Need design and development in one hands?',
      'contact.text': 'Write me in Telegram or email and I will send implementation plan.',
      'footer.top': 'Back to top'
    }
  }
};

const PROJECTS = [
  {
    slug: 'neformalnost',
    url: 'https://neformalnost.ru/',
    title: { ru: '\u041d\u0435\u0444\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c', en: 'Neformalnost' },
    type: { ru: '\u041a\u043d\u0438\u0436\u043d\u044b\u0439 e-commerce', en: 'Bookstore e-commerce' }
  },
  {
    slug: 'kitchen-ceremony',
    url: 'https://kitchenceremony.com/',
    title: { ru: 'Kitchen Ceremony', en: 'Kitchen Ceremony' },
    type: { ru: '\u0411\u0440\u0435\u043d\u0434\u043e\u0432\u044b\u0439 e-commerce', en: 'Brand e-commerce' }
  },
  {
    slug: 'museum-az',
    url: 'https://museum-az.com/',
    title: { ru: '\u041c\u0443\u0437\u0435\u0439 AZ', en: 'Museum AZ' },
    type: { ru: '\u041c\u0443\u0437\u0435\u0439\u043d\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430', en: 'Museum platform' }
  },
  {
    slug: 'goat',
    url: 'https://www.goat.com/',
    title: { ru: 'GOAT', en: 'GOAT' },
    type: { ru: '\u041e\u0431\u0443\u0432\u043d\u043e\u0439 marketplace', en: 'Sneaker marketplace' }
  },
  {
    slug: 'flaner-moscow',
    url: 'https://flanermoscow.ru/',
    title: { ru: 'Flaner Moscow', en: 'Flaner Moscow' },
    type: { ru: '\u0421\u0430\u0439\u0442\u044b \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432', en: 'Restaurant websites' }
  },
  {
    slug: 'unicorngo',
    url: 'https://unicorngo.ru',
    title: { ru: 'Unicorn GO', en: 'Unicorn GO' },
    type: { ru: '\u041c\u0430\u0433\u0430\u0437\u0438\u043d + Telegram Mini App', en: 'Store + Telegram Mini App' }
  },
  {
    slug: 'amocrm-platrum',
    url: '#about',
    title: { ru: 'AMOcrm x Platrum', en: 'AMOcrm x Platrum' },
    type: { ru: 'CRM \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f', en: 'CRM integration' }
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
let preloaderProgress = 0;
let revealObserver;

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

const renderProjects = (lang) => {
  const html = PROJECTS.map((project, idx) => {
    const index = String(idx + 1).padStart(2, '0');
    const preview = `/work/${project.slug}/cover.jpg`;
    const isExternal = !project.url.startsWith('#');
    const externalAttrs = isExternal ? 'target="_blank" rel="noreferrer"' : '';
    return `
      <article class="work-row" data-reveal>
        <a class="work-link" href="${project.url}" ${externalAttrs} data-preview="${preview}" data-preview-title="${project.title[lang]}">
          <span class="work-index">${index}</span>
          <div class="work-main">
            <h3 class="work-title">${project.title[lang]}</h3>
            <p class="work-meta">${project.type[lang]}</p>
          </div>
          <span class="work-arrow">↗</span>
        </a>
      </article>
    `;
  }).join('');

  workList.innerHTML = html;
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

const bindCursor = () => {
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let cx = x;
  let cy = y;

  window.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
  });

  const frame = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(frame);
  };

  frame();

  document.addEventListener('mouseover', (event) => {
    if (event.target.closest('a, button')) {
      cursor.classList.add('is-active');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('a, button')) {
      cursor.classList.remove('is-active');
    }
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

const bindWorkPreview = () => {
  const isHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isHover) {
    return;
  }

  document.querySelectorAll('.work-link').forEach((link) => {
    if (link.dataset.hoverBound === '1') {
      return;
    }
    link.dataset.hoverBound = '1';

    link.addEventListener('mouseenter', (event) => {
      const previewSrc = event.currentTarget.dataset.preview;
      const previewTitle = event.currentTarget.dataset.previewTitle;
      workHoverImage.classList.remove('is-hidden');
      workHoverImage.src = previewSrc;
      workHoverImage.alt = previewTitle;
      workHoverTitle.textContent = previewTitle;
      workHoverPreview.classList.add('is-visible');
    });

    link.addEventListener('mousemove', (event) => {
      workHoverPreview.style.left = `${event.clientX + 30}px`;
      workHoverPreview.style.top = `${event.clientY + 18}px`;
    });

    link.addEventListener('mouseleave', () => {
      workHoverPreview.classList.remove('is-visible');
    });
  });

  workHoverImage.onerror = () => {
    workHoverImage.classList.add('is-hidden');
  };
};

const runPreloader = () => {
  document.body.style.overflow = 'hidden';
  const tick = () => {
    preloaderProgress += Math.random() * 14 + 5;
    if (preloaderProgress >= 100) {
      preloaderProgress = 100;
      preloaderBar.style.width = '100%';
      preloaderValue.textContent = '100%';
      window.setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = '';
      }, 260);
      return;
    }

    preloaderBar.style.width = `${preloaderProgress.toFixed(1)}%`;
    preloaderValue.textContent = `${Math.floor(preloaderProgress)}%`;
    window.setTimeout(tick, 90);
  };

  tick();
};

const setYear = () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
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
setYear();

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