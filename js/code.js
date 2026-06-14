/* ============================================================
   FRÖCCS — navbar, drawing grid, overlay
   ============================================================ */

const overlay        = document.getElementById('drawing-overlay');
const overlayDrawing = document.getElementById('overlay-drawing');
const overlayName    = document.getElementById('overlay-name');
const overlayType    = document.getElementById('overlay-type');
const overlayRatio   = document.getElementById('overlay-ratio');
const overlayDesc    = document.getElementById('overlay-desc');
const navbar         = document.getElementById('navbar');
const froccslist     = document.getElementById('froccslist');
const lines          = document.getElementById('lines');
const drawings       = document.querySelector('.drawings');

/* ============================================================
   NAVBAR — populate with fröccs names and toggle
   ============================================================ */

/* populate the list from drawing data attributes */
document.querySelectorAll('.drawing').forEach(drawing => {
    const link = document.createElement('a');
    link.textContent = drawing.dataset.name;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        drawing.closest('.drawing-item').click(); /* click the figure */
    });
    froccslist.appendChild(link);
});

/* toggle navbar and compact grid on lines button click */
lines.addEventListener('click', () => {
    const isOpen = navbar.style.display === 'flex';
    if (isOpen) {
        navbar.style.display = 'none';
        drawings.classList.remove('compact');
    } else {
        navbar.style.display = 'flex';
        drawings.classList.add('compact');
    }
});

/* close navbar when clicking outside or on empty navbar space */
document.addEventListener('click', e => {
    if (navbar.style.display !== 'flex') return;
    if (lines.contains(e.target)) return;

    /* allow clicks on child elements (links), close on background */
    if (navbar.contains(e.target) && e.target !== navbar) return;

    navbar.style.display = 'none';
    drawings.classList.remove('compact');
});

/* ============================================================
   DRAWING GRID — open overlay on figure click
   ============================================================ */

/* click on the figure so caption clicks work too */
document.querySelectorAll('.drawing-item').forEach(item => {
    item.addEventListener('click', () => {
        const drawing = item.querySelector('.drawing');
        const wine    = drawing.dataset.wine;
        const soda    = drawing.dataset.soda;

        overlayDrawing.src       = drawing.src;
        overlayName.textContent  = drawing.dataset.name;
        overlayType.textContent  = drawing.dataset.type;
        overlayRatio.textContent = `${wine} dl bor  ·  ${soda} dl szóda`;
        overlayDesc.textContent  = drawing.dataset.desc;

        overlay.style.display = 'flex';
        navbar.style.display  = 'none';       /* close navbar when overlay opens */
        drawings.classList.remove('compact'); /* restore grid when overlay opens */
    });
});

/* ============================================================
   OVERLAY — close on background click or escape
   ============================================================ */

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        overlay.style.display = 'none';
        navbar.style.display  = 'none';
        drawings.classList.remove('compact');
    }
});