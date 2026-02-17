const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloaderBar');
const preloaderPercent = document.getElementById('preloaderPercent');
const pageTransition = document.getElementById('pageTransition');
const cursor = document.querySelector('.cursor');
const langSwitch = document.getElementById('langSwitch');
const projectList = document.getElementById('projectList');
const serviceList = document.getElementById('serviceList');
const automationList = document.getElementById('automationList');

const SUPPORTED_LANGUAGES = ['ru', 'en'];
const DEFAULT_LANGUAGE = 'ru';
const LANGUAGE_PATH_RE = /^\/(ru|en)(?=\/|$)/;

const DATA = {
  ru: {
    metaTitle: '\u041c\u0430\u043a\u0441\u0438\u043c qwuorty | Fullstack \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a',
    metaDescription:
      '\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u041c\u0430\u043a\u0441\u0438\u043c\u0430 qwuorty: design + fullstack, e-commerce, \u043c\u0438\u043d\u0438-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0432.',
    ui: {
      'preloader.label': '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e',
      'nav.home': '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
      'nav.work': '\u041a\u0435\u0439\u0441\u044b',
      'nav.about': '\u041e\u0431\u043e \u043c\u043d\u0435',
      'nav.contact': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
      'hero.kicker': 'Design + Fullstack',
      'hero.line1': '\u0414\u0435\u043b\u0430\u044e \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b',
      'hero.line2': '\u0441 \u043f\u0440\u0435\u043c\u0438\u0443\u043c-\u043f\u043e\u0434\u0430\u0447\u0435\u0439,',
      'hero.line3': '\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043f\u0440\u043e\u0434\u0430\u044e\u0442 \u0438 \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u0443\u044e\u0442\u0441\u044f.',
      'hero.text':
        '\u041f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u0443\u044e \u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u044e \u0441\u0430\u0439\u0442\u044b, \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u043c\u0430\u0433\u0430\u0437\u0438\u043d\u044b, \u043c\u0443\u0437\u0435\u0439\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b, Telegram Mini Apps \u0438 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u043f\u043e\u0434 \u043a\u043b\u044e\u0447.',
      'hero.cta1': '\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442\u044b',
      'hero.cta2': '\u041d\u0430\u0447\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442',
      'stats.websites': '\u041a\u0440\u0443\u043f\u043d\u044b\u0445 web-\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432',
      'stats.bots': 'Telegram-\u0431\u043e\u0442\u043e\u0432',
      'stats.fullcycle': '\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b: \u0434\u0438\u0437\u0430\u0439\u043d + fullstack',
      'work.kicker': '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u043a\u0435\u0439\u0441\u044b',
      'work.title': '\u0421\u0430\u0439\u0442\u044b, \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u044b \u0438 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0435 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b',
      'about.kicker': '\u0427\u0442\u043e \u044f \u0434\u0435\u043b\u0430\u044e',
      'about.title': 'Fullstack delivery \u0441 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432\u044b\u043c \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u0435\u043c',
      'about.serviceTitle': '\u041a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u0443\u0441\u043b\u0443\u0433\u0438',
      'about.automationTitle': '\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u0438 \u0431\u043e\u0442\u044b',
      'contact.kicker': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
      'contact.title': '\u041d\u0443\u0436\u0435\u043d \u0434\u0438\u0437\u0430\u0439\u043d + fullstack \u0432 \u043e\u0434\u043d\u0438\u0445 \u0440\u0443\u043a\u0430\u0445?',
      'contact.text':
        '\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443, \u0438 \u044f \u0432\u0435\u0440\u043d\u0443 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443, \u0441\u0440\u043e\u043a\u0438 \u0438 \u043f\u043b\u0430\u043d \u0440\u0435\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.',
      'footer.top': '\u041d\u0430\u0432\u0435\u0440\u0445',
      resultLabel: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442'
    },
    projects: [
      {
        type: '\u041a\u043d\u0438\u0436\u043d\u044b\u0439 e-commerce',
        title: '\u041d\u0435\u0444\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c',
        url: 'https://neformalnost.ru/',
        description:
          '\u0421\u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043b \u0438 \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u043e\u043b\u043d\u044b\u0439 digital-\u043a\u043e\u043d\u0442\u0443\u0440 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430: \u043a\u0430\u0442\u0430\u043b\u043e\u0433, \u043f\u043e\u0438\u0441\u043a, \u043a\u043e\u0440\u0437\u0438\u043d\u0430, CMS, \u043b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0430.',
        result: 'LCP ~1.7s, \u0440\u043e\u0441\u0442 \u043a\u043e\u043d\u0432\u0435\u0440\u0441\u0438\u0438 \u0447\u0435\u043a\u0430\u0443\u0442\u0430 +27%',
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker']
      },
      {
        type: 'Brand e-commerce',
        title: 'Kitchen Ceremony',
        url: 'https://kitchenceremony.com/',
        description:
          '\u0421\u043e\u0431\u0440\u0430\u043b \u0431\u0440\u0435\u043d\u0434-\u043e\u043f\u044b\u0442 \u0441 \u0430\u043a\u0446\u0435\u043d\u0442\u043e\u043c \u043d\u0430 \u044d\u0441\u0442\u0435\u0442\u0438\u043a\u0443 \u0438 \u043a\u043e\u043d\u0432\u0435\u0440\u0441\u0438\u044e: \u043f\u0440\u0435\u0437\u0435\u043d\u0442\u0430\u0446\u0438\u044f \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430, \u043a\u0430\u043c\u043f\u0430\u043d\u0438\u0439\u043d\u044b\u0435 \u043f\u043e\u0441\u0430\u0434\u043e\u0447\u043d\u044b\u0435, CMS.',
        result: '\u041a\u0430\u043c\u043f\u0430\u043d\u0438\u044f \u0441 Ultima \u042f\u043d\u0434\u0435\u043a\u0441 \u0415\u0434\u0430, \u0440\u043e\u0441\u0442 repeat sessions +34%',
        stack: ['Next.js', 'Headless CMS', 'Node API', 'Vercel']
      },
      {
        type: '\u041c\u0443\u0437\u0435\u0439\u043d\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430',
        title: '\u041c\u0443\u0437\u0435\u0439 AZ',
        url: 'https://museum-az.com/',
        description:
          '\u0421\u0434\u0435\u043b\u0430\u043b \u0438\u043c\u0438\u0434\u0436\u0435\u0432\u044b\u0439 \u0438 \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0430\u0439\u0442 \u043c\u0443\u0437\u0435\u044f: \u0430\u0444\u0438\u0448\u0430, \u0432\u044b\u0441\u0442\u0430\u0432\u043a\u0438, \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f \u043f\u043e \u0441\u043e\u0431\u044b\u0442\u0438\u044f\u043c, \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u043a\u043e\u043d\u0442\u0435\u043d\u0442.',
        result: '\u0420\u043e\u0441\u0442 online-\u0432\u043e\u0432\u043b\u0435\u0447\u0435\u043d\u043d\u043e\u0441\u0442\u0438 +41% \u043f\u043e \u0441\u0435\u0437\u043e\u043d\u0443',
        stack: ['Nuxt', 'Node.js', 'Strapi', 'PostgreSQL']
      },
      {
        type: '\u041e\u0431\u0443\u0432\u043d\u043e\u0439 marketplace',
        title: 'GOAT',
        url: 'https://www.goat.com/',
        description:
          '\u0412\u044b\u0441\u0442\u0440\u043e\u0438\u043b \u043f\u0430\u0442\u0442\u0435\u0440\u043d\u044b \u0434\u043b\u044f \u0432\u044b\u0441\u043e\u043a\u043e\u043d\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043d\u043e\u0439 \u0432\u0438\u0442\u0440\u0438\u043d\u044b: \u043a\u0430\u0442\u0430\u043b\u043e\u0433, \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438, \u043f\u0443\u0442\u0438 \u0434\u043e \u043f\u043e\u043a\u0443\u043f\u043a\u0438.',
        result: '\u0421\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u044b\u0435 95+ \u043f\u043e Lighthouse \u043d\u0430 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0445 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430\u0445',
        stack: ['React', 'Node.js', 'GraphQL', 'Redis']
      },
      {
        type: '\u0421\u0430\u0439\u0442\u044b \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432',
        title: 'Flaner Moscow',
        url: 'https://flanermoscow.ru/',
        description:
          '\u0421\u0434\u0435\u043b\u0430\u043b \u043f\u0440\u0435\u043c\u0438\u0443\u043c-\u043f\u043e\u0434\u0430\u0447\u0443 \u0434\u043b\u044f \u0434\u0432\u0443\u0445 \u043a\u043e\u043d\u0446\u0435\u043f\u0442\u043e\u0432 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u043e\u0432: \u0440\u0435\u0437\u0435\u0440\u0432\u044b, \u043c\u0435\u043d\u044e, \u0438\u0432\u0435\u043d\u0442\u044b, \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 UX.',
        result: '\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u044c \u0437\u0430\u044f\u0432\u043e\u043a \u043d\u0430 \u0431\u0440\u043e\u043d\u044c +33% \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u043f\u0443\u0441\u043a\u0430',
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Nginx']
      },
      {
        type: '\u041e\u0431\u0443\u0432\u043d\u043e\u0439 \u043c\u0430\u0433\u0430\u0437\u0438\u043d + Mini App',
        title: 'Unicorn GO',
        url: 'https://unicorngo.ru',
        description:
          '\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u043b \u0441\u0430\u0439\u0442 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430 \u0438 Telegram Mini App, \u0441\u0432\u044f\u0437\u0430\u0432 \u043a\u0430\u0442\u0430\u043b\u043e\u0433, \u0437\u0430\u043a\u0430\u0437\u044b \u0438 \u043e\u043f\u043b\u0430\u0442\u0443 \u0432 \u0435\u0434\u0438\u043d\u0443\u044e \u0432\u043e\u0440\u043e\u043d\u043a\u0443.',
        result: '\u041f\u0443\u0442\u044c \u0434\u043e \u0437\u0430\u043a\u0430\u0437\u0430 \u0432 Mini App < 40 \u0441\u0435\u043a',
        stack: ['React', 'Telegram WebApp', 'Go', 'PostgreSQL']
      },
      {
        type: 'CRM \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f',
        title: 'AMOcrm x Platrum',
        url: '#about',
        description:
          '\u0420\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043b \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u043f\u0440\u044f\u043c\u044b\u0445 \u0440\u0430\u0441\u0445\u043e\u0434\u043e\u0432 \u0438\u0437 \u0441\u0434\u0435\u043b\u043a\u0438 AMOcrm \u0432 \u043c\u043e\u0434\u0443\u043b\u044c \u0424\u0438\u043d\u0430\u043d\u0441\u044b Platrum \u0447\u0435\u0440\u0435\u0437 API + webhooks.',
        result: '\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u0438, -6 \u0447\u0430\u0441\u043e\u0432 \u0440\u0443\u0447\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u0432 \u043d\u0435\u0434\u0435\u043b\u044e',
        stack: ['AMOcrm API', 'Platrum API', 'Webhooks', 'Node.js']
      }
    ],
    services: [
      '\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b: \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435, UI/UX, frontend, backend, \u0440\u0435\u043b\u0438\u0437.',
      '\u0421\u0438\u0441\u0442\u0435\u043c\u044b \u0434\u043b\u044f e-commerce: \u043a\u0430\u0442\u0430\u043b\u043e\u0433, \u043a\u043e\u0440\u0437\u0438\u043d\u0430, \u043e\u043f\u043b\u0430\u0442\u044b, CRM-\u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438.',
      '\u0418\u043c\u0438\u0434\u0436\u0435\u0432\u044b\u0435 \u0441\u0430\u0439\u0442\u044b \u0441\u043e \u0441\u0438\u043b\u044c\u043d\u043e\u0439 motion-\u043f\u043e\u0434\u0430\u0447\u0435\u0439 \u0438 \u043f\u0440\u043e\u0434\u0443\u043c\u0430\u043d\u043d\u044b\u043c UX.',
      'Telegram Mini Apps \u0438 \u0431\u043e\u0442\u044b \u043f\u043e\u0434 \u0437\u0430\u043a\u0430\u0437\u044b, \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0438, \u043b\u043e\u0433\u0438\u0441\u0442\u0438\u043a\u0443.',
      '\u041e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u0438, Core Web Vitals \u0438 \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u0438 \u043f\u0440\u043e\u0434\u0430.'
    ],
    automations: [
      'AMOcrm -> Platrum: \u0430\u0432\u0442\u043e\u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0440\u0430\u0441\u0445\u043e\u0434\u043e\u0432 (\u0437\u0430\u0440\u043f\u043b\u0430\u0442\u0430, \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b, \u0413\u0421\u041c, \u043f\u0440\u043e\u0447\u0438\u0435).',
      '@Dodologistic_bot: \u0432\u044b\u043a\u0443\u043f \u0438 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0442\u043e\u0432\u0430\u0440\u043e\u0432 \u0438\u0437 POIZON.',
      '@ClevVPN_bot: \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430 \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 VPN \u0434\u043e\u0441\u0442\u0443\u043f\u043e\u043c.',
      '@NextGenVPN_bot: \u0431\u0435\u0437\u043b\u0438\u043c\u0438\u0442\u043d\u044b\u0439 VPN \u0441 \u0430\u0432\u0442\u043e\u0432\u044b\u0434\u0430\u0447\u0435\u0439 \u043a\u043b\u044e\u0447\u0435\u0439.',
      '@monoflore_bot + t.me/monoflore: \u0446\u0432\u0435\u0442\u044b \u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u043e\u0439 \u043f\u043e \u041c\u043e\u0441\u043a\u0432\u0435.'
    ]
  },
  en: {
    metaTitle: 'Maxim qwuorty | Fullstack Developer',
    metaDescription:
      'Portfolio of Maxim qwuorty: design + fullstack delivery for e-commerce, cultural projects, Telegram Mini Apps and automations.',
    ui: {
      'preloader.label': 'Loading portfolio',
      'nav.home': 'Home',
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.kicker': 'Design + Fullstack',
      'hero.line1': 'I build digital products',
      'hero.line2': 'that feel premium,',
      'hero.line3': 'convert and scale.',
      'hero.text':
        'I design and develop websites, stores, museum platforms, Telegram Mini Apps and business automations end-to-end.',
      'hero.cta1': 'View projects',
      'hero.cta2': 'Start project',
      'stats.websites': 'Major web projects',
      'stats.bots': 'Telegram bots',
      'stats.fullcycle': 'Full cycle: design + fullstack',
      'work.kicker': 'Selected Work',
      'work.title': 'Websites, stores and digital platforms',
      'about.kicker': 'What I Do',
      'about.title': 'Fullstack delivery with product mindset',
      'about.serviceTitle': 'Core services',
      'about.automationTitle': 'Automations and bots',
      'contact.kicker': 'Contact',
      'contact.title': 'Need design + fullstack in one hands?',
      'contact.text': 'Send your scope and I will return architecture, timeline and implementation plan.',
      'footer.top': 'Back to top',
      resultLabel: 'Result'
    },
    projects: [
      {
        type: 'Bookstore e-commerce',
        title: 'Neformalnost',
        url: 'https://neformalnost.ru/',
        description:
          'Designed and built the full digital stack: catalog, search, checkout, CMS and logistics workflow.',
        result: 'LCP ~1.7s, checkout conversion growth +27%',
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker']
      },
      {
        type: 'Brand e-commerce',
        title: 'Kitchen Ceremony',
        url: 'https://kitchenceremony.com/',
        description:
          'Built a premium brand experience with campaign landing flows, product storytelling and editable content.',
        result: 'Ultima Yandex Food campaign launch, repeat sessions +34%',
        stack: ['Next.js', 'Headless CMS', 'Node API', 'Vercel']
      },
      {
        type: 'Museum platform',
        title: 'Museum AZ',
        url: 'https://museum-az.com/',
        description:
          'Delivered a modern museum website: exhibitions, events, navigation and rich content editing tools.',
        result: 'Online engagement growth +41% during season campaigns',
        stack: ['Nuxt', 'Node.js', 'Strapi', 'PostgreSQL']
      },
      {
        type: 'Sneaker marketplace',
        title: 'GOAT',
        url: 'https://www.goat.com/',
        description:
          'Implemented high-load storefront patterns for catalog pages, product cards and purchase funnels.',
        result: 'Stable Lighthouse 95+ on key storefront pages',
        stack: ['React', 'Node.js', 'GraphQL', 'Redis']
      },
      {
        type: 'Restaurant websites',
        title: 'Flaner Moscow',
        url: 'https://flanermoscow.ru/',
        description:
          'Created premium web presence for two restaurant concepts with booking flow, menu and event pages.',
        result: 'Reservation requests growth +33% after relaunch',
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Nginx']
      },
      {
        type: 'Store + Mini App',
        title: 'Unicorn GO',
        url: 'https://unicorngo.ru',
        description:
          'Launched e-commerce website and Telegram Mini App with connected catalog, checkout and payment flow.',
        result: 'Order path in Mini App under 40 seconds',
        stack: ['React', 'Telegram WebApp', 'Go', 'PostgreSQL']
      },
      {
        type: 'CRM integration',
        title: 'AMOcrm x Platrum',
        url: '#about',
        description:
          'Implemented webhook + API integration to push direct expenses from AMOcrm deals to Platrum Finance module.',
        result: 'Automated reporting, around 6 hours saved weekly',
        stack: ['AMOcrm API', 'Platrum API', 'Webhooks', 'Node.js']
      }
    ],
    services: [
      'Full-cycle delivery: discovery, UI/UX, frontend, backend and release.',
      'E-commerce systems: catalog, checkout, payments and CRM integrations.',
      'Brand websites with strong motion language and conversion-ready UX.',
      'Telegram Mini Apps and bots for sales, subscriptions and logistics.',
      'Performance optimization, Core Web Vitals and production stability.'
    ],
    automations: [
      'AMOcrm -> Platrum: automated transfer of direct expense fields.',
      '@Dodologistic_bot: POIZON sourcing and delivery automation.',
      '@ClevVPN_bot: subscription and VPN access management.',
      '@NextGenVPN_bot: unlimited VPN access provisioning flow.',
      '@monoflore_bot + t.me/monoflore: flower delivery flow for Moscow.'
    ]
  }
};

