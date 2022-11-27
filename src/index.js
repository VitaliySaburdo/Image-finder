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

refs.loadMoreBtn.classList.add('is-hidden');

const newsApiService = new NewsApiService();

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearchForm(evt) {
  evt.preventDefault();
  refs.cardsContainer.innerHTML = '';
  newsApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  newsApiService.resetPage();
  newsApiService
    .fetchName()
    .then(data => {
      if (data.hits.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderList(data);
        Notify.success('Hooray! We found totalHits images.');
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(err => onFetchError(err));
}

function onLoadMore() {
  newsApiService.fetchName().then(renderList);
}

function onFetchError() {
  cardsContainer.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
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
  <img src="${webformatURL}" alt="${tags}" class = "gallery__img" 
             loading="lazy" />
  <div class="info">
    <p class="info-item">
    <b>Likes</b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
    <b>Views</b>
      <b>${views}</b>
    </p>
    <p class="info-item">
    <b>Comments</b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads</b>
      <b>${downloads}</b>
    </p>
  </div>
  </a>
</div>`
    )
    .join('');
  refs.cardsContainer.insertAdjacentHTML('beforeend', markupGallery);
  gallery.refresh();
}
