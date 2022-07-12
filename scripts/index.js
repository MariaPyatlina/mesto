import { initialCards } from './InitialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { locators } from './locators.js';

const configurationForValidator = {
    formSelector: '.popup__form',  //форма в попапе
    inputSelector: '.popup__input-field', //поле ввода в форме
    submitButtonSelector: '.popup__save-button',  //кнопка Сохранить на форме
    inactiveButtonClass: 'popup__save-button_invalid',  //Неактивная кнопка Сохранить
    inputErrorClass: 'popup__input-field_type_error',  // Поле ввода подсвечено с ошибкой
    errorClass: 'popup__input-error_active'  //Текст ошибки становится видимым 
};


//Заполняем страницу карточками из массива
initialCards.forEach((item) => {
    console.log('Вызвали функцию создания карточки при пробеге по массиву');
    renderCard(item);
   // const card = new Card(item, '.card_template'); //Создадим экземпляр карточки
   // const cardElement = card.generateCard(); //Создаем карточку и возвращаем наружу
   // locators.sectionElementsContainer.append(cardElement); //Добавляем в Дом
});

//Функция создания карточки из класса
function renderCard(item){
    const card = new Card(item, '.card_template'); //Создадим экземпляр карточки
    const cardElement = card.generateCard(); //Создаем карточку и возвращаем наружу
    
    //return cardElement;
    locators.sectionElementsContainer.append(cardElement); //Добавляем в Дом
}




const popupAddCardValidation = new FormValidator(configurationForValidator, locators.popupAddCard); 
popupAddCardValidation.enableValidation();

const popupEditProfileValidation = new FormValidator(configurationForValidator, locators.popupEditProfile); 
popupEditProfileValidation.enableValidation();


//Функция открытия попапа редактирования профиля
function openPopupEditProfile() {
    openPopup(locators.popupEditProfile);
    popupEditProfileValidation.hideErrorMessage();
    locators.nameFieldInPopup.value = locators.userName.textContent;
    locators.professionFieldInPopup.value = locators.userProfession.textContent;
}

//Функция сохраняет введенные данные в профиле пользователя
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    locators.userName.textContent = locators.nameFieldInPopup.value;  //Передаем в профиль пользователя значения из полей input попапа
    locators.userProfession.textContent = locators.professionFieldInPopup.value; 
    closePopup(locators.popupEditProfile); //Вызываем функцию закрывающую попап
}

//Функция сохраняющая введенные данные нового места
function handleAddCardFormSubmit (evt) {
    evt.preventDefault();
    locators.sectionElementsContainer.prepend( 
        new Card({name:locators.placeNameInPopupAddCard.value, 
            link:locators.placeLinkInPopupAddCard.value }, '.card_template').generateCard());//TODO ТУт нужно вызвать создание экземпляра класса карточки
        renderCard({name:locators.placeNameInPopupAddCard.value, link:locators.placeLinkInPopupAddCard.value });

        //Забираем значения из полей ввода и передали их в функцию создания карточки и Добавляем карточку в начало блока с карточками
    closePopup(locators.popupAddCard);
    locators.popupFormTypeAdd.reset();
}

//Функция открытия попапа
export function openPopup(popup){
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupViaEsc);
}

//Функция закрытия попапа
function closePopup(popup){
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupViaEsc);
}

//Слушатели кликов вне карточки
//Редактирования профиля
locators.buttonEdit.addEventListener('click', openPopupEditProfile);  //По кнопке Редактировать открываем попап и передаем установленные значения в поля ввода
locators.popupFormTypeEdit.addEventListener('submit', handleProfileFormSubmit);  // По кнопке Submit (Сохранить) вызываем функцию обновляющую данные в профиле пользователя

//Добавление карточки по кнопке +
locators.buttonAdd.addEventListener('click', () =>{
    locators.popupFormTypeAdd.reset(); //Очистить поля ввода
    popupAddCardValidation.hideErrorMessage();  //Скрыть ошибки
    popupAddCardValidation.toggleButtonState();
    openPopup(locators.popupAddCard);//Открыть попап добавления новой карточки
});  
    
locators.popupFormTypeAdd.addEventListener('submit', handleAddCardFormSubmit); //Сохранить новую карточку


//функция закрытия попапа 
//по кнопке ESc
function closePopupViaEsc(evt){
    if (evt.key === "Escape") {
        const popupExit = document.querySelector('.popup_opened');
        closePopup(popupExit);
    }
};

//По клику вне попапа или по крестику
locators.popupList.forEach((popup) => {
    popup.addEventListener('mousedown', function checkClickInPopup(evt) {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-button")){
            closePopup(popup);
        };
    });
});