let currentLanguage = DEFAULT_LANGUAGE;
let transitionLocked = false;
let preloaderProgress = 0;

const detectLanguageFromPath = (pathname = window.location.pathname) => {
  const match = pathname.match(LANGUAGE_PATH_RE);
  return match ? match[1] : null;
};

const stripLanguageFromPath = (pathname = window.location.pathname) => {
  const stripped = pathname.replace(LANGUAGE_PATH_RE, '');
  return stripped === '' ? '/' : stripped;
};

const buildLanguagePath = (lang, pathname = window.location.pathname) => {
  const basePath = stripLanguageFromPath(pathname);
  return basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;
};

const syncLanguagePath = (lang, replaceHistory) => {
  const targetPath = buildLanguagePath(lang);
  if (targetPath === window.location.pathname) {
    return;
  }

  const nextUrl = `${targetPath}${window.location.search}${window.location.hash}`;
  const historyMethod = replaceHistory ? 'replaceState' : 'pushState';
  window.history[historyMethod]({}, '', nextUrl);
};

const setMeta = (langData) => {
  document.title = langData.metaTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', langData.metaDescription);
  }
};

const applyStaticTranslations = (ui) => {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(ui, key)) {
      node.textContent = ui[key];
    }
  });
};

const renderProjects = (langData) => {
  projectList.innerHTML = langData.projects
    .map((project, index) => {
      const idx = String(index + 1).padStart(2, '0');
      const stackHtml = project.stack.map((item) => `<li>${item}</li>`).join('');
      return `
        <article class="project-card" data-reveal data-tilt>
          <a href="${project.url}" ${project.url.startsWith('#') ? '' : 'target="_blank" rel="noreferrer"'}>
            <div class="project-index">${idx}</div>
            <div class="project-meta">
              <p class="project-type">${project.type}</p>
              <h3 class="project-title">${project.title}</h3>
              <p class="project-desc">${project.description}</p>
              <ul class="project-stack">${stackHtml}</ul>
            </div>
            <div class="project-result">
              <small>${langData.ui.resultLabel}</small>
              <strong>${project.result}</strong>
            </div>
          </a>
        </article>
      `;
    })
    .join('');
};

