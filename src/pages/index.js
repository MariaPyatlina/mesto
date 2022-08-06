import './index.css';
import { config } from '../utils/locators.js'; //авторизация

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
import { locators } from '../utils/locators.js';
import {buttonEdit, buttonAdd, buttonUpdateAvatar, avatar, sectionElementsContainer, userProfession, userName} from '../utils/locators.js';

const configurationForValidator = {
    formSelector: '.popup__form',  //форма в попапе
    inputSelector: '.popup__input-field', //поле ввода в форме
    submitButtonSelector: '.popup__save-button',  //кнопка Сохранить на форме
    inactiveButtonClass: 'popup__save-button_invalid',  //Неактивная кнопка Сохранить
    inputErrorClass: 'popup__input-field_type_error',  // Поле ввода подсвечено с ошибкой
    errorClass: 'popup__input-error_active'  //Текст ошибки становится видимым 
};


//API
let api = new Api(config); 
let userId = null;

//Отрисовываем начальные карточки
api.getInitialCards()
    .then(items => {

        const defaultCardList = new Section(
            {   data: items.reverse(),
                renderer: (item) => {
                    defaultCardList.addItem(createCard(item));
                }
            },  '.cards-container');
            defaultCardList.renderItems();
    }
).catch(err => console.log(`Ошибка при загрузке карточек с сервера ${err}`));


//Забираем данные о пользователе с сервера и отрисовываем их
api.getUserData()
    .then(data => {
        userInfo.setUserInfo(data); 
        userId = data._id;
    }
).catch(err => console.log(`Ошибка при загрузке профиля пользователя с сервера ${err}`));


//---------------------ПРОФИЛЬ
const userInfo = new UserInfo({ //Экземпляр класса с данными из профиля пользователя.
    name: ".profile__name", 
    profession: ".profile__profession",
    avatar: ".profile__avatar"
});

//Функция открытия попапа
function openPopupEditProfile() {
    popupEditProfileValidation.hideErrorMessage();
    const userData = userInfo.getUserInfo();
    popupEditProfile.setInputValue(userData);
    popupEditProfile.open();
}
buttonEdit.addEventListener('click', openPopupEditProfile); //По кнопке Редактировать открываем попап и передаем установленные значения в поля ввода


//Создаем попап редактирования профиля пользователя
const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile', 
    handleFormSubmit: (data) => { //загружает данные из формы на сервер
        popupEditProfile.renderLoading(true);
        api.setUserData(data)
        .then((data) => {
            userInfo.setUserInfo(data); //Здесь передаем в профиль пользователя значения из полей input попапа
            popupEditProfile.close();
        })
        .catch((err) => {console.log (`Ошибка загрузки данных ${ err}`)})
        .finally(() => {popupEditProfile.renderLoading(false);}) 
    }
});
popupEditProfile.setEventListeners(); //добавили ему слушателей, чтобы можно было его закрыть.


//Попап редактирования аватарки
const popupUpdateAvatar = new PopupWithForm({
    popupSelector: '.popup_type_update-avatar',
    handleFormSubmit: (data) => { //Отправляет аватар на сервер
        popupUpdateAvatar.renderLoading(true);
        api.updateAvatar(data)
        .then((data) => {
            avatar.src = data.avatar;
            popupUpdateAvatar.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupUpdateAvatar.renderLoading(false);
        })
    }
})
popupUpdateAvatar.setEventListeners();

buttonUpdateAvatar.addEventListener('click', () => {
    popupUpdateProfileValidation.hideErrorMessage();
    popupUpdateProfileValidation.toggleButtonState();
    popupUpdateAvatar.open();
})



//---------------------ДОБАВИТЬ КАРТОЧКУ
function createCard (item){ //Функция создания новой каточки из класса
    const card = new Card({
        data: item, 
        cardSelector: '.card_template',
        userId: userId,
        handleCardClick: (name, link) => {//Открыть попап картинки
            viewImageInPopup.open(name, link);
        },
        handleCardDelete: (cardId) => { //Удалить карточку
            popupRemoveCard.open(cardId, card);
            //запрос на удаление карточки вынесен в класс попапа
        },
        handleLikeCard: (cardId) => {//Лайкнуть карточку
            api.likeCard(cardId)
            .then((data) => {
                card.handleLikeCount(data);
            })
            .catch(err => console.log(`Ошибка лайка ${err}`))
        },
        handleDisLikeCard: (cardId) => {//Дизлайкнуть карточку
            api.disLikeCard(cardId)
            .then((data) => {
                card.handleLikeCount(data);
            })
            .catch(err => console.log(`Ошибка ДИЗлайка ${err}`))
        }
    });
    const cardElement = card.generateCard(); //Создаем карточку и возвращаем наружу
    return cardElement;
}

//Экземпляр класса Section
const cardList = new Section ({
      // data: items,
        renderer: (item) => {
            сardList.addItem(createCard(item));
        }
    },  '.cards-container');
      

//Попап добавления новой карточки
const popupAddCard = new PopupWithForm({
    popupSelector:'.popup_type_add-card',
    handleFormSubmit: (data) => {
        popupAddCard.renderLoading(true);
        api.sendNewCard(data)
        .then((data) => {
            const card = createCard(data);
            cardList.addItem(card);  
            //cardList.reverse(); 
            popupAddCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupAddCard.renderLoading(false);
        })
    }
})
popupAddCard.setEventListeners();


//Попап просмотра картинки
const viewImageInPopup = new PopupWithImage('.popup_type_open-picture');
viewImageInPopup.setEventListeners(); 


//Попап удаления карточки
const popupRemoveCard = new PopupWithConfirm('.popup_type_remove-card', api);
popupRemoveCard.setEventListeners(); 


//Ждем клик на кнопку +
buttonAdd.addEventListener('click', () => {
    popupAddCardValidation.hideErrorMessage(); 
    popupAddCardValidation.toggleButtonState();
    popupAddCard.open();
});  


//-----------------------ВАЛИДАЦИЯ //Валидация полей в попапах
const popupAddCardValidation = new FormValidator(configurationForValidator, locators.popupAddCard); 
popupAddCardValidation.enableValidation();  //при добавлении карточки

const popupEditProfileValidation = new FormValidator(configurationForValidator, locators.popupEditProfile); 
popupEditProfileValidation.enableValidation();  //при редактировании профиля

const popupUpdateProfileValidation = new FormValidator(configurationForValidator, locators.popupUpdateAvatar); 
popupUpdateProfileValidation.enableValidation();  //при обновлении аватарки