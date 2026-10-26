(() => {
  const CONFIG_URL = new URL('../../config/site.json', document.currentScript.src);
  const FALLBACK_LANG = 'en';
  let config = null;
  let language = localStorage.getItem('idsfc-language') || FALLBACK_LANG;

  const get = (obj, path) => path.split('.').reduce((v, key) => v == null ? undefined : v[key], obj);
  const text = (value) => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[language] ?? value.en ?? value['zh-TW'] ?? '';
  };
  const el = (tag, cls, content) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const safeHref = (href) => {
    if (!href || typeof href !== 'string') return '';
    if (/^(javascript:|data:)/i.test(href.trim())) return '';
    return href;
  };
  const link = (label, href, secondary = false) => {
    const safe = safeHref(href);
    if (!safe) return null;
    const a = el('a', `button${secondary ? ' secondary' : ''}`);
    a.href = safe;
    a.append(document.createTextNode(label), el('span', '', '↗'));
    if (/^https?:\/\//i.test(safe)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  };
  const renderParagraphs = (container, paragraphs) => {
    container.replaceChildren();
    (paragraphs || []).forEach(item => container.append(el('p', '', text(item))));
  };
  const renderNav = () => {
    const list = document.getElementById('nav-list');
    list.replaceChildren();
    config.navigation.forEach(item => {
      const li = el('li'), a = el('a', '', text(item.label));
      a.href = safeHref(item.href) || '#top';
      li.append(a); list.append(li);
    });
  };
  const render = () => {
    document.documentElement.lang = language === 'zh-TW' ? 'zh-Hant' : 'en';
    document.title = `${config.site.name} — ${text(config.hero.title)}`;
    document.querySelector('meta[name="description"]').content = text(config.site.description);
    document.getElementById('site-logo').src = config.site.logo || 'assets/logos/idsfc-logo.svg';
    document.getElementById('site-logo').onerror = () => { document.getElementById('site-logo').src = 'assets/logos/idsfc-logo.svg'; };
    const heroArt = document.querySelector('.hero-art');
    if (config.site.heroImage) {
      const imageUrl = safeHref(config.site.heroImage).replace(/[\"\\]/g, '');
      heroArt.style.backgroundImage = `linear-gradient(90deg, rgba(23,62,58,.06), rgba(23,62,58,.18)), url("${imageUrl}")`;
      heroArt.style.backgroundSize = 'cover';
      heroArt.style.backgroundPosition = 'center';
    }
    renderNav();
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = get(config, node.dataset.i18n);
      node.textContent = text(value);
    });
    document.querySelectorAll('[data-section-title]').forEach(node => {
      node.textContent = text(config.sections[node.dataset.sectionTitle]?.title);
    });
    const heroActions = document.getElementById('hero-actions');
    heroActions.replaceChildren();
    [config.hero.primaryButton, config.hero.secondaryButton].forEach((b, i) => {
      const a = link(text(b.label), b.href, i === 1); if (a) heroActions.append(a);
    });
    const about = config.sections.about;
    const aboutCopy = document.getElementById('about-copy');
    aboutCopy.replaceChildren(el('h3', 'lead-heading', text(about.lead)));
    renderParagraphs(aboutCopy, about.paragraphs);
    const facts = document.getElementById('facts'); facts.replaceChildren();
    (about.facts || []).forEach(f => {
      const box = el('div', 'fact'); box.append(el('span', '', text(f.label)), el('strong', '', text(f.value))); facts.append(box);
    });
    const themes = config.sections.themes, themeGrid = document.getElementById('themes-grid'); themeGrid.replaceChildren();
    (themes.items || []).forEach((item, i) => {
      const card = el('article', 'theme-card'); card.append(el('span', 'number', `0${i+1}`), el('h3', '', text(item))); themeGrid.append(card);
    });
    document.getElementById('themes-note').textContent = text(themes.note);
    const dates = config.sections.dates, datesList = document.getElementById('dates-list'); datesList.replaceChildren();
    (dates.items || []).forEach(item => {
      const row = el('div', 'date-row'); row.append(el('span', 'date-value', item.date), el('strong', 'date-label', text(item.label)), el('span', 'date-tag', 'IDSFC 2026')); datesList.append(row);
    });
    document.getElementById('dates-note').textContent = text(dates.note);
    const submission = config.sections.submission;
    renderParagraphs(document.getElementById('submission-copy'), submission.paragraphs);
    document.getElementById('submission-fee').textContent = text(submission.fee);
    const actions = document.getElementById('submission-actions'); actions.replaceChildren();
    (submission.buttons || []).forEach(b => {
      if (b.optional && !b.href) return;
      const a = link(text(b.label), b.href); if (a) actions.append(a);
    });
    const workshop = config.sections.workshop;
    renderParagraphs(document.getElementById('workshop-copy'), workshop.paragraphs);
    const workshopImage = document.getElementById('workshop-image');
    workshopImage.src = workshop.image || 'assets/images/workshop-placeholder.svg';
    workshopImage.alt = text(workshop.imageAlt);
    workshopImage.onerror = () => { workshopImage.src = 'assets/images/workshop-placeholder.svg'; };
    const announcements = document.getElementById('announcements-list'); announcements.replaceChildren();
    (config.sections.announcements.items || []).forEach(item => {
      const row = el('article', 'resource-item'), info = el('div');
      info.append(el('h3', '', text(item.title)), el('p', '', text(item.description)));
      const a = el('a', '', /^https?:\/\//i.test(item.href || '') ? 'OPEN RESOURCE ↗' : 'OPEN FILE ↗');
      a.href = safeHref(item.href) || '#';
      if (/^https?:\/\//i.test(a.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      row.append(info.firstElementChild, info.lastElementChild, a); announcements.append(row);
    });
    renderParagraphs(document.getElementById('contact-copy'), config.sections.contact.paragraphs);
    const email = config.site.contactEmail || '';
    const emailLink = document.getElementById('contact-email');
    emailLink.textContent = email || 'Contact email not configured';
    emailLink.href = email ? `mailto:${email}` : '#contact';
    document.getElementById('contact-phone').textContent = config.site.contactPhone || '';
    document.getElementById('footer-name').textContent = config.site.name || 'IDSFC 2026';
    document.getElementById('footer-copy').textContent = config.site.copyright || '';
    const footer = document.getElementById('footer-links'); footer.replaceChildren();
    (config.socialLinks || []).forEach(item => {
      const a = el('a', '', item.label); a.href = safeHref(item.href) || '#';
      if (/^https?:\/\//i.test(a.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      footer.append(a);
    });
    document.getElementById('language-toggle').textContent = language === 'en' ? '中文' : 'EN';
  };
  const setupControls = () => {
    const toggle = document.getElementById('menu-toggle'), nav = document.getElementById('primary-nav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    document.getElementById('language-toggle').addEventListener('click', () => {
      language = language === 'en' ? 'zh-TW' : 'en';
      localStorage.setItem('idsfc-language', language);
      render();
    });
  };
  fetch(CONFIG_URL)
    .then(response => { if (!response.ok) throw new Error(`Config fetch failed: ${response.status}`); return response.json(); })
    .then(data => { config = data; setupControls(); render(); })
    .catch(error => {
      console.error('IDSFC site configuration could not be loaded.', error);
      document.getElementById('main').prepend(el('p', 'noscript', 'Website content configuration could not be loaded. Please check config/site.json and run this site through a local web server.'));
    });
})();
