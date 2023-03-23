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

let calendarDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // minDate: Date.now(),
  onClose(selectedDates) {
    calendarDate = selectedDates[0];
    console.log(calendarDate);
  },
};

flatpickr('input#datetime-picker', options);

const countdown = {
  isActive: false,
  start() {
    //   const startTime = options.defaultDate;
    //   console.log(startTime);
    //   if (calendarDate < startTime) {
    //     refs.startButton.setAttribute('disabled', true)
    //  }

    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      console.log(currentTime);
      const deadlineDate = calendarDate;
      const deltaTime = deadlineDate - currentTime;

      // const { days, hours, minutes, seconds } = convertMs(deltaTime);
      const time = convertMs(deltaTime);
      // updateTimerFace({ days, hours, minutes, seconds });
      updateTimerFace(time);

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
      }
    }, 1000);
  },
};

refs.startButton.addEventListener('click', () => {
//  countdown.start();

  const startTime = options.defaultDate;
  console.log(startTime);
  if (calendarDate <= startTime) {
    refs.startButton.setAttribute('disabled', true);
    window.alert("Please choose a date in the future");
  } else {
     countdown.start();
  }
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
