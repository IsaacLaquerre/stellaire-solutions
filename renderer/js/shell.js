// Page shell: view switching, settings dialog, theme and language.
import { I18N, translate } from './i18n.js';
import { prefs } from './prefs.js';

export const t = (key, vars) => translate(prefs.lang, key, vars);

export function showView(id) {
    document.querySelectorAll('.view').forEach((view) => view.classList.toggle('is-active', view.id === `view-${id}`));
}

export function applyTheme() {
    document.documentElement.dataset.theme = prefs.theme;
    document.getElementById('themeToggle').checked = prefs.theme === 'dark';
}

export function applyLanguage(api) {
    document.documentElement.lang = prefs.lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    document.querySelectorAll('input[name="lang"]').forEach((radio) => { radio.checked = radio.value === prefs.lang; });
    document.title = I18N[prefs.lang].appTitle;
    api.setLanguage(prefs.lang);
}

// onLanguage: called after the language changed (to refresh statuses).
export function setupShell(api, { onLanguage = () => {} } = {}) {
    document.querySelectorAll('.module-card').forEach((card) => card.addEventListener('click', () => showView(card.dataset.target)));
    document.querySelectorAll('.back-btn, .brand-home').forEach((btn) => btn.addEventListener('click', () => showView('home')));

    const overlay = document.getElementById('settingsOverlay');
    const open = () => { overlay.hidden = false; document.getElementById('settingsClose').focus(); };
    const close = () => { overlay.hidden = true; };
    document.getElementById('settingsBtn').addEventListener('click', open);
    document.getElementById('settingsClose').addEventListener('click', close);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
    window.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!overlay.hidden) close();
        else showView('home');
    });

    document.getElementById('themeToggle').addEventListener('change', (event) => {
        prefs.theme = event.target.checked ? 'dark' : 'light';
        applyTheme();
    });
    document.querySelectorAll('input[name="lang"]').forEach((radio) => radio.addEventListener('change', () => {
        prefs.lang = radio.value;
        applyLanguage(api);
        onLanguage();
    }));

    applyTheme();
    applyLanguage(api);
}
