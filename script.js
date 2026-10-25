'use strict';
const filterButtons = document.querySelectorAll('[data-filter]');
const publications = [...document.querySelectorAll('.publication')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  publications.forEach(item => { item.hidden = filter !== 'all' && item.dataset.status !== filter; });
  const count = publications.filter(item => !item.hidden).length;
  document.querySelector('#publication-count').textContent = `Showing ${count} publications`;
}));
if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-5% 0px -65% 0px', threshold: 0});
  document.querySelectorAll('main>.section').forEach(section => observer.observe(section));
}
