import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './js/fetchName';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  cardsContainer: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();

new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearchForm(evt) {
  evt.preventDefault();
  newsApiService.query = evt.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchName().then(renderList);
}

function onLoadMore() {
  newsApiService.fetchName().then(renderList);
}

function renderList(data) {
  console.log(data.hits);
  const markupGallery = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => 
        `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
  </a>
</div>`).join('');
  refs.cardsContainer.insertAdjacentHTML('beforeend', markupGallery);
}
