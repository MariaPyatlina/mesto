//Определяем объекты из профиля пользователя
const profileContainer = document.querySelector('.profile__container'); 
const editButton = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

//Определяем объекты попапа
const popup = document.querySelector('.popup'); //Окно попапа
const closeButton = popup.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupForm = popup.querySelector('.popup__form'); //Область поле ввода+кнопка
const nameFieldInPopup = popupForm.querySelector('.popup__input-field_name'); //Поле Имя
const professionFieldInPopup = popupForm.querySelector('.popup__input-field_profession'); //поле Профессия
const saveButton = popupForm.querySelector('.popup__save-button'); //кнопка Сохранить


//Функция добавляет класс "popup_opened" если его нет, удаляет если есть. Делает попап видимым или невидимым.
function togglePopup() {
    popup.classList.toggle("popup_opened")

    //При открытии попапа нужно передавать установленное значение в соответвующее поле
    let settedUserName = userName.textContent;  //Получили значение поля Имя пользователя
    let settedUserProfession = userProfession.textContent; //Получили значение поля Профессия пользователя

    //Передали установленные значения в поля попапа.
    nameFieldInPopup.value = settedUserName; 
    professionFieldInPopup.value = settedUserProfession;
}

//Функция обновляет введенные данные в профиле пользователя
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    //Получаем введенные значения в форме редактирования
    settedUserName = nameFieldInPopup.value;
    settedUserProfession = professionFieldInPopup.value;

    //Передаем их в соответвующие поля в профиль пользователя
    userName.textContent = settedUserName;  
    userProfession.textContent = settedUserProfession;

    //По кнопке Сохранить закрываем попап
    popup.classList.toggle("popup_opened");
}

editButton.addEventListener('click', togglePopup);  //Слушаем нажатие кнопки Редактировать // После чего делаем видимым окно Попапа //В окно попапа передаем установленные значения из профиля
closeButton.addEventListener('click', togglePopup);   //Закрыли попап по крестику
popupForm.addEventListener('submit', formSubmitHandler);  // По кнопке Submit (Сохранить) вызываем функцию обновляющую данные в профиле пользователя