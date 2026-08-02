const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
const lightboxClose = document.getElementById('lightboxClose');

let lastFocused = null;

function getFocusable() {
  return lightbox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
}

document.querySelectorAll('.sel-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lastFocused = btn;
    lightboxImg.src = btn.getAttribute('data-full');
    lightboxImg.alt = btn.getAttribute('data-title') || '';
    lightboxCap.textContent = btn.getAttribute('data-title') || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.removeAttribute('src');
  if (lastFocused) lastFocused.focus();
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'Escape') {
    closeLightbox();
    return;
  }

  // trap Tab focus inside the lightbox while it's open
  if (e.key === 'Tab') {
    const focusable = Array.from(getFocusable());
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
