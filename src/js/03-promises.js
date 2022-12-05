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

  /*може через об`єкт?*/
  // const formData = { delay: 0, step: 0, amount: 0 };
  const formData = ({ delay, step, amount } = evt.target.elements);

  let stepValue = Number(formData.delay.value);
  /*перевірка на нуль і менше*/
  if (
    formData.delay.value < 1 ||
    formData.step.value < 1 ||
    formData.amount.value < 1
  ) {
    Notify.warning(`All values must be greater than zero`);
    return;
  }
  for (let i = 1; i <= formData.amount.value; i += 1) {
    createPromise(i, stepValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise #${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise #${position} in ${delay}ms`);
      });
    stepValue += Number(formData.step.value);
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
