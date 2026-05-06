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

document.querySelectorAll('[data-role-selector]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const select = form.querySelector('[data-role-select]');
    if (select?.value) {
      // Backend integration: authenticated apps should replace this redirect with role-aware session routing.
      window.location.href = select.value;
    }
  });
});

document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
  const tabs = tabGroup.querySelectorAll('[data-tab]');
  const panels = tabGroup.querySelectorAll('[data-panel]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
      });
    });
  });
});

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = false;
  modal.querySelector('[data-modal-close]')?.focus();
};

const closeModal = (modal) => {
  modal.hidden = true;
};

document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
  trigger.addEventListener('click', () => openModal(trigger.getAttribute('data-modal-open')));
});

document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-modal-close]')) {
      closeModal(modal);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
  }
});
