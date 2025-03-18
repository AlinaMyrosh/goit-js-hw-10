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

  if (!delay || !(fulfBtn.checked || rejBtn.checked)) {
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot important data',
    });
    return;
  }

  createPromise(delay, isSuccess)
    .then(value =>
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${value}ms`,
      })
    )
    .catch(value =>
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${value}ms`,
      })
    );
}

function createPromise(delay, isSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
