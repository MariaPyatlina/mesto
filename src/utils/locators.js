export const url = 'https://mesto.nomoreparties.co/v1/cohort-46';
export const token = 'c053cf6b-6c0b-409e-b690-1c8f378e7fc7';
export const cohortId = 'cohort-46';


const popupList = document.querySelectorAll('.popup'); //все попапы
const closePopupButtonList = document.querySelectorAll('.popup__close-button'); //все кнопки закрыть на попапах

//Секция профиль
const profileArea = document.querySelector('.profile'); //Область Профиль
export const buttonAdd = profileArea.querySelector('.profile__add-button'); //Кнопка "Добавить"
const profileContainer = document.querySelector('.profile__container'); 
export const buttonEdit = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя
export const buttonUpdateAvatar = profileContainer.querySelector('.profile__avatar-button'); //Кнопка Редактировать аватар
export const avatar = profileContainer.querySelector('.profile__avatar');

//Секция Элементы
const sectionElements = document.querySelector('.elements');  //Блок Элементы
const sectionElementsContainer = document.querySelector('.cards-container'); //Блок с карточками
const cardItem = sectionElementsContainer.querySelector('.card'); //Карточка

//Шаблон карточки
const cardTemplate = document.querySelector('.card_template').content;  //Контент из шаблон карточки
const cardTemplateImage = cardTemplate.querySelector('.card__image');  //Картинка
const cardTemplateTitle = cardTemplate.querySelector('.card__title');  //Название
const cardTemplateLikeButton = cardTemplate.querySelector('.card__like-button');  //Лайк
const cardCountLike = cardTemplate.querySelector('.card__like-count');  //Количество лайков
const cardTemplateDeleteButton = cardTemplate.querySelector('.card__delete-button');  //Мусорка

//Попап добавления нового места
export const popupAddCard = document.querySelector('.popup_type_add-card'); //Нашли попап на станице
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__close-button');  //Кнопка Закрыть попап
export const popupFormTypeAdd = popupAddCard.querySelector('.popup__form');  //Форма с полями ввода и кнопкой сохранить
const placeNameInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_name'); //Поле Название
const placeLinkInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_link'); //Поле Ссылка
const saveNewCardButton = popupFormTypeAdd.querySelector('.popup__save-button');  //Кнопка Сохранить

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //Окно попапа
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupFormTypeEdit = popupEditProfile.querySelector('.popup__form'); //Область поле ввода+кнопка
const nameFieldInPopup = popupFormTypeEdit.querySelector('.popup__input-field_name_name'); //Поле Имя
const professionFieldInPopup = popupFormTypeEdit.querySelector('.popup__input-field_name_profession'); //поле Профессия
const buttonSave = popupFormTypeEdit.querySelector('.popup__save-button'); //кнопка Сохранить

//Попап картинки
const popupOpenPicture = document.querySelector('.popup_type_open-picture'); //Попап большой картинки
const closePopupBigPictureButton = popupOpenPicture.querySelector('.popup__close-button'); //Кнопка Закрыть попап
const captionBigPicture = popupOpenPicture.querySelector('.popup__caption');  //Подпись к картике
const pictureInPopup =  popupOpenPicture.querySelector('.popup__image');  //Картинка в попапе
const captionInPopup =  popupOpenPicture.querySelector('.popup__caption'); //Подпись в попапе

//Попап удаления карточки
export const popupRemoveCard = document.querySelector('.popup_type_remove-card'); //Попап удаления карточки
const closePopupRemoveCard = popupRemoveCard.querySelector('.popup__close-button'); //Кнопка Закрыть попап
const popupFormRemoveCard = popupRemoveCard.querySelector('.popup__form');
const buttonYes =  popupFormRemoveCard.querySelector('.popup__save-button'); //Подпись в попапе

//Попап обновления аватарки
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');


export const locators = {
    popupList: popupList, //все попапы
    closePopupButtonList:  closePopupButtonList, //все кнопки закрыть на попапах

//Секция профиль
    profileArea: profileArea, //Область Профиль
    buttonAdd: buttonAdd, //Кнопка "Добавить"
    profileContainer: profileContainer, 
    buttonEdit: buttonEdit, //Кнопка Редактировать
    userName: userName, //Имя пользователя
    userProfession: userProfession, //Профессия пользователя
    buttonUpdateAvatar: buttonUpdateAvatar, //Редактировать аватар
    avatar: avatar,

//Секция Элементы
    sectionElements: sectionElements,  //Блок Элементы
    sectionElementsContainer: sectionElementsContainer, //Блок с карточками
    cardItem: cardItem, //Карточка

//Шаблон карточки
    cardTemplate: cardTemplate,  //Контент из шаблон карточки
    cardTemplateImage: cardTemplateImage,  //Картинка
    cardTemplateTitle: cardTemplateTitle,  //Название
    cardTemplateLikeButton: cardTemplateLikeButton,  //Лайк
    cardCountLike: cardCountLike,
    cardTemplateDeleteButton: cardTemplateDeleteButton,  //Мусорка

//Попап добавления нового места
    popupAddCard: popupAddCard, //Нашли попап на станице
    buttonCloseAddCardPopup: buttonCloseAddCardPopup,  //Кнопка Закрыть попап
    popupFormTypeAdd: popupFormTypeAdd,  //Форма с полями ввода и кнопкой сохранить
    placeNameInPopupAddCard: placeNameInPopupAddCard, //Поле Название
    placeLinkInPopupAddCard: placeLinkInPopupAddCard, //Поле Ссылка
    saveNewCardButton: saveNewCardButton,  //Кнопка Сохранить

//попап редактирования профиля
    popupEditProfile: popupEditProfile, //Окно попапа
    closeEditProfileButton: closeEditProfileButton,  //Кнопка Закрыть попап
    popupFormTypeEdit: popupFormTypeEdit, //Область поле ввода+кнопка
    nameFieldInPopup: nameFieldInPopup, //Поле Имя
    professionFieldInPopup: professionFieldInPopup, //поле Профессия
    buttonSave: buttonSave, //кнопка Сохранить

//Попап картинки
    popupOpenPicture: popupOpenPicture, //Попап большой картинки
    closePopupBigPictureButton: closePopupBigPictureButton, //Кнопка Закрыть попап
    captionBigPicture: captionBigPicture,  //Подпись к картике
    pictureInPopup:  pictureInPopup,  //Картинка в попапе
    captionInPopup: captionInPopup, //Подпись в попапе

//Попап удаления карточки
    popupRemoveCard: popupRemoveCard, //Попап удаления карточки
    closePopupRemoveCard: closePopupRemoveCard,  //Кнопка Закрыть попап
    popupFormRemoveCard: popupFormRemoveCard, 
    buttonYes: buttonYes,  //Кнопка ДА

//Попап обновления аватарки
    popupUpdateAvatar: popupUpdateAvatar,

}