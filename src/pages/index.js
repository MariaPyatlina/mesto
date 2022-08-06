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
import { locators } from '../utils/locators.js';
import {buttonEdit, buttonAdd, buttonUpdateAvatar, avatar, sectionElementsContainer, userProfession, userName} from '../utils/locators.js';
import {url, token, cohortId} from '../utils/locators.js'

const configurationForValidator = {
    formSelector: '.popup__form',  //форма в попапе
    inputSelector: '.popup__input-field', //поле ввода в форме
    submitButtonSelector: '.popup__save-button',  //кнопка Сохранить на форме
    inactiveButtonClass: 'popup__save-button_invalid',  //Неактивная кнопка Сохранить
    inputErrorClass: 'popup__input-field_type_error',  // Поле ввода подсвечено с ошибкой
    errorClass: 'popup__input-error_active'  //Текст ошибки становится видимым 
};

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
    headers: {
      authorization: 'c053cf6b-6c0b-409e-b690-1c8f378e7fc7',
      'Content-Type': 'application/json'
    }
}

//API
let api = new Api(config); 

let userId = null;


//Отрисовываем начальные карточки
api.getInitialCards()
    .then(items => {
        const defaultCardList = new Section(
            {   data: items,
                renderer: (item) => {
                    defaultCardList.addItem(createCard(item));
                }
            },  '.cards-container');
            console.log('defaultCardList', defaultCardList);
            defaultCardList.renderItems();
    }
).catch(err => console.log(`Ошибка при загрузке карточек с сервера ${err}`));


//Забираем данные о пользователе с сервера и отрисовываем их
api.getUserData()
    .then(data => {
        userInfo.setUserInfo(data); 
        userId = data._id;
    console.log('что пришло с сервера', data.cohort, data._id);   }
).catch(err => console.log(`Ошибка при загрузке профиля пользователя с сервера ${err}`));



//---------------------ПРОФИЛЬ
const userInfo = new UserInfo({ //Экземпляр класса с данными из профиля пользователя.
    name: ".profile__name", 
    profession: ".profile__profession",
    avatar: ".profile__avatar"
});

//Функция открытия попапа
function openPopupEditProfile() {
    popupEditProfileValidation.hideErrorMessage(); //Скрыли старые ошибки
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
        //Открыть попап картинки, Работает
        handleCardClick: (name, link) => {
            viewImageInPopup.open(name, link);
        },
        //Удалить карточку
        handleCardDelete: (cardId) => {
            popupRemoveCard.open(cardId, card);
            //запрос на удаление карточки вынесен в класс попапа
        },

        //Лайкнуть карточку
        handleLikeCard: (cardId) => {
            api.likeCard(cardId)
            .then((data) => {
                card.handleLikeCount(data);
            })
            .catch(err => console.log(`Ошибка лайка ${err}`))
        },
        //Дизлайкнуть карточку
        handleDisLikeCard: (cardId) => {
            api.disLikeCard(cardId)
            .then((data) => {
                console.log('2');
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
      


//Создание попапа с формой добавления новой карточки
const popupAddCard = new PopupWithForm({
    popupSelector:'.popup_type_add-card',
    handleFormSubmit: (data) => {
        popupAddCard.renderLoading(true);
        api.sendNewCard(data)
        .then((data) => {
//TO DO Добавить карточку на страницу
            const card = createCard(data);
            cardList.addItem(card);   
            popupAddCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupAddCard.renderLoading(false);
        })
    }
})
popupAddCard.setEventListeners(); //Добавляем слушателей, чтобы можно было его закрыть


//Попап просмотра картинки
const viewImageInPopup = new PopupWithImage('.popup_type_open-picture');
viewImageInPopup.setEventListeners();  //добавили ему слушателей, чтобы можно было его закрыть.


//Попап удаления карточки
const popupRemoveCard = new PopupWithConfirm('.popup_type_remove-card', api);
popupRemoveCard.setEventListeners(); 


//Ждем клик на кнопку +
buttonAdd.addEventListener('click', () => {
    popupAddCardValidation.hideErrorMessage();  //Скрыть ошибки
    popupAddCardValidation.toggleButtonState(); //Переключить состояние кнопки
    popupAddCard.open();
});  

function handleCardDeleteTest (card){
    card.removeCard(card);
    popupRemoveCard.close();
}











//-----------------------ВАЛИДАЦИЯ
//Валидация полей в попапах
const popupAddCardValidation = new FormValidator(configurationForValidator, locators.popupAddCard); 
popupAddCardValidation.enableValidation();  //при добавлении карточки

const popupEditProfileValidation = new FormValidator(configurationForValidator, locators.popupEditProfile); 
popupEditProfileValidation.enableValidation();  //при редактировании профиля

const popupUpdateProfileValidation = new FormValidator(configurationForValidator, locators.popupUpdateAvatar); 
popupUpdateProfileValidation.enableValidation();  //при обновлении аватарки