const renderSimpleList = (container, items) => {
  container.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
};

const applyLanguage = (lang, replaceHistory) => {
  const normalized = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  currentLanguage = normalized;

  const langData = DATA[normalized];
  document.documentElement.lang = normalized;
  setMeta(langData);
  applyStaticTranslations(langData.ui);
  renderProjects(langData);
  renderSimpleList(serviceList, langData.services);
  renderSimpleList(automationList, langData.automations);

  const switchLabel = normalized === 'ru' ? 'EN' : 'RU';
  const switchAria = normalized === 'ru' ? 'Switch to English' : 'Switch to Russian';
  langSwitch.textContent = switchLabel;
  langSwitch.setAttribute('aria-label', switchAria);

  syncLanguagePath(normalized, replaceHistory);
  bindRevealObserver();
  bindTiltEffects();
};

const runPageTransition = (callback) => {
  if (transitionLocked) {
    callback();
    return;
  }

  transitionLocked = true;
  pageTransition.classList.add('is-active');

  window.setTimeout(() => {
    callback();
  }, 250);

  window.setTimeout(() => {
    pageTransition.classList.remove('is-active');
    transitionLocked = false;
  }, 880);
};

const handleAnchorNavigation = (event) => {
  const href = event.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) {
    return;
  }

  const target = document.querySelector(href);
  if (!target) {
    return;
  }

  event.preventDefault();
  runPageTransition(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const bindNavLinks = () => {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', handleAnchorNavigation);
  });
};

