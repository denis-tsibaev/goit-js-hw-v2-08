// Задание 1 - библиотека SimpleLightbox
// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js.
// Разбей его на несколько подзадач:

// 1. Добавь библиотеку SimpleLightbox как зависимость проекта используя npm
// (ссылка на CDN из твоей прошлой работы больше не нужна).
// 2. Используй свой JavaScript код из предыдущей домашней работы, но выполни
// рефакторинг с учетом того, что библиотека была установлена через npm
// (синтаксис import /export).

// Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить
// еще один импорт, кроме того который описан в документации.

// Описан в документации:
// import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей:
// import 'simplelightbox/dist/simple-lightbox.min.css';

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
