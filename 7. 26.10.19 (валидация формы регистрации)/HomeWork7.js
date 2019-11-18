"use strict";

// (!) Перед проверкой скачайте, плиз, все вложенные файлы - они влияют на отображение верстки

// валидация имени
// проверка на ошибку и выброс инфы о ней
let name = document.getElementById("name_field");
let msgName = document.getElementById("msg_name");

// эта переменная для финальной проверки валидности полей при отправке формы (у других полей тоже такая будет)
let nameValid = true;

name.onblur = function() {

  // в регулярке указываем русский алфавит и английский с указанием, что без разницы регистр
  let reg = /^[A-ZА-ЯЁ]+$/gi;
  if(!reg.test(name.value)) {

    // выбрасываем инфу об ошибке
    name.classList.add("mistake");
    msgName.classList.add("error");
    msgName.innerHTML = "Введено невозможное имя";
    nameValid = false;
  }
};

// удаление инфы об ошибке на время редактирования
name.onfocus = function() {

  // пользователь вернулся в поле исправить ошибку
  if (name.classList.contains("mistake")) {

    // удаляем индикатор ошибки пока пользователь реадактирует поле
    name.classList.remove("mistake");
    msgName.classList.remove("error");
    msgName.innerHTML = "";
    nameValid = true;
  }
};



// валидация фамилии
let surname = document.getElementById("surname_field");
let msgSurname = document.getElementById("msg_surname");
let surnameValid = true;

surname.onblur = function() {

  let reg = /^[A-ZА-ЯЁ]+$/gi;

  if(!reg.test(surname.value)) {
    surname.classList.add("mistake");
    msgSurname.classList.add("error");
    msgSurname.innerHTML = "Введена неверная фамилия";
    surnameValid = false;
  }
};

surname.onfocus = function() {
  if (surname.classList.contains("mistake")) {
    surname.classList.remove("mistake");
    msgSurname.classList.remove("error");
    msgSurname.innerHTML = "";
    surnameValid = true;
  }
};



// валидация языка программирования - будет ниже, при отправке формы. Здесь только определим переменные
let checkSelect = document.getElementById("select_it_lang");
let msgLang = document.getElementById("msg_lang");
let finalCheckSelect = true;



// валидация даты рождения
//это официальный спонсор моей двухдневной бессоницы. Сорри за 60-этажный код, но решения из сети мне показались непонятными, решил реализовать свою логику
let dateBirth = document.getElementById("date_of_birth");
let msgBirth = document.getElementById("msg_birth");
let birthValid = true;

dateBirth.onblur = function() {
  let currentDate = new Date();
  // через slice получим строки YYYY MM DD
  let year = dateBirth.value.slice(0, 4);
  let month = dateBirth.value.slice(5, 7);
  let day = dateBirth.value.slice(8);

  // проверка на ввод нечисловых данных
  if(isNaN(+year) || isNaN(+month) || isNaN(+day)) {
    birthValid = false;
  }
  
  // проверка на длину введенного значения
  if (dateBirth.value.length !== 10) {
    birthValid = false;
  }
  if (dateBirth.value[4] !== "." || dateBirth.value[7] !== ".") {
    birthValid = false;
  }
  // убедимся, что год не более текущего 
  //(проверка на текущий год, месяц и день, считаю, нужны. Например, вдруг регистрируют новорожденного на сайте больницы. Конечно, это не соотносится с такими полями, как "язык программирования", но все же)
  if (+year > currentDate.getFullYear()) { //
    birthValid = false;
  }
  // если год указан текущий, то надо убедиться, что месяц не более текущего
  if ( (+year === currentDate.getFullYear()) && +month > (currentDate.getMonth() + 1) ) {
    birthValid = false;
  }
  // если год и месяц указаны текущие, то убедимся, что дата не более текущей
  if ( ( (+year === currentDate.getFullYear()) &&
        +month === (currentDate.getMonth() + 1) ) &&
        +day > currentDate.getDate()) {
          birthValid = false;
        }

  // далее проверки на количество месяцев и дней в них (на минимальный год проверку не ставил условия умышленно)
  if (+month < 1 || +day < 1) {
    birthValid = false;
  }
  if(+month > 12) {
    birthValid = false;
  }
  if ( (+month === 1 || +month === 3 || +month === 5 ||
      +month === 7 || +month === 8 || +month === 10 ||
      +month === 12) && +day > 31) {
        birthValid = false;
      }
  if ( (+month === 4 || +month === 6 || +month === 9 ||
    +month === 11) && +day > 30) {
      birthValid = false;
    }
  if( (+month === 2) && +day > 29) {
    birthValid = false;
  }
  // сообщение об ошибке
  if (birthValid === false) {
    dateBirth.classList.add("mistake");
    msgBirth.classList.add("error");
    msgBirth.innerHTML = "Введена неверная дата";
  }
};

dateBirth.onfocus = function() {
  if (dateBirth.classList.contains("mistake")) {
    dateBirth.classList.remove("mistake");
    msgBirth.classList.remove("error");
    msgBirth.innerHTML = "";
    birthValid = true;
  }
};



