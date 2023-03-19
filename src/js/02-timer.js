import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  // datetimePicker: document.querySelector('input#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
console.log(refs.timevalue);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('input#datetime-picker', options);

const countdown = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    // console.log(startTime);
     this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deadline = new Date('March 19, 2023 23:23:00').getTime();
      const deltaTime = deadline - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimerFace({ days, hours, minutes, seconds });
    
          if(deltaTime <= 0) {
           clearInterval(this.intervalId);
      }
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

