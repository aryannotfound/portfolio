'use strict';

(() => {
  const { profile, experience, projects, areas, categories, skills, education, modules, certificates, languages, volunteering, copy } = window.portfolioContent;
  const icon = window.portfolioIcon;

  const $ = selector => document.querySelector(selector);
  const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
  const published = projects.filter(project => project.published);
  const dialog = $('#project-dialog');
  const darkPreference = matchMedia('(prefers-color-scheme: dark)');
  const narrowNav = matchMedia('(max-width: 58rem)');

  function readPreference(key) {
    try { return localStorage.getItem(`portfolio-${key}`); } catch { return null; }
  }

  function remember(key, value) {
    try { localStorage.setItem(`portfolio-${key}`, value); } catch { /* The page still works without storage. */ }
  }

  let language = readPreference('language') === 'en' ? 'en' : 'de';
  let theme = readPreference('theme') || (darkPreference.matches ? 'dark' : 'light');
  let active = 'home';
  let menuOpen = false;
  let scrollQueued = false;

  const filters = { languages: '', areas: '', categories: '' };
  const filterLabels = { languages: 'language', areas: 'area', categories: 'category' };
  const filterValues = {
    languages: Object.fromEntries(published.flatMap(project => project.languages).map(name => [name, name])),
    areas,
    categories
  };

  const translate = value => typeof value === 'string' ? value : value?.[language] || '';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const local = value => escape(translate(value));
  const label = key => local(copy[key]);
  const bodyOf = section => $(`#${section} .section-inner`);

  function safeURL(value, asset = false) {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, location.href);
      if (asset && /^\.\/(?!\/)/.test(value) && url.origin === location.origin && url.protocol === location.protocol) return escape(value);
      if (/^https?:\/\//i.test(value) && ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password) return escape(url.href);
    } catch { /* Omit invalid links. */ }
    return '';
  }

  const formatDate = (date, options) => new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-GB', {
    ...options, timeZone: 'UTC'
  }).format(new Date(date.length === 7 ? `${date}-01` : date));
  const range = ({ start, end }) => `<time datetime="${escape(start)}">${formatDate(start, { month: 'short', year: 'numeric' })}</time> <span aria-hidden="true">–</span> ${end ? `<time datetime="${escape(end)}">${formatDate(end, { month: 'short', year: 'numeric' })}</time>` : label('present')}`;
  const chips = values => `<ul class="chips">${values.map(value => `<li>${local(value)}</li>`).join('')}</ul>`;
  const paragraphs = values => values.map(value => `<p>${local(value)}</p>`).join('');
  const list = values => `<ul class="content-list">${values.map(value => `<li>${local(value)}</li>`).join('')}</ul>`;
  const link = (url, content, className = '', attributes = '') => url ? `<a class="${className}" href="${url}" ${attributes}>${content}</a>` : '';
  const externalLink = (url, content, className = '') => link(safeURL(url), content, className, 'target="_blank" rel="noopener noreferrer"');
  const cvLink = className => link(safeURL(profile.cv, true), icon('download') + label('download'), className, 'download');
  const email = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? `mailto:${escape(profile.email)}` : '';
  const socials = () => [externalLink(profile.links.linkedin, 'LinkedIn'), externalLink(profile.links.github, 'GitHub')].filter(Boolean).join('');
  const heading = (section, title, intro = '') => `<div class="section-heading"><p class="eyebrow">${label(section)}</p><h2 id="${section}-title">${label(title)}</h2>${intro ? `<p class="section-lead">${label(intro)}</p>` : ''}</div>`;
  const expand = `<span class="expand" aria-hidden="true">${icon('plus')}${icon('minus')}</span>`;

  function renderHeader() {
    $('.brand-name').textContent = profile.name;
    $('.monogram').textContent = profile.initials;
    $('.brand').setAttribute('aria-label', profile.name);
    $('.skip').textContent = translate(copy.skip);
    $('#navigation').setAttribute('aria-label', translate(copy.nav));
    $('#navigation').innerHTML = `<ul>${sections.map(id => `<li><a href="#${id}" ${id === active ? 'aria-current="location"' : ''}>${label(id)}</a></li>`).join('')}</ul>`;
    $('#header-controls').innerHTML = `<div class="language-switch" role="group" aria-label="Deutsch / English">
      <button id="lang-de" type="button" lang="de" aria-label="Deutsch" aria-pressed="${language === 'de'}">DE</button>
      <button id="lang-en" type="button" lang="en" aria-label="English" aria-pressed="${language === 'en'}">EN</button>
    </div><button id="theme-toggle" class="icon-button" type="button"></button>
    <button id="menu-toggle" class="icon-button menu-toggle" type="button" aria-label="${label('menu')}" aria-controls="navigation">${icon('menu')}</button>`;
    applyTheme();
    syncMenu();
  }

  function applyTheme() {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $('meta[name="theme-color"]').content = dark ? '#0e1625' : '#f5f6fa';
    const toggle = $('#theme-toggle');
    toggle.setAttribute('aria-label', translate(copy[dark ? 'light' : 'dark']));
    toggle.title = toggle.getAttribute('aria-label');
    toggle.innerHTML = icon(dark ? 'sun' : 'moon');
  }

  function syncMenu() {
    $('#header').dataset.menu = String(menuOpen);
    const button = $('#menu-toggle');
    button.setAttribute('aria-expanded', String(menuOpen));
    button.innerHTML = icon(menuOpen ? 'close' : 'menu');
    $('#navigation').hidden = narrowNav.matches && !menuOpen;
  }

  function renderHome() {
    const portrait = safeURL(profile.portrait?.src, true);
    $('#home').innerHTML = `<div class="hero-copy">
      <p class="hero-location">${icon('pin')}${local(profile.location)}</p>
      <h1 id="hero-name">${escape(profile.name)}</h1>
      <p class="hero-headline">${local(profile.headline)}</p>
      <p class="hero-focus">${local(profile.focus)}</p>
      <p class="hero-intro">${local(profile.intro)}</p>
      <div class="actions hero-actions">
        <a class="button primary" href="#projects">${label('viewProjects')}</a>
        ${cvLink('button secondary')}
        <a class="text-link" href="#contact">${label('contactMe')}</a>
      </div>
      ${socials() ? `<div class="socials">${socials()}</div>` : ''}
    </div><div class="hero-side">
      <div class="hero-visual${portrait ? ' has-portrait' : ''}">
        <img src="${portrait || './assets/images/profile-graphic.svg'}" alt="${portrait ? local(profile.portrait.alt) : ''}" width="520" height="448" fetchpriority="high">
      </div>
      ${profile.availability.start ? `<div class="availability">
        <span class="availability-icon">${icon('calendar')}</span>
        <div><strong>${label('available')} <time datetime="${escape(profile.availability.start)}">${formatDate(profile.availability.start, { day: '2-digit', month: '2-digit', year: 'numeric' })}</time></strong>
        <span>${label('student')} · ${local(profile.availability.hours)}</span></div>
      </div>` : ''}
    </div>`;
  }

  function renderAbout() {
    bodyOf('about').innerHTML = `<div class="about-grid"><div>
      ${heading('about', 'aboutTitle')}${paragraphs(profile.about)}
    </div><aside class="interest-panel"><h3>${label('interests')}</h3>${list(profile.interests)}</aside></div>`;
  }

  function renderExperience(openEntries) {
    bodyOf('experience').innerHTML = `${heading('experience', 'experienceTitle')}
    <div class="timeline experience-list">${experience.map(entry => `<details class="timeline-entry" id="experience-${escape(entry.id)}" ${openEntries.has(entry.id) ? 'open' : ''}>
      <summary><span class="entry-time">${range(entry)}<span class="entry-location">${escape(entry.location)}</span></span>
      <span class="entry-main"><strong>${escape(entry.company)}</strong><span>${local(entry.role)}</span><small>${local(entry.summary)}</small></span>${expand}</summary>
      <div class="entry-details">${list(entry.duties)}${chips(entry.skills)}</div>
    </details>`).join('')}</div>`;
  }

  function renderProjects() {
    bodyOf('projects').innerHTML = `${heading('projects', 'projectsTitle', 'projectsIntro')}
      <form class="filters" id="filters">${Object.keys(filters).map(key => {
        const options = [...new Set(published.flatMap(project => project[key]))];
        return `<label>${label(filterLabels[key])}<select id="filter-${key}" name="${key}">
          <option value="">${label('all')}</option>
          ${options.map(option => `<option value="${escape(option)}" ${filters[key] === option ? 'selected' : ''}>${local(filterValues[key][option] || option)}</option>`).join('')}
        </select></label>`;
      }).join('')}<button class="text-link reset" type="reset">${label('reset')}</button></form>
      <p id="project-count" class="result-count" role="status" aria-atomic="true"></p>
      <div class="project-grid" id="project-grid"></div>`;
    renderProjectCards();
  }

  function renderProjectCards() {
    const matches = published.filter(project => Object.entries(filters).every(([key, value]) => !value || project[key].includes(value)));
    $('#project-count').textContent = `${matches.length} ${translate(copy[matches.length === 1 ? 'projectSingle' : 'projectCount'])}`;
    $('#project-grid').innerHTML = matches.length ? matches.map(project => {
      const illustration = project.illustration ? safeURL(`./assets/projects/${project.illustration}.svg`, true) : '';
      return `<article class="project-card" id="project-${escape(project.id)}">
        <div class="project-art">${illustration ? `<img src="${illustration}" alt="" loading="lazy" width="640" height="320">` : icon('code')}</div>
        <div class="project-body"><p class="project-category">${project.categories.map(key => local(categories[key])).join(' · ')}</p>
        <h3>${escape(project.title)}</h3><p class="project-summary">${local(project.summary)}</p>
        ${chips(project.languages)}
        <button class="project-button text-link" type="button" id="view-${escape(project.id)}" data-project="${escape(project.id)}" aria-label="${label('details')} · ${escape(project.title)}">${label('details')} ${icon('plus')}</button></div>
      </article>`;
    }).join('') : `<p class="empty">${label('empty')}</p>`;
  }

  function renderProjectDialog(project) {
    const facts = [
      ['status', project.status],
      ['challenge', project.challenge],
      ['lessons', project.lessons],
      ['improvements', project.improvements]
    ];
    const media = (project.media || []).map(item => {
      const src = safeURL(item.src, true);
      if (!src) return '';
      const figure = item.type === 'video'
        ? `<video controls preload="metadata" src="${src}" ${item.captions && safeURL(item.captions.src, true) ? `<track kind="captions" src="${safeURL(item.captions.src, true)}" srclang="${escape(item.captions.language)}" label="${local(item.captions.label)}">` : ''} aria-label="${local(item.alt)}"></video>`
        : `<img src="${src}" alt="${local(item.alt)}" loading="lazy">`;
      return `<figure>${figure}${item.caption ? `<figcaption>${local(item.caption)}</figcaption>` : ''}</figure>`;
    }).join('');
    dialog.innerHTML = `<div class="dialog-body">
      <button type="button" id="close-project" class="icon-button dialog-close" aria-label="${label('close')}">${icon('close')}</button>
      <p class="eyebrow">${project.categories.map(key => local(categories[key])).join(' · ')}</p>
      <h2 id="dialog-title" tabindex="-1">${escape(project.title)}</h2><p>${local(project.details)}</p>
      ${chips([...project.languages, ...project.concepts])}
      ${facts.filter(([, value]) => translate(value)).map(([key, value]) => `<h3>${label(key)}</h3><p>${local(value)}</p>`).join('')}
      ${media ? `<div class="project-media">${media}</div>` : ''}
      <div class="actions">${externalLink(project.repository, 'GitHub', 'button secondary')}${externalLink(project.demo, label('demo'), 'button primary')}</div>
    </div>`;
  }

  function showProject(id) {
    const project = published.find(entry => entry.id === id);
    if (!project) return;
    renderProjectDialog(project);
    if (!dialog.open) dialog.showModal();
    $('#dialog-title').focus();
  }

  function renderSkills(openEntries) {
    bodyOf('skills').innerHTML = `${heading('skills', 'skillsTitle', 'skillsIntro')}<div class="skill-grid">
      ${skills.map(group => `<details class="skill-card" id="skill-${escape(group.id)}" ${openEntries.has(group.id) ? 'open' : ''}>
        <summary><span class="skill-icon">${icon(group.icon)}</span><span>${local(group.title)}</span>${expand}</summary>
        <div class="skill-body">${chips(group.items.filter(item => !item.learning).map(item => item.name))}
        ${group.items.some(item => item.learning) ? `<h4>${label('learning')}</h4>${chips(group.items.filter(item => item.learning).map(item => item.name))}` : ''}
        ${group.items.some(item => item.evidence.length) ? `<details class="evidence" id="evidence-${escape(group.id)}" ${openEntries.has(`evidence-${group.id}`) ? 'open' : ''}><summary>${label('evidence')}</summary><dl>
        ${group.items.filter(item => item.evidence.length).map(item => `<dt>${local(item.name)}</dt><dd>${item.evidence.map(id => {
          const project = published.find(entry => entry.id === id);
          const role = experience.find(entry => entry.id === id);
          return project
            ? `<button type="button" class="text-link" data-project="${escape(id)}">${escape(project.title)}</button>`
            : role ? `<a href="#experience-${escape(id)}" data-experience="${escape(id)}">${escape(role.company)}</a>` : '';
        }).filter(Boolean).join(' · ')}</dd>`).join('')}</dl></details>` : ''}</div>
      </details>`).join('')}</div>`;
  }

  function renderEducation() {
    bodyOf('education').innerHTML = `${heading('education', 'educationTitle')}
    <div class="education-grid">
      <ol class="education-list timeline">${education.map(entry => `<li><p class="entry-time">${range(entry)}</p><h3>${local(entry.program)}</h3><p>${escape(entry.institution)}</p></li>`).join('')}</ol>
      <div class="module-panel">${Object.entries(modules).filter(([, values]) => values.length).map(([key, values]) => `<div><h3>${label(key)}</h3>${list(values)}</div>`).join('')}</div>
    </div>
    <div class="qualifications">
      <div class="qual-card"><h3>${label('certs')}</h3><ul>${certificates.map(item => {
        const image = safeURL(item.image, true);
        return `<li><strong>${local(item.title)}</strong>${item.issuer ? `<span>${local(item.issuer)}</span>` : ''}${image ? `<img src="${image}" alt="${local(item.title)}" loading="lazy">` : ''}${externalLink(item.verification, label('verify'), 'text-link')}</li>`;
      }).join('')}</ul></div>
      <div class="qual-card"><h3>${label('spoken')}</h3><dl>${languages.map(item => `<div><dt>${local(item.name)}</dt><dd>${local(item.level)}</dd></div>`).join('')}</dl></div>
    </div>${volunteering.length ? `<div class="qual-card volunteering"><h3>${label('volunteering')}</h3><ul>${volunteering.map(item => `<li><strong>${local(item.title)}</strong><span>${local(item.description)}</span></li>`).join('')}</ul></div>` : ''}`;
  }

  function renderContact() {
    bodyOf('contact').innerHTML = `<div class="contact-panel">
      <div>${heading('contact', 'contactTitle', 'contactIntro')}
      <div class="actions">${link(email(), icon('mail') + label('emailMe'), 'button primary')}${cvLink('button secondary')}</div></div>
      <address>${link(email(), escape(profile.email))}<span>${icon('pin')}${local(profile.location)}</span><div class="socials">${socials()}</div></address>
    </div>`;
    $('#footer').innerHTML = `<div class="wrap footer-inner"><span>© ${new Date().getFullYear()} ${escape(profile.name)}</span><a href="#home">${label('top')}</a></div>`;
  }

  function openDetails(selector, prefix) {
    return new Set([...document.querySelectorAll(selector)].map(entry => entry.id.replace(prefix, '')));
  }

  function render() {
    document.documentElement.lang = language;
    document.title = `${profile.name} | ${translate(profile.headline)}`;
    $('meta[name="description"]').content = translate(copy.meta);
    const openExperience = openDetails('.timeline-entry[open]', 'experience-');
    const openSkills = openDetails('.skill-card[open], .evidence[open]', 'skill-');
    if (!$('#experience .timeline-entry') && experience.length) openExperience.add(experience[0].id);
    if (!$('#skills .skill-card')) skills.forEach(group => openSkills.add(group.id));
    renderHeader();
    renderHome();
    renderAbout();
    renderExperience(openExperience);
    renderProjects();
    renderSkills(openSkills);
    renderEducation();
    renderContact();
    updateActive();
  }

  function updateActive() {
    const header = $('#header');
    const threshold = header.offsetHeight + 95;
    const atBottom = scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 3;
    active = atBottom ? 'contact' : [...sections].reverse().find(id => document.getElementById(id).getBoundingClientRect().top <= threshold) || 'home';
    for (const anchor of $('#navigation').querySelectorAll('a')) {
      if (anchor.hash === `#${active}`) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    }
  }

  let projectTrigger;
  document.addEventListener('click', event => {
    const control = event.target.closest('a, button');
    if (!control) return;
    switch (control.id) {
      case 'lang-de':
      case 'lang-en':
        language = control.id.slice(-2);
        remember('language', language);
        render();
        document.getElementById(control.id).focus({ preventScroll: true });
        return;
      case 'theme-toggle':
        theme = theme === 'dark' ? 'light' : 'dark';
        remember('theme', theme);
        applyTheme();
        return;
      case 'menu-toggle':
        menuOpen = !menuOpen;
        syncMenu();
        if (menuOpen) $('#navigation a').focus();
        return;
      case 'close-project':
        dialog.close();
        return;
    }
    if (control.dataset.project) {
      projectTrigger = control;
      showProject(control.dataset.project);
    }
    if (control.dataset.experience) {
      const target = document.getElementById(control.hash.slice(1));
      target.open = true;
      target.querySelector('summary').focus({ preventScroll: true });
    }
    if (menuOpen && control.closest('#navigation')) {
      menuOpen = false;
      syncMenu();
      const target = $(control.hash);
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });

  document.addEventListener('change', event => {
    if (event.target.matches('#filters select')) {
      filters[event.target.name] = event.target.value;
      renderProjectCards();
    }
  });
  document.addEventListener('reset', event => {
    if (event.target.id !== 'filters') return;
    event.preventDefault();
    for (const select of event.target.querySelectorAll('select')) {
      select.value = '';
      filters[select.name] = '';
    }
    renderProjectCards();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuOpen && !dialog.open) {
      menuOpen = false;
      syncMenu();
      $('#menu-toggle').focus();
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    dialog.replaceChildren();
    projectTrigger?.focus({ preventScroll: true });
  });
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      updateActive();
    });
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  narrowNav.addEventListener('change', () => {
    menuOpen = false;
    syncMenu();
  });
  darkPreference.addEventListener('change', event => {
    if (readPreference('theme')) return;
    theme = event.matches ? 'dark' : 'light';
    applyTheme();
  });

  render();
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.matches('details')) target.open = true;
    target?.scrollIntoView({ behavior: 'instant' });
  }

  const structured = document.createElement('script');
  structured.type = 'application/ld+json';
  structured.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    description: copy.meta.de,
    address: { '@type': 'PostalAddress', addressLocality: 'Saarbrücken', addressCountry: 'DE' },
    email: profile.email,
    affiliation: { '@type': 'CollegeOrUniversity', name: profile.university },
    url: safeURL(profile.links.website) ? profile.links.website : undefined,
    sameAs: [profile.links.linkedin, profile.links.github].filter(url => safeURL(url))
  });
  document.head.append(structured);
})();
