const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader__bar');
const cursor = document.querySelector('.cursor');
const revealItems = document.querySelectorAll('[data-reveal]');
const counters = document.querySelectorAll('[data-counter]');
const magneticItems = document.querySelectorAll('.magnetic');
const tiltCards = document.querySelectorAll('[data-tilt]');

let progress = 0;
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

document.body.style.overflow = 'hidden';
setYear();
setupCursor();
setupMagnetic();
setupTiltCards();
runRevealObserver();
runCounterObserver();
tickLoader();
