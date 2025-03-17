import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="delay"]');
const fulfBtn = document.querySelector('input[value="fulfilled"]');
const rejBtn = document.querySelector('input[value="rejected"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = +input.value;
  const isSuccess = fulfBtn.checked ? true : rejBtn.checked ? false : null;

  if (!delay || !isSuccess) {
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot important data',
    });
    return;
  }

  createPromise(delay, isSuccess)
    .then(value => iziToast.success({ title: 'Success', message: value }))
    .catch(error => iziToast.error({ title: 'Error', message: error }));
}

function createPromise(delay, isSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
