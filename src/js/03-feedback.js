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

const throttle = require('lodash.throttle');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);

fillFormFields();

function fillFormFields() {
  if (savedFormData) {
    console.log('savedFormData: string: ', savedFormData);
    Object.entries(JSON.parse(savedFormData)).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}

refs.form.addEventListener('input', throttle(onLocalStorageSetItem, 500));

function onLocalStorageSetItem(e) {
  let formData = {};

  if (savedFormData) {
    formData = JSON.parse(savedFormData);
  }

  formData[e.target.name] = e.target.value;
  console.log('formData from input: ', formData);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
