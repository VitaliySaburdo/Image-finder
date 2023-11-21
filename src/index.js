import apiService from './js/apiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './js/getRefs';
import { renderList } from './js/renderCards';
import { LoadMoreBtn } from './js/loadMoreBtn';
import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const newApiService = new apiService();

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const loadMoreBtn = new LoadMoreBtn({
  selector: refs.loadMoreBtn,
});

loadMoreBtn.hide();

async function onSearchForm(evt) {
  evt.preventDefault();

  refs.cardsContainer.innerHTML = '';

  newApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (newApiService.query === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  newApiService.resetPage();

  try {
    const data = await newApiService.fetchSearchQuery();
    if (data.hits.length === 0) {
      refs.cardsContainer.innerHTML = '';
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderList(data);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      setTimeout(() => {
        loadMoreBtn.show();
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    loadMoreBtn.disabled();
    const data = await newApiService.fetchSearchQuery();
    renderList(data);
    const totalPages = Math.ceil(data.totalHits / newApiService.per_page);
    if (totalPages === newApiService.page - 1) {
      loadMoreBtn.hide();
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    }
    smoothScroll();
  } catch (error) {
    console.log(error);
  } finally {
    loadMoreBtn.enabled();
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.cardsContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
