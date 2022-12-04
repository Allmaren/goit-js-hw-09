import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  btn: document.querySelector('button'),
  form: document.querySelector('.form'),
};

const formData = { delay: 0, step: 0, amount: 0 };
refs.form.addEventListener('input', onDelayInput);

function onDelayInput(evt) {
  delayValue = refs.delay.value;
  // console.log(delayValue);
  newData = { [evt.target.name]: evt.target.value };
}

refs.btn.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  createPromise(position, delayValue);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success('✅ Fulfilled promise ${position} in ${delay}ms');
  } else {
    Notify.failure('❌ Rejected promise ${position} in ${delay}ms');
  }
}
