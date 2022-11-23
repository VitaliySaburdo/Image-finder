import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService  from './js/fetchName'

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn:document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

const newsApiService = new NewsApiService();
console.log(newsApiService)

function onSearchForm(evt) {
  evt.preventDefault();
  newsApiService.query = evt.currentTarget.elements.searchQuery.value;
  
  newsApiService.fetchName();
}

function onLoadMore() {
  newsApiService.fetchName();
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
