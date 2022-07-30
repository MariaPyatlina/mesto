import { initialCards } from '../utils/InitialCards.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { locators } from '../utils/locators.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {buttonEdit, buttonAdd, popupFormTypeAdd} from '../utils/locators.js';

const configurationForValidator = {
    formSelector: '.popup__form',  //форма в попапе
    inputSelector: '.popup__input-field', //поле ввода в форме
    submitButtonSelector: '.popup__save-button',  //кнопка Сохранить на форме
    inactiveButtonClass: 'popup__save-button_invalid',  //Неактивная кнопка Сохранить
    inputErrorClass: 'popup__input-field_type_error',  // Поле ввода подсвечено с ошибкой
    errorClass: 'popup__input-error_active'  //Текст ошибки становится видимым 
};

//Отрисовываем начальные карточки
const defaultCardList = new Section(
    {   data: initialCards,
        renderer: (item) => {
            const card = new Card({
                data: item, 
                cardSelector: '.card_template',
                handleCardClick: handleCardClick
            }); 
            const cardElement = card.generateCard(); //Создаем карточку
            defaultCardList.addItem(cardElement); //Созданную карточку добавляем в разметку
        }
    },  '.cards-container');

defaultCardList.renderItems();


//---------------------ДОБАВИТЬ КАРТОЧКУ
//Функция создания новой каточки
function createCard (item){
    const card = new Card({
        data: item, 
        cardSelector: '.card_template',
        handleCardClick: handleCardClick
    });
    const cardElement = card.generateCard(); //Создаем карточку и возвращаем наружу
    return cardElement;
}

//Создание попапа с формой добавления новой карточки
const popupAddCard = new PopupWithForm({
    popupSelector:'.popup_type_add-card',
    handleFormSubmit: handleAddCardFormSubmit
})
popupAddCard.setEventListeners(); //Добавляем слушателей, чтобы можно было его закрыть


//Попап просмотра картинки
const viewImageInPopup = new PopupWithImage('.popup_type_open-picture'); //попап с картинкой  
viewImageInPopup.setEventListeners();  //добавили ему слушателей, чтобы можно было его закрыть.

//Функция открывающая попап по клику на картинку
function handleCardClick(name, link){
    viewImageInPopup.open(name, link);
}

//Функция сохраняющая введенные данные нового места
function handleAddCardFormSubmit (obj) {
    const card = createCard(obj);
    defaultCardList.addItem(card);    
    popupFormTypeAdd.reset();
    popupAddCard.close();
}

//Ждем клик на кнопку +
buttonAdd.addEventListener('click', () => {
    popupFormTypeAdd.reset(); //Очистить поля ввода
    popupAddCardValidation.hideErrorMessage();  //Скрыть ошибки
    popupAddCardValidation.toggleButtonState(); //Переключить состояние кнопки
    popupAddCard.open();
});  



//---------------------ПРОФИЛЬ
const userInfo = new UserInfo({ //Экземпляр класса с данными из профиля пользователя.
    name: ".profile__name", 
    profession: ".profile__profession"
});

//Создаем попап редактирования профиля пользователя
const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile', 
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data); //Здесь поидее передаем в профиль пользователя значения из полей input попапа
        popupEditProfile.close();
    }
});

//Функция открытия попапа
function openPopupEditProfile() {
    popupEditProfileValidation.hideErrorMessage(); //Скрыли старые ошибки
    const userData = userInfo.getUserInfo();
    popupEditProfile.setInputValue(userData);
    popupEditProfile.open();
}

popupEditProfile.setEventListeners(); //добавили ему слушателей, чтобы можно было его закрыть.

buttonEdit.addEventListener('click', openPopupEditProfile); //По кнопке Редактировать открываем попап и передаем установленные значения в поля ввода




//-----------------------ВАЛИДАЦИЯ
//Валидация полей в попапах
const popupAddCardValidation = new FormValidator(configurationForValidator, locators.popupAddCard); 
popupAddCardValidation.enableValidation();  //при добавлении карточки

const popupEditProfileValidation = new FormValidator(configurationForValidator, locators.popupEditProfile); 
popupEditProfileValidation.enableValidation();  //при редактировании профиля