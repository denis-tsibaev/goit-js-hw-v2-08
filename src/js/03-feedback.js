// Задание 3 - форма обратной связи
// В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей
// в локальное хранилище когда пользователь что - то печатает.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>
// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js.
// Разбей его на несколько подзадач:

// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище
// объект с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные
// данные, заполняй ими поля формы.В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями
// email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
// Для этого добавь в проект и используй библиотеку lodash.throttle.

// const throttle = require('lodash.throttle');
// const LOCAL_STORAGE_KEY = 'feedback-form-state';
// const refs = {
//   form: document.querySelector('.feedback-form'),
//   input: document.querySelector('.feedback-form input'),
//   textarea: document.querySelector('.feedback-form textarea'),
// };

// const formData = {};

// let savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
// const parsedFormData = JSON.parse(savedFormData);

// if (savedFormData) {
//   parsedFormData.email
//     ? (refs.input.value = parsedFormData.email)
//     : (refs.input.value = '');

//   parsedFormData.message
//     ? (refs.textarea.value = parsedFormData.message)
//     : (refs.textarea.value = '');
//   console.log(parsedFormData);
// }

// refs.form.addEventListener('input', e => {
//   const name = e.target.name;
//   const value = e.target.value;

//   formData[name] = value;
//   console.log(formData);
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
// });

// refs.form.addEventListener('submit', e => {
//   e.preventDefault();
//   e.currentTarget.reset();
//   localStorage.removeItem(LOCAL_STORAGE_KEY);
// });

// варик типа, у него  не забывает поля

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');

function fillFormFields() {
  let formInfoLS = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (formInfoLS) {
    formInfoLS = JSON.parse(formInfoLS);
    Object.entries(formInfoLS).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}
fillFormFields();

function onInputText(e) {
  let userInfoLS = localStorage.getItem(LOCAL_STORAGE_KEY);
  userInfoLS = userInfoLS ? JSON.parse(userInfoLS) : {};
  userInfoLS[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userInfoLS));
}

function onSubmit(e) {
  e.preventDefault();
  if (formEl.elements.message.value && formEl.elements.email.value) {
    console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    formEl.reset();
  }
}

const onInputTextThrottle = throttle(onInputText, 500);
const onSubmitThrottle = throttle(onSubmit, 500);

formEl.addEventListener('input', onInputTextThrottle);
formEl.addEventListener('submit', onSubmitThrottle);
