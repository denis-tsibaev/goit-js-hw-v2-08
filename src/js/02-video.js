// Задание 2 - видео плеер
// В HTML есть <iframe> с видео для Vimeo плеера.
// Напиши скрипт который будет сохранять текущее время воспроизведения видео
// в локальное хранилище и, при перезагрузке страницы, продолжать воспроизводить
// видео с этого времени.

// <iframe
//   id="vimeo-player"
//   src="https://player.vimeo.com/video/236203659"
//   width="640"
//   height="360"
//   frameborder="0"
//   allowfullscreen
//   allow="autoplay; encrypted-media"
// ></iframe>

// Выполняй это задание в файлах 02-video.html и 02-video.js.
// Разбей его на несколько подзадач:

// 1. Ознакомься с документацией библиотеки Vimeo плеера.
// 2. Добавь библиотеку как зависимость проекта через npm.
// 3. Инициализируй плеер в файле скрипта как это описано в секции pre-existing player,
// но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
// 4. Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление
// времени воспроизведения.
// 5. Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища
// будет строка "videoplayer-current-time".
// 6. При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы
// возобновить воспроизведение с сохраненной позиции.
// 7. Добавь в проект бибилотеку lodash.throttle и сделай так, чтобы время воспроизведения
// обновлялось в хранилище не чаще чем раз в секунду.

import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onTimeupdateThrottle = throttle(onTimeupdate, 1000);

function onTimeupdate(data) {
  const stringifyTimeupdate = JSON.stringify(data);
  localStorage.setItem('videoplayer-current-time', stringifyTimeupdate);
}

player.on('timeupdate', onTimeupdateThrottle);

try {
  let currentTimeLastView = localStorage.getItem('videoplayer-current-time');

  if (currentTimeLastView !== null) {
    currentTimeLastView = JSON.parse(currentTimeLastView);
    const currentSecondLastView = currentTimeLastView.seconds;

    player.setCurrentTime(currentSecondLastView);
  }
} catch (error) {
  console.log(error.message);
}
