//Массив карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  console.log(initialCards);

//Определяем объекты из карточки
const sectionElements = document.querySelector('.elements'); 
console.log(sectionElements);
const cardTemplateElemnts = document.querySelector('.card_template').content;  //Нашли Шаблон карточки

//Определяем объекты из профиля пользователя
let profileContainer = document.querySelector('.profile__container'); 
let editButton = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
let userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
let userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

//Определяем объекты попапа
let popup = document.querySelector('.popup'); //Окно попапа
let closeButton = popup.querySelector('.popup__close-button');  //Кнопка Закрыть попап
let popupForm = popup.querySelector('.popup__form'); //Область поле ввода+кнопка
let nameFieldInPopup = popupForm.querySelector('.popup__input-field_name_name'); //Поле Имя
let professionFieldInPopup = popupForm.querySelector('.popup__input-field_name_profession'); //поле Профессия
let saveButton = popupForm.querySelector('.popup__save-button'); //кнопка Сохранить

//Функция добавляет класс "popup_opened" если его нет, удаляет если есть.
function togglePopup() {
    popup.classList.toggle("popup_opened")

    if(popup.classList.contains("popup_opened")){ //При открытии попапа подставляет значения в поля формы из профиля
        nameFieldInPopup.value = userName.textContent; 
        professionFieldInPopup.value = userProfession.textContent; 
    }  
}

//Функция обновляет введенные данные в профиле пользователя
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    //Передаем в профиль пользователя значения из полей input попапа
    userName.textContent = nameFieldInPopup.value;
    userProfession.textContent = professionFieldInPopup.value;

    //Вызываем функцию закрывающую попап
    togglePopup();
}

editButton.addEventListener('click', togglePopup);  //По кнопке Редактировать открываем попап и передаем установленные значения в поля ввода
closeButton.addEventListener('click', togglePopup);   //По кнопке крестик - закрываем попап без изменения полей
popupForm.addEventListener('submit', formSubmitHandler);  // По кнопке Submit (Сохранить) вызываем функцию обновляющую данные в профиле пользователя

//Кнопка удаления на карточке
const removeCardButton = sectionElements.querySelector('.card__delete-button');
console.log(removeCardButton);
removeCardButton.addEventListener('click', removeCard); //По кнопке Мусорка удаляем карточку 

//Функция удаления карточки
function removeCard(event) {
    let trashButtonCardPressed = event.target;
    console.log('Нажали кнопку Удалить на карточке', trashButtonCardPressed);
    let cardForRemoving = trashButtonCardPressed.closest('.card');
    console.log(cardForRemoving);
    cardForRemoving.remove();
}

//Добавление карточки по кнопке +
const addButton = profileContainer.querySelector('.profile__add-button');
addButton.addEventListener('click', addNewCard);

function addNewCard(){
    console.log('кликнули кнопку Добавить');
}



