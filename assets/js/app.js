const rootPath = document.body.dataset.rootPath || '.';
const isAppPage = document.body.dataset.protected === 'true';
const currentPage = document.body.dataset.page || '';

const mockData = {
  users: [
    { name: 'Maya Johnson', email: 'coach@prohub.test', role: 'coach' },
    { name: 'Jordan Rivera', email: 'player@prohub.test', role: 'player' },
    { name: 'Avery Chen', email: 'director@prohub.test', role: 'director' },
    { name: 'Sam Rivera', email: 'parent@prohub.test', role: 'parent' },
  ],
  players: [
    { name: 'Jordan Rivera', position: 'CM', team: 'U17 Elite', focus: 'Scanning before receiving', status: 'On track', statusColor: 'green' },
    { name: 'Alex Morgan', position: 'W', team: 'U17 Elite', focus: '1v1 final-third actions', status: 'Review', statusColor: 'orange' },
    { name: 'Taylor Kim', position: 'CB', team: 'U16 Academy', focus: 'Line-breaking passes', status: 'New note', statusColor: 'blue' },
  ],
  sessions: [
    { title: 'U17 Pressing Triggers', team: 'U17 Elite', date: '2026-05-18', phase: 'Defending', status: 'Ready' },
    { title: 'Finishing Under Pressure', team: 'U15 Girls', date: '2026-05-20', phase: 'Attacking', status: 'Draft' },
  ],
  idps: [
    { player: 'Jordan Rivera', goal: 'Scan twice before receiving', progress: 72 },
    { player: 'Alex Morgan', goal: 'Earlier wide isolation decisions', progress: 54 },
  ],
  scouting: [
    { player: 'Noah Silva', event: 'Spring Showcase', rating: 'A-', next: 'Invite to trial session' },
    { player: 'Emery Davis', event: 'Regional Cup', rating: 'B+', next: 'Request full match film' },
  ],
  recruiting: [
    { school: 'North Coast University', division: 'DII', status: 'Active', next: 'Send updated highlight reel' },
    { school: 'Metro State', division: 'DIII', status: 'Watching', next: 'Register for ID camp' },
  ],
  videos: [
    { title: 'First touch compilation', owner: 'Jordan Rivera', tags: 'Scanning, receiving' },
    { title: 'Pressing clips v. Lakeside', owner: 'U17 Elite', tags: 'Triggers, recovery runs' },
  ],
  notes: [
    'Jordan: praised for checking shoulder before third-player combination.',
    'U17 team: add transition rondo before Saturday match block.',
    'Parent meeting: share IDP progress chart and next four-week targets.',
  ],
};

const getSession = () => JSON.parse(localStorage.getItem('prohubSession') || 'null');
const setSession = (session) => localStorage.setItem('prohubSession', JSON.stringify(session));
const clearSession = () => localStorage.removeItem('prohubSession');
const appUrl = (page = 'dashboard.html') => `${rootPath}/app/${page}`.replace('/./', '/');

