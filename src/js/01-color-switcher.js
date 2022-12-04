function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.body,
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', onStartColor);
refs.stop.addEventListener('click', onStopColor);

let timerId;

function onStartColor() {
  refs.stop.removeAttribute('disabled');
  refs.start.setAttribute('disabled', true);
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopColor() {
  refs.stop.setAttribute('disabled', true);
  refs.start.removeAttribute('disabled');
  clearInterval(timerId);
}
