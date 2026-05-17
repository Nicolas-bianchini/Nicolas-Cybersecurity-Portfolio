document.querySelectorAll('#year').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });
}

(() => {
  const switcher = document.querySelector('#situations .sp-switcher');
  const previewTargets = document.querySelectorAll('#situations .sp-preview iframe, #situations .sp-preview object');

  previewTargets.forEach((target) => {
    const sourceAttr = target.tagName === 'OBJECT' ? 'data' : 'src';
    const rawSrc = target.getAttribute(sourceAttr);
    if (!rawSrc) return;
    const cleanSrc = rawSrc.split('#')[0];
    if (cleanSrc.startsWith('URL_')) {
      const preview = target.closest('.sp-preview');
      if (preview) {
        preview.innerHTML = '<span class="sp-preview-fallback sp-missing-doc">Document &agrave; ajouter</span>';
      }
      return;
    }
    const encodedSrc = encodeURI(cleanSrc).replace(/'/g, '%27');
    target.setAttribute(sourceAttr, `${encodedSrc}#page=1&zoom=page-fit&toolbar=0&navpanes=0`);

    const fallbackLink = target.querySelector('.sp-preview-fallback');
    if (fallbackLink) {
      fallbackLink.setAttribute('href', encodedSrc);
    }
  });

  document.querySelectorAll('#situations a[href^="URL_"]').forEach((link) => {
    link.removeAttribute('href');
    link.removeAttribute('target');
    link.classList.add('sp-missing-doc');
    link.textContent = 'Document a ajouter';
  });

  if (!switcher) return;

  const buttons = switcher.querySelectorAll('.sp-filter');
  const cards = document.querySelectorAll('#missionsGrid .sp-card');

  const applyFilter = (filter) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter || card.dataset.year === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  applyFilter('all');
})();
