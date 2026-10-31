'use strict';
function matches(text, category, query, selected) {
  return (selected === 'All' || category === selected) && text.toLowerCase().includes(query.trim().toLowerCase());
}
if (typeof document !== 'undefined') {
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  const cards = Array.from(document.querySelectorAll('#cards article'));
  function update() {
    let visible = 0;
    for (const card of cards) {
      card.hidden = !matches(card.textContent, card.dataset.category, search.value, category.value);
      if (!card.hidden) visible++;
    }
    document.querySelector('#count').textContent = `${visible} of ${cards.length} listings`;
    document.querySelector('#empty').hidden = visible !== 0;
  }
  search.addEventListener('input', update);
  category.addEventListener('change', update);
  document.querySelector('#reset').addEventListener('click', () => {
    search.value = '';
    category.value = 'All';
    update();
    search.focus();
  });
  // News anchors must reveal their target even when a previous filter hid it.
  function revealHash() {
    const card = cards.find(item => `#${item.id}` === window.location.hash);
    if (card && card.hidden) {
      search.value = '';
      category.value = 'All';
      update();
      card.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', revealHash);
  update();
  revealHash();
}
if (typeof module !== 'undefined') module.exports = {matches};
