import './index.css';

//Классы
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//Константы
import { initialCards } from '../utils/InitialCards.js';
import { locators } from '../utils/locators.js';
import {buttonEdit, buttonAdd, buttonUpdateAvatar} from '../utils/locators.js';
import {url, token, cohortId} from '../utils/locators.js'

const configurationForValidator = {
    formSelector: '.popup__form',  //форма в попапе
    inputSelector: '.popup__input-field', //поле ввода в форме
    submitButtonSelector: '.popup__save-button',  //кнопка Сохранить на форме
    inactiveButtonClass: 'popup__save-button_invalid',  //Неактивная кнопка Сохранить
    inputErrorClass: 'popup__input-field_type_error',  // Поле ввода подсвечено с ошибкой
    errorClass: 'popup__input-error_active'  //Текст ошибки становится видимым 
};

//API
const api = new Api({
    baseUrl: url,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
}); 




//Отрисовываем начальные карточки
const defaultCardList = new Section(
    {   data: initialCards,
        renderer: (item) => {
            defaultCardList.addItem(createCard(item));
        }
    },  '.cards-container');
defaultCardList.renderItems();




//---------------------ДОБАВИТЬ КАРТОЧКУ
function createCard (item){ //Функция создания новой каточки из класса
    const card = new Card({
        data: item, 
        cardSelector: '.card_template',
        handleCardClick: handleCardClick,
        handleCardDelete: handleCardDelete
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



//Открывает попап по клику на картинку
function handleCardClick(name, link){
    viewImageInPopup.open(name, link);
}

//Попап просмотра картинки
const viewImageInPopup = new PopupWithImage('.popup_type_open-picture');
viewImageInPopup.setEventListeners();  //добавили ему слушателей, чтобы можно было его закрыть.


//Попап удаления карточки
const popupRemoveCard = new PopupWithConfirm('.popup_type_remove-card');
popupRemoveCard.setEventListeners(); 

function handleCardDelete(){
    popupRemoveCard.open();
};



//Функция сохраняющая введенные данные нового места
function handleAddCardFormSubmit (obj) {
    const card = createCard(obj);
    defaultCardList.addItem(card);    
    popupAddCard.close();
}

//Ждем клик на кнопку +
buttonAdd.addEventListener('click', () => {
    console.log();
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
        userInfo.setUserInfo(data); //Здесь передаем в профиль пользователя значения из полей input попапа
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



//Попап редактирования аватарки
const popupUpdateAvatar = new PopupWithForm({
    popupSelector: '.popup_type_update-avatar',
    handleFormSubmit: () => {
        console.log('Сохранили таки новый аватар');
    }
})
popupUpdateAvatar.setEventListeners();

buttonUpdateAvatar.addEventListener('click', () => {
    console.log('нажали на редактировать аватарку');
    popupUpdateProfileValidation.hideErrorMessage(); //Скрыли старые ошибки
    popupUpdateProfileValidation.toggleButtonState();
    popupUpdateAvatar.open();
})



//-----------------------ВАЛИДАЦИЯ
//Валидация полей в попапах
const popupAddCardValidation = new FormValidator(configurationForValidator, locators.popupAddCard); 
popupAddCardValidation.enableValidation();  //при добавлении карточки

const popupEditProfileValidation = new FormValidator(configurationForValidator, locators.popupEditProfile); 
popupEditProfileValidation.enableValidation();  //при редактировании профиля

const popupUpdateProfileValidation = new FormValidator(configurationForValidator, locators.popupUpdateAvatar); 
popupUpdateProfileValidation.enableValidation();  //при обновлении аватарки