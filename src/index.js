import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './js/refs';
import { renderList } from './js/renderCards';
import apiService from './js/api-service';

const newApiService = new apiService();

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.classList.add('is-hidden');

function onSearchForm(evt) {
  evt.preventDefault();

  refs.cardsContainer.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');

  newApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (newApiService.query === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  newApiService.resetPage();
  newApiService
    .fetchSearchQuery()
    .then(data => {
      if (data.hits.length === 0) {
        refs.cardsContainer.innerHTML = '';
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderList(data);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        setTimeout(() => {
          refs.loadMoreBtn.classList.remove('is-hidden');
        }, 500);
      }
    })
    .catch(err => console.log(err));
}

function onLoadMore() {
  newApiService.fetchName().then(data => {
    renderList(data);
    const totalPages = Math.ceil(data.totalHits / newApiService.per_page);
    if (totalPages === newApiService.page - 1) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    }

    smoothScroll();
  });
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.cardsContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
