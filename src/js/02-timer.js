import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.setAttribute('disabled', true);
let calendarDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    calendarDate = selectedDates[0];
    console.log(calendarDate);
    
    const startTime = new Date();

    if (calendarDate - startTime > 0) {
      refs.startButton.removeAttribute('disabled');
    } else {
      refs.startButton.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('input#datetime-picker', options);

const countdown = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      console.log(currentTime);
      const deadlineDate = calendarDate;
      const deltaTime = deadlineDate - currentTime;
      refs.startButton.setAttribute('disabled', true);
      const time = convertMs(deltaTime);
      updateTimerFace(time);

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
        return;
      }
      updateTimerFace(time);
    }, 1000);
  },
};

refs.startButton.addEventListener('click', () => {
  countdown.start();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
