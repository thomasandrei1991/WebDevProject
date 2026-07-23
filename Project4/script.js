function applyMode(isDark, btn) {
    document.body.classList.toggle("dark-mode", isDark);
    if (btn) btn.textContent = isDark ? "Light Mode" : "Dark Mode";
}

function toggleDarkMode(event) {
    const btn = event.currentTarget;
    const isDark = !document.body.classList.contains('dark-mode');

    // add temporary transition class so the change animates
    const DURATION = 600; // ms (match CSS)
    document.body.classList.add('theme-transition');
    applyMode(isDark, btn);
    try {
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    } catch (e) {
        // ignore storage errors
    }

    window.setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, DURATION + 20);
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.changeToDark');
    const stored = (() => {
        try { return localStorage.getItem('darkMode'); } catch (e) { return null; }
    })();

    if (stored !== null) {
        applyMode(stored === 'true', btn);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyMode(true, btn);
    }

    if (btn) {
        btn.addEventListener('click', toggleDarkMode);
    }
});