const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', e => {
  console.log(e.target.nodeName, e.target.value);
});
