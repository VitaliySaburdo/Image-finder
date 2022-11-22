import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';



function ringsApi() {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '31530619-c8ff0ea55f4ca3c44478c1e7e';
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(resp => {
    if (!resp.ok) {
    throw new Error(resp.statusText)
    }
  return resp.json()}).then(data => console.log(data))
}

// Your API key: 31530619-c8ff0ea55f4ca3c44478c1e7e

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
