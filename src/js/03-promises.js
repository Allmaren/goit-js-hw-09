import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  // delay: document.querySelector('input[name=delay]'),
  // step: document.querySelector('input[name=step]'),
  // amount: document.querySelector('input[name=amount]'),
  // btn: document.querySelector('button'),
  form: document.querySelector('.form'),
};

let timeId = null;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  clearTimeout(timeId);

  const { delay, step, amount } = evt.target.elements;

  let stepValue = Number(delay.value);
  /*перевірка на нуль і менше*/
  if (delay.value < 1 || step.value < 1 || amount.value < 1) {
    Notify.warning(`All values must be greater than zero`);
    return;
  }
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, stepValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise #${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise #${position} in ${delay}ms`);
      });
    stepValue += Number(step.value);
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timeId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
