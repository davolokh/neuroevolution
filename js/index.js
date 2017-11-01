import { Game } from './FlappyBird/Game';

const loadImages = (sources, callback) => {
  let nb = 0;
  let loaded = 0;
  const imgs = {};
  for (const i in sources) {
    nb++;
    imgs[i] = new Image();
    imgs[i].src = sources[i];
    imgs[i].onload = () => { // eslint-disable-line
      loaded++;
      if (loaded === nb) {
        callback(imgs);
      }
    };
  }
};

window.onload = () => {
  const sprites = {
    bird: './img/bird.png',
    background: './img/background.png',
    pipetop: './img/pipetop.png',
    pipebottom: './img/pipebottom.png',
  };

  const start = (imgs) => {
    const game = new Game(imgs);
    game.start();
    game.update();
    game.display();
  };


  loadImages(sprites, imgs => start(imgs));
};


const timeouts = [];
const messageName = 'zero-timeout-message';

function setZeroTimeout(fn) {
  timeouts.push(fn);
  window.postMessage(messageName, '*');
}

function handleMessage(event) {
  if (event.source === window && event.data === messageName) {
    event.stopPropagation();
    if (timeouts.length > 0) {
      const fn = timeouts.shift();
      fn();
    }
  }
}

window.addEventListener('message', handleMessage, true);

window.setZeroTimeout = setZeroTimeout;

window.FPS = 60;
window.speed = (fps) => {
  window.FPS = parseInt(fps, 10);
};
