import { getRefs } from './getRefs';
import { gallery } from './searchQuerySettings';

const refs = getRefs();

export function renderList(data) {
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
