import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onTimeupdateThrottle = throttle(onTimeupdate, 1000);

function onTimeupdate(e) {
  const stringifyTimeupdate = JSON.stringify(e);
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
} catch (err) {
  console.log(err);
}
