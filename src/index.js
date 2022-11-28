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

const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearchForm(evt) {
  evt.preventDefault();
  refs.cardsContainer.innerHTML = '';
  newsApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
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
        refs.cardsContainer.innerHTML = '';
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderList(data);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(err => console.log(err));
}

function onLoadMore() {
  newsApiService.fetchName().then(data => {
    const total = Math.ceil(data.totalHits / newsApiService.per_page);
    if (total === newsApiService.page - 1) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    } else {
      renderList(data);
    }
  });
  smoothScroll();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function renderList(data) {
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
    <span>${likes}</span>
    </p>
    <p class="info-item">
    <b>Views</b>
    <span>${views}</span>
    </p>
    <p class="info-item">
    <b>Comments</b>
    <span>${comments}</span>
    </p>
    <p class="info-item">
    <b>Downloads</b>
    <span>${downloads}</span>
    </p>
  </div>
  </a>
</div>`
    )
    .join('');
  refs.cardsContainer.insertAdjacentHTML('beforeend', markupGallery);
  gallery.refresh();
}
