const popupList = document.querySelectorAll('.popup'); //все попапы
const closePopupButtonList = document.querySelectorAll('.popup__close-button'); //все кнопки закрыть на попапах

//Секция профиль
const profileArea = document.querySelector('.profile'); //Область Профиль
const addButton = profileArea.querySelector('.profile__add-button'); //Кнопка "Добавить"
const profileContainer = document.querySelector('.profile__container'); 
const editButton = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
console.log(editButton);
const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

//Секция Элементы
const sectionElements = document.querySelector('.elements');  //Блок Элементы
const sectionElementsContainer = document.querySelector('.cards-container'); //Блок с карточками
const cardItem = sectionElementsContainer.querySelector('.card'); //Карточка

//Шаблон карточки
export const cardTemplate = document.querySelector('.card_template').content;  //Контент из шаблон карточки
const cardTemplateImage = cardTemplate.querySelector('.card__image');  //Картинка
const cardTemplateTitle = cardTemplate.querySelector('.card__title');  //Название
const cardTemplateLikeButton = cardTemplate.querySelector('.card__like-button');  //Лайк
const cardTemplateDeleteButton = cardTemplate.querySelector('.card__delete-button');  //Мусорка

//Попап добавления нового места
const popupAddCard = document.querySelector('.popup_type_add-card'); //Нашли попап на станице
const closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupFormTypeAdd = popupAddCard.querySelector('.popup__form');  //Форма с полями ввода и кнопкой сохранить
const placeNameInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_name'); //Поле Название
const placeLinkInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_link'); //Поле Ссылка
const saveNewCardButton = popupFormTypeAdd.querySelector('.popup__save-button');  //Кнопка Сохранить

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //Окно попапа
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupFormTypeEdit = popupEditProfile.querySelector('.popup__form'); //Область поле ввода+кнопка
const nameFieldInPopup = popupFormTypeEdit.querySelector('.popup__input-field_name_name'); //Поле Имя
const professionFieldInPopup = popupFormTypeEdit.querySelector('.popup__input-field_name_profession'); //поле Профессия
const saveButton = popupFormTypeEdit.querySelector('.popup__save-button'); //кнопка Сохранить

//Попап картинки
export const popupOpenPicture = document.querySelector('.popup_type_open-picture'); //Попап большой картинки
const closePopupBigPictureButton = popupOpenPicture.querySelector('.popup__close-button'); //Кнопка Закрыть попап
const captionBigPicture = popupOpenPicture.querySelector('.popup__caption');  //Подпись к картике
export const pictureInPopup =  popupOpenPicture.querySelector('.popup__image');  //Картинка в попапе
export const captionInPopup =  popupOpenPicture.querySelector('.popup__caption'); //Подпись в попапе

export const locators = {
    popupList: popupList, //все попапы
    closePopupButtonList:  closePopupButtonList, //все кнопки закрыть на попапах

//Секция профиль
    profileArea: profileArea, //Область Профиль
    addButton: addButton, //Кнопка "Добавить"
    profileContainer: profileContainer, 
    editButton: editButton, //Кнопка Редактировать
    userName: userName, //Имя пользователя
    userProfession: userProfession, //Профессия пользователя

//Секция Элементы
    sectionElements: sectionElements,  //Блок Элементы
    sectionElementsContainer: sectionElementsContainer, //Блок с карточками
    cardItem: cardItem, //Карточка

//Шаблон карточки
    cardTemplate: cardTemplate,  //Контент из шаблон карточки
    cardTemplateImage: cardTemplateImage,  //Картинка
    cardTemplateTitle: cardTemplateTitle,  //Название
    cardTemplateLikeButton: cardTemplateLikeButton,  //Лайк
    cardTemplateDeleteButton: cardTemplateDeleteButton,  //Мусорка

//Попап добавления нового места
    popupAddCard: popupAddCard, //Нашли попап на станице
    closeAddCardPopupButton: closeAddCardPopupButton,  //Кнопка Закрыть попап
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
    saveButton: saveButton, //кнопка Сохранить

//Попап картинки
    popupOpenPicture: popupOpenPicture, //Попап большой картинки
    closePopupBigPictureButton: closePopupBigPictureButton, //Кнопка Закрыть попап
    captionBigPicture: captionBigPicture,  //Подпись к картике
    pictureInPopup:  pictureInPopup,  //Картинка в попапе
    captionInPopup: captionInPopup //Подпись в попапе
}