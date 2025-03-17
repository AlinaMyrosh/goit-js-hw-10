import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

start.addEventListener('click', startTimer);

let userSelectedDate = null;
start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      return;
    } else {
      start.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  input.disabled = true;
  start.disabled = true;
  const timerID = setInterval(() => {
    const delta = userSelectedDate.getTime() - Date.now();

    if (delta <= 0) {
      input.disabled = false;
      clearInterval(timerID);
    } else {
      const result = convertMs(delta);
      setTimer(result);
    }
  }, 1000);
}

function setTimer({ days, hours, minutes, seconds }) {
  daysValue.textContent = `${days}`;
  hoursValue.textContent = `${hours}`;
  minutesValue.textContent = `${minutes}`;
  secondsValue.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
