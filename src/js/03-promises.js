function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', () => {
  createPromise();
})

const isSuccess = true;
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
   resolve('Success');
    } else {
     reject('Ooops'); 
  }
}, 1000)
})

promise.then().catch();