// валидация гендера
let checkRadio = document.querySelectorAll('input[name="gender"]');
let containerRadio = document.getElementById("container_radio");
let msgGender = document.getElementById("msg_gender");
let finalCheckRadio = false;

// вся валидация гендера сводится к тому, что при выборе одного из input radio, запускается функция, которая меняет значение у итоговой переменной, участвующей в финальной проверке при отправке формы. Ошибки будут описаны в функции отправки формы
function chooseGender() {
  finalCheckRadio = true;
  containerRadio.classList.remove("mistake");
  msgGender.classList.remove("error");
  msgGender.innerHTML = "";
}



// валидация e-mail
let mail = document.getElementById("email");
let msgEmail = document.getElementById("msg_email");
let mailValid = true;

mail.onblur = function() {

    /* регулярки по e-mail уже не использовал, указал более простое решение,
    хотя в том же учебнике есть следующий вариант: "/[-.\w]+@([\w-]+\.)+[\w-]+/g"
    но на мой взгляд они идентичны, ведь если Клиент захочет написать бред - никакая регулярка все равно не спасет */
    if (!mail.value.includes("@") || !mail.value.includes(".")) {
      mail.classList.add("mistake");
      msgEmail.classList.add("error");
      msgEmail.innerHTML = "Введен неверный e-mail";
      mailValid = false;
    }
  };
  
  mail.onfocus = function() {
    if (mail.classList.contains("mistake")) {
      mail.classList.remove("mistake");
      msgEmail.innerHTML = "";
      mailValid = true;
    }
  };



// валидация пароля
// пароль может быть любым, поэтому только стилизую и защищаю его занесение. Факт его наличия проверю ниже, при отправке формы
let pass = document.getElementById("password");
let msgPass = document.getElementById("msg_pass");



// валидация подтвержения пароля 
let repeatPass = document.getElementById("repeat_password");
let msgRepeatPass = document.getElementById("msg_repeat_pass");
let passRepeatValid = true;

repeatPass.onblur = function() {
    if (pass.value !== repeatPass.value) {
        repeatPass.classList.add("mistake");
        msgRepeatPass.classList.add("error");
        msgRepeatPass.innerHTML = "Пароли не совпадают";
        passRepeatValid = false;
    } 
};

repeatPass.onfocus = function() {
    if (repeatPass.classList.contains('mistake') || pass.value === "") {
      repeatPass.classList.remove("mistake");
      msgRepeatPass.innerHTML = "";
      passRepeatValid = true;
    }
};



// ПРОВЕРКА ФОРМЫ (В ТОМ ЧИСЛЕ НА ЗАПОЛНЕННОСТЬ И ОТКАЗ В ПРИНЯТИИ ПРИ ОШИБКАХ В ПОЛЯХ)

function checkFill() {

  // проверка на заполненность графы "имя"
  if (name.value === "") {
      name.classList.add("mistake");
      msgName.classList.add("error");
      msgName.innerHTML = "Не введено имя";
  }

  // проверка на заполненность графы "фамилия"
  if (surname.value === "") {
      surname.classList.add("mistake");
      msgSurname.classList.add("error");
      msgSurname.innerHTML = "Не введена фамилия";
  }

  // проверка выбрано ли что-то в "языки программирования"
  if (!checkSelect.value) {
      checkSelect.classList.add("mistake");
      msgLang.classList.add("error");
      msgLang.innerHTML = "Не выбран язык";
      finalCheckSelect = false;
  } 
  checkSelect.onfocus = function() {
    if (checkSelect.classList.contains("mistake")) {
      checkSelect.classList.remove("mistake");
      msgLang.innerHTML = "";
      finalCheckSelect = true;
    }
  };

  // проверка на заполненность "дата рождения"
  if (dateBirth.value === "") {
      dateBirth.classList.add("mistake");
      msgBirth.classList.add("error");
      msgBirth.innerHTML = "Не введена дата рождения";
  }
  
  // проверка на заполненность "пол"
  if (finalCheckRadio === false) {
      containerRadio.classList.add("mistake");
      msgGender.classList.add("error");
      msgGender.innerHTML = "Не выбран пол";
      finalCheckRadio = false;
  }

  // проверка на заполненность "email"
  if (mail.value === "") {
      mail.classList.add("mistake");
      msgEmail.classList.add("error");
      msgEmail.innerHTML = "Не введена почта";
  }

  // проверка на заполненность "пароль"
  if (pass.value === "") {
      pass.classList.add("mistake");
      msgPass.classList.add("error");
      msgPass.innerHTML = "Не задан пароль";
  }

  pass.onfocus = function() {
    if (pass.classList.contains('mistake')) {
        pass.classList.remove("mistake");
        msgPass.innerHTML = "";
    }
  };

  // проверка на заполненность "подтверждение пароля"
  if (repeatPass.value === "") {
      repeatPass.classList.add("mistake");
      msgRepeatPass.classList.add("error");
      msgRepeatPass.innerHTML = "Пароль не подтвержден";
  }

  repeatPass.onfocus = function() {
    if (repeatPass.classList.contains('mistake')) {
        repeatPass.classList.remove("mistake");
        msgRepeatPass.innerHTML = "";
    }
  };

  //повторная проверка совпадений паролей. Это важно, ибо если ввести верное подтверждение пароля, а после убрать с этого поля фокус и сразу заменить исходный пароль - вышестоящая функция уже не даст false при проверке паролей (но они будут разные)
  if (pass.value !== repeatPass.value) {
      repeatPass.classList.add("mistake");
      msgRepeatPass.classList.add("error");
      msgRepeatPass.innerHTML = "Пароли не совпадают";
      passRepeatValid = false;
  } else {
      passRepeatValid = true;
  }



  // финальные итоги - объединяем все выходные даные: если что-то не заполнено или в полях есть неисправленные ошибки, то выдаст false и не отправит форму
  if (name.value === "" ||
      surname.value === "" ||
      dateBirth.value === "" ||
      mail.value === "" ||
      pass.value === "" ||
      // теперь пошли проверки на правильность заполнения Valid) {
      nameValid === false ||
      surnameValid === false ||
      finalCheckSelect === false ||
      birthValid === false ||
      finalCheckRadio === false ||
      mailValid === false ||
      passRepeatValid === false) {
        return;
      }

    // если все Ок и мы не получили return, то вызываем функции вызова модального окна и блокировки полей 
    openModal();
    blockForm();
}



