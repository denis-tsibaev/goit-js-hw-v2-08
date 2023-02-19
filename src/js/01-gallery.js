// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryEl = document.querySelector('.gallery');

galleryItems.map(item => {
  galleryEl.insertAdjacentHTML(
    'beforeend',
    `
	<a class="gallery__item" href="${item.original}">
		<img class="gallery__image"
		src="${item.preview}"
		alt="${item.description}"
		 />
	</a>
	`
  );
  console.log(item.description);
});

new SimpleLightbox('.gallery a', {
  maxZoom: 1.2,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
});
