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

  let firstDelay = null;
  let delayWithStep = null;
 
  for (let i = 1; i <= amount; i += 1) {
    // console.log(i);
    firstDelay = delay;
    // console.log(delay);
    delayWithStep = firstDelay + step;
    console.log(delayWithStep);

    createPromise(i, delay)
      .then(({ position, delay }) => {
        
        Notify.success(`✅ Fulfilled promise ${position} in ${delayWithStep}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayWithStep}ms`);
      });

    formRef.reset();
  }
});