//МОДАЛЬНОЕ ОКНО

// функция открытия модального окна
let modalWindow = document.getElementById("modal");
let backFon = document.createElement("div"); // создаем div на задний затемненный фон (при закрытии окна - удалим)

function openModal() {
    modalWindow.classList.add("visible");
    backFon.classList.add("shadow");
    document.body.append(backFon);
  }

// функция для закрытия модального окна
function closeModal() {
    modalWindow.classList.remove("visible");
    backFon.classList.remove("shadow");
    backFon.parentNode.removeChild(backFon);
}



// БЛОКИРОВКА И РАЗБЛОКИРОВКА ПОЛЕЙ

// блокировка полей в случае успешной отправки формы
function blockForm() {
    msgName.classList.add("accept");
    msgName.innerHTML = "Принято. Защищено";
    name.setAttribute("readonly", 1);

    msgSurname.classList.add("accept");
    msgSurname.innerHTML = "Принято. Защищено";
    surname.setAttribute("readonly", 1);

    msgLang.classList.add("accept");
    msgLang.innerHTML = "Принято. Защищено";
    checkSelect.disabled = true;

    msgBirth.classList.add("accept");
    msgBirth.innerHTML = "Принято. Защищено";
    dateBirth.setAttribute("readonly", 1);

    msgGender.classList.add("accept");
    msgGender.innerHTML = "Принято. Защищено";
    // а вот здесь придется добавить атрибут disabled для каждого input
    for (let i = 0; i < checkRadio.length; i++) {
      checkRadio[i].disabled = true;
    }

    msgEmail.classList.add("accept");
    msgEmail.innerHTML = "Принято. Защищено";
    mail.setAttribute("readonly", 1);

    msgPass.classList.add("accept");
    msgPass.innerHTML = "Принято. Защищено";
    pass.setAttribute("readonly", 1);

    msgRepeatPass.classList.add("accept");
    msgRepeatPass.innerHTML = "Принято. Защищено";
    repeatPass.setAttribute("readonly", 1);
}

// функция для разблокировки полей после успешной отправки формы на случай, если Клиенту потребуется провести еще одну регистрацию
function editForm() {
    msgName.classList.remove("accept");
    msgName.innerHTML = "";
    name.removeAttribute("readonly", 1);

    msgSurname.classList.remove("accept");
    msgSurname.innerHTML = "";
    surname.removeAttribute("readonly", 1);

    msgLang.classList.remove("accept");
    msgLang.innerHTML = "";
    checkSelect.disabled = false;

    msgBirth.classList.remove("accept");
    msgBirth.innerHTML = "";
    dateBirth.removeAttribute("readonly", 1);

    msgGender.classList.remove("accept");
    msgGender.innerHTML = "";
    for (let i = 0; i < checkRadio.length; i++) {
      checkRadio[i].disabled = false;
    }

    msgEmail.classList.remove("accept");
    msgEmail.innerHTML = "";
    mail.removeAttribute("readonly", 1);

    msgPass.classList.remove("accept");
    msgPass.innerHTML = "";
    pass.removeAttribute("readonly", 1);
    // после нажатия кнопки "редактировать" оставим все введенные в полях значения, кроме пароля и подтверждения пароля (вдруг Клиенту надо будет что-то подправить, чтобы не жать F5)
    pass.value = "";

    msgRepeatPass.classList.remove("accept");
    msgRepeatPass.innerHTML = "";
    repeatPass.removeAttribute("readonly", 1);
    repeatPass.value = "";
}

