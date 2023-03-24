import { Notify } from 'notiflix/build/notiflix-notify-aio';

formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener('submit', event => {
  event.preventDefault();

  const formInputs = event.currentTarget.elements;
  const delay = Number(formInputs.delay.value);
  const step = Number(formInputs.step.value);
  const amount = Number(formInputs.amount.value);

  let firstDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    formRef.reset();
    firstDelay += step;
  }
});
