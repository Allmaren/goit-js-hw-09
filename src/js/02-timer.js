import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  start: document.querySelector('[data-start]'),
};

refs.start.setAttribute('disabled', true);
const DATE_NOW = new Date();
const INTERVAL = 1000;
let timeId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: DATE_NOW,
  minuteIncrement: 1,
  onClose(selectedDate) {
    validDate(selectedDate[0]);
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function validDate(selectedDate) {
  if (selectedDate <= DATE_NOW) {
    Notify.failure('Please choose a date in the future');
    refs.start.setAttribute('disabled', true);
  } else {
    onStartTimer(selectedDate);
    refs.start.removeAttribute('disabled');
  }
}

function onStartTimer(selectedDates) {
  let timerInMs = Date.parse(selectedDates) - DATE_NOW;
  let objTimerValue = convertMs(timerInMs);

  refs.start.addEventListener('click', () => {
    refs.start.setAttribute('disabled', true);
    timeId = setInterval(() => {
      if (timerInMs <= 0) {
        clearInterval(timeId);
        return;
      }
      objTimerValue = convertMs(timerInMs);
      refs.days.textContent = addLeadingZero(objTimerValue.days);
      refs.hours.textContent = addLeadingZero(objTimerValue.hours);
      refs.minutes.textContent = addLeadingZero(objTimerValue.minutes);
      refs.seconds.textContent = addLeadingZero(objTimerValue.seconds);
      timerInMs -= INTERVAL;
    }, INTERVAL);

    // console.log(convertMs(Date.parse(selectedDates) - DATE_NOW));
  });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
