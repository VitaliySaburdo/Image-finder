import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchName } from './js/fetchName';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn:document.querySelector(''),
}

refs.searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value;

  fetchName(searchQuery).then(data =>console.log(data))

}


function renderList(data) {
  const imageItem = data
    .map(({
        flags,
        name,
        capital,
        population,
        languages,
      }) => {
      `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
    })
    .join();
  cardsContainer.innerHTML = imageItem;
}