let revealObserver;
const bindRevealObserver = () => {
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

let counterObserver;
const animateCounter = (node) => {
  const target = Number(node.dataset.counter || 0);
  const duration = 1200;
  const start = performance.now();

  const draw = (time) => {
    const t = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    node.textContent = String(Math.floor(target * eased));
    if (t < 1) {
      requestAnimationFrame(draw);
    }
  };

  requestAnimationFrame(draw);
};

const bindCounterObserver = () => {
  if (!counterObserver) {
    counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );
  }

  document.querySelectorAll('[data-counter]').forEach((node) => {
    if (node.dataset.counterBound === '1') {
      return;
    }
    node.dataset.counterBound = '1';
    counterObserver.observe(node);
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
    if (event.target.closest('a, button, .project-card')) {
      cursor.classList.add('is-active');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('a, button, .project-card')) {
      cursor.classList.remove('is-active');
    }
  });
};

const bindMagneticButtons = () => {
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

const bindTiltEffects = () => {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    if (card.dataset.tiltBound === '1') {
      return;
    }
    card.dataset.tiltBound = '1';

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 5;
      const ry = (px - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
};

const setYear = () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
};

const runPreloader = () => {
  document.body.style.overflow = 'hidden';

  const tick = () => {
    preloaderProgress += Math.random() * 13 + 5;
    if (preloaderProgress >= 100) {
      preloaderProgress = 100;
      preloaderBar.style.width = '100%';
      preloaderPercent.textContent = '100%';

      window.setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = 'auto';
      }, 260);
      return;
    }

    preloaderBar.style.width = `${preloaderProgress.toFixed(1)}%`;
    preloaderPercent.textContent = `${Math.floor(preloaderProgress)}%`;
    window.setTimeout(tick, 90);
  };

  tick();
};

const resolveInitialLanguage = () => {
  const pathLang = detectLanguageFromPath();
  if (pathLang && SUPPORTED_LANGUAGES.includes(pathLang)) {
    return pathLang;
  }

  syncLanguagePath(DEFAULT_LANGUAGE, true);
  return DEFAULT_LANGUAGE;
};

bindNavLinks();
bindCursor();
bindMagneticButtons();
setYear();

const initialLanguage = resolveInitialLanguage();
applyLanguage(initialLanguage, true);
bindCounterObserver();
runPreloader();

langSwitch.addEventListener('click', () => {
  const nextLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
  runPageTransition(() => {
    applyLanguage(nextLanguage, false);
  });
});

window.addEventListener('popstate', () => {
  const pathLang = detectLanguageFromPath();
  if (!pathLang) {
    applyLanguage(DEFAULT_LANGUAGE, true);
    return;
  }

  if (pathLang !== currentLanguage) {
    applyLanguage(pathLang, true);
  }
});