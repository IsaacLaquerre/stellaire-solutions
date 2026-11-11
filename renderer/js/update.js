// Update prompt: shown once an update is downloaded. "Later" hides it and
// shows an "Update now" button in the settings panel instead.

export function setupUpdates(api, { t }) {
    const overlay = document.getElementById('updateOverlay');
    const body = document.getElementById('updateBody');
    const link = document.getElementById('updateLink');
    const row = document.getElementById('updateRow');
    const rowHint = document.getElementById('updateRowHint');
    let pending = null;
    let postponed = false;

    function render() {
        if (!pending) return;
        body.textContent = t('updateBody', { version: pending.version });
        rowHint.textContent = t('updateNowHint', { version: pending.version });
        link.href = pending.url;
        overlay.hidden = postponed;
        row.hidden = !postponed;
    }

    function show(info) {
        if (!info || !info.version || pending) return;
        pending = info;
        render();
        if (!overlay.hidden) document.getElementById('updateRestart').focus();
    }

    const later = () => { postponed = true; render(); };
    document.getElementById('updateLater').addEventListener('click', later);
    document.getElementById('updateRestart').addEventListener('click', () => api.installUpdate());
    document.getElementById('updateNow').addEventListener('click', () => api.installUpdate());
    // Runs before the shell's Escape handler.
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !overlay.hidden) {
            event.stopImmediatePropagation();
            later();
        }
    });

    api.onUpdateReady(show);
    api.pendingUpdate().then(show, () => {});

    // Re-render the texts in the new language.
    return { refresh: render };
}