if (isAppPage && !getSession()) {
  window.location.href = `${rootPath}/login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
}

const navToggle = document.querySelector('[data-nav-toggle]');
const primaryNav = document.querySelector('[data-primary-nav]');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
  const toggle = dropdown.querySelector('[data-dropdown-toggle]');
  if (!toggle) return;
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('[data-dropdown].open').forEach((dropdown) => {
    dropdown.classList.remove('open');
    dropdown.querySelector('[data-dropdown-toggle]')?.setAttribute('aria-expanded', 'false');
  });
});

const sidebar = document.querySelector('[data-sidebar]');
document.querySelectorAll('[data-sidebar-toggle]').forEach((toggle) => {
  toggle.addEventListener('click', () => sidebar?.classList.toggle('open'));
});

const validateForm = (form) => {
  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    const wrapper = field.closest('.form-field') || field.parentElement;
    const empty = !String(field.value || '').trim();
    const emailInvalid = field.type === 'email' && field.value && !field.checkValidity();
    const shortPassword = field.name === 'password' && field.value.length < 6;
    const invalid = empty || emailInvalid || shortPassword;
    wrapper?.classList.toggle('invalid', invalid);
    if (invalid) valid = false;
  });
  return valid;
};

document.querySelectorAll('[data-validate]').forEach((form) => {
  form.addEventListener('input', (event) => {
    const wrapper = event.target.closest('.form-field');
    wrapper?.classList.remove('invalid');
  });
  form.addEventListener('submit', (event) => {
    if (!validateForm(form)) {
      event.preventDefault();
      return;
    }
    if (form.dataset.auth === 'login') {
      event.preventDefault();
      const role = form.querySelector('[name="role"]')?.value || 'coach';
      const email = form.querySelector('[name="email"]')?.value;
      const matched = mockData.users.find((user) => user.role === role) || mockData.users[0];
      setSession({ name: matched.name, email, role });
      window.location.href = appUrl('dashboard.html');
    }
    if (form.dataset.auth === 'signup') {
      event.preventDefault();
      const role = form.querySelector('[name="role"]')?.value || 'coach';
      const name = form.querySelector('[name="name"]')?.value || 'ProHub User';
      const email = form.querySelector('[name="email"]')?.value;
      // Future backend integration: create Supabase auth user, profile row, and role membership here.
      // Future Stripe integration: start checkout or attach trial subscription after account creation.
      setSession({ name, email, role });
      window.location.href = appUrl('dashboard.html');
    }
    if (form.dataset.saveForm) {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(form).entries());
      const storageKey = `prohub:${form.dataset.saveForm}`;
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      saved.unshift({ ...formData, savedAt: new Date().toISOString() });
      localStorage.setItem(storageKey, JSON.stringify(saved));
      form.querySelector('[data-save-state]').textContent = 'Saved locally for demo. Backend API will replace this save action.';
      form.reset();
    }
  });
});

document.querySelectorAll('[data-logout]').forEach((button) => {
  button.addEventListener('click', () => {
    clearSession();
    window.location.href = `${rootPath}/login.html`;
  });
});

document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
  const tabs = tabGroup.querySelectorAll('[data-tab]');
  const panels = tabGroup.querySelectorAll('[data-panel]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      panels.forEach((panel) => panel.classList.toggle('active', panel.getAttribute('data-panel') === target));
    });
  });
});

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = false;
  modal.querySelector('[data-modal-close]')?.focus();
};
const closeModal = (modal) => { modal.hidden = true; };
document.querySelectorAll('[data-modal-open]').forEach((trigger) => trigger.addEventListener('click', () => openModal(trigger.getAttribute('data-modal-open'))));
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-modal-open]');
  if (trigger) openModal(trigger.getAttribute('data-modal-open'));
});
document.querySelectorAll('.modal').forEach((modal) => modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target.closest('[data-modal-close]')) closeModal(modal);
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
});

const applyFilter = (input) => {
  const target = document.querySelector(input.dataset.filter);
  if (!target) return;
  const query = input.value.toLowerCase();
  let shown = 0;
  target.querySelectorAll('[data-filter-row]').forEach((row) => {
    const match = row.textContent.toLowerCase().includes(query);
    row.style.display = match ? '' : 'none';
    if (match) shown += 1;
  });
  document.querySelector(`[data-empty-for="${input.dataset.filter}"]`)?.style.setProperty('display', shown ? 'none' : 'block');
};
document.querySelectorAll('[data-filter]').forEach((input) => input.addEventListener('input', () => applyFilter(input)));
document.addEventListener('input', (event) => {
  if (event.target.matches('[data-filter]')) applyFilter(event.target);
});

const renderDashboard = () => {
  const mount = document.querySelector('[data-dashboard]');
  if (!mount) return;
  const session = getSession() || { name: 'Demo User', role: 'coach' };
  document.querySelectorAll('[data-user-name]').forEach((el) => { el.textContent = session.name; });
  document.querySelectorAll('[data-user-role]').forEach((el) => { el.textContent = session.role === 'director' ? 'Director / Club Admin' : session.role[0].toUpperCase() + session.role.slice(1); });
  const dashboardViews = {
    coach: {
      title: 'Coach command center',
      intro: 'Monitor team readiness, individual development plans, session workload, scouting follow-ups, and coaching notes.',
      kpis: [['Active Players', '42'], ['Open IDPs', '18'], ['Sessions Planned', '6'], ['Film Clips', '84']],
      primary: 'Build next session',
      tab: 'Roster pulse',
    },
    player: {
      title: 'Player development hub',
      intro: 'Track your IDP, training plan, recruiting profile, video assignments, and coach feedback in one workspace.',
      kpis: [['IDP Progress', '72%'], ['Training Blocks', '4'], ['Video Tasks', '3'], ['Recruiting Items', '7']],
      primary: 'Update profile',
      tab: 'My development plan',
    },
    director: {
      title: 'Club performance overview',
      intro: 'See program health across teams, coaches, player pathways, recruiting visibility, and parent communication.',
      kpis: [['Players', '248'], ['Teams', '16'], ['Coach Notes', '412'], ['At-risk Reviews', '31']],
      primary: 'Review club reports',
      tab: 'Program health',
    },
    parent: {
      title: 'Parent progress view',
      intro: 'Follow your player’s goals, training rhythm, development notes, recruiting tasks, and upcoming meetings.',
      kpis: [['Goals On Track', '3'], ['Coach Notes', '9'], ['Upcoming Events', '5'], ['Profile Complete', '82%']],
      primary: 'View player plan',
      tab: 'Family updates',
    },
  };
  const content = dashboardViews[session.role] || dashboardViews.coach;

  mount.innerHTML = `
    <div class="breadcrumbs"><a href="../index.html">Home</a><span>/</span><span>App</span><span>/</span><span>Dashboard</span></div>
    <section class="dashboard-hero">
      <div><p class="eyebrow" data-user-role></p><h1>${content.title}</h1><p>${content.intro}</p></div>
      <a class="btn btn-primary" href="session-builder.html">${content.primary}</a>
    </section>
    <section class="kpi-grid">${content.kpis.map(([label, value]) => `<article class="card metric-card"><span>${label}</span><strong>${value}</strong></article>`).join('')}</section>
    <section class="card-grid two-grid" style="margin-top:1rem">
      <article class="card"><h2>${content.tab}</h2>${mockData.idps.map((idp) => `<div class="list-row"><div><strong>${idp.player}</strong><p>${idp.goal}</p></div><span class="badge">${idp.progress}%</span></div><div class="progress-shell"><span style="width:${idp.progress}%"></span></div>`).join('')}</article>
      <article class="card"><h2>Upcoming sessions</h2>${mockData.sessions.map((s) => `<div class="list-row"><div><strong>${s.title}</strong><p>${s.team} · ${s.date} · ${s.phase}</p></div><span class="status ${s.status === 'Ready' ? 'green' : 'orange'}">${s.status}</span></div>`).join('')}</article>
    </section>
    <section class="card" style="margin-top:1rem"><div class="search-row"><input type="search" placeholder="Search players, reports, teams..." data-filter="#player-table"><button class="btn btn-secondary btn-small" data-modal-open="note-modal">Add note</button></div><div class="responsive-table"><table><thead><tr><th>Player</th><th>Position</th><th>Team</th><th>IDP Focus</th><th>Status</th></tr></thead><tbody id="player-table">${mockData.players.map((p) => `<tr data-filter-row><td>${p.name}</td><td>${p.position}</td><td>${p.team}</td><td>${p.focus}</td><td><span class="status ${p.statusColor}">${p.status}</span></td></tr>`).join('')}</tbody></table></div><p class="empty-state" data-empty-for="#player-table">No matching players found.</p></section>
    <section class="card-grid three-grid" style="margin-top:1rem">
      <article class="card"><h3>Scouting reports</h3>${mockData.scouting.map((r) => `<p><strong>${r.player}</strong> · ${r.event}<br>${r.rating} · ${r.next}</p>`).join('')}</article>
      <article class="card"><h3>Recruiting profiles</h3>${mockData.recruiting.map((r) => `<p><strong>${r.school}</strong> · ${r.division}<br>${r.status} · ${r.next}</p>`).join('')}</article>
      <article class="card"><h3>Video library</h3>${mockData.videos.map((v) => `<p><strong>${v.title}</strong><br>${v.owner} · ${v.tags}</p>`).join('')}</article>
    </section>`;
  document.querySelectorAll('[data-user-role]').forEach((el) => { el.textContent = session.role === 'director' ? 'Director / Club Admin' : session.role[0].toUpperCase() + session.role.slice(1); });
};
renderDashboard();

// Future AI API integration: send selected player notes, session objectives, and video tags to an AI assistant endpoint for coaching summaries.
// Future database integration: replace mockData/localStorage with Supabase tables, row-level security, and realtime updates.
