//+ Массив карточек
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

const popupList = document.querySelectorAll('.popup'); //все попапы
const buttonClosePopupList = document.querySelectorAll('.popup__close-button'); //все кнопки закрыть на попапах
const buttonSubmitList = document.querySelectorAll('.popup__save-button'); //все кнопки Сохранит на попапах

//Секция профиль
const profileArea = document.querySelector('.profile'); //Область Профиль
const buttonAddCard = profileArea.querySelector('.profile__add-button'); //Кнопка "Добавить"
const profileContainer = document.querySelector('.profile__container'); 
const buttonEditProfile = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

//Секция Элементы
const sectionElements = document.querySelector('.elements');  //Блок Элементы
const sectionElementsContainer = document.querySelector('.cards-container'); //Блок с карточками
const cardItem = sectionElementsContainer.querySelector('.card'); //Карточка

//Шаблон карточки
const cardTemplate = document.querySelector('.card_template').content;  //Контент из шаблон карточки
const cardTemplateImage = cardTemplate.querySelector('.card__image');  //Картинка
const cardTemplateTitle = cardTemplate.querySelector('.card__title');  //Название
const cardTemplateLikeButton = cardTemplate.querySelector('.card__like-button');  //Лайк
const cardTemplateDeleteButton = cardTemplate.querySelector('.card__delete-button');  //Мусорка

//Попап добавления нового места
const popupAddCard = document.querySelector('.popup_type_add-card'); //Нашли попап на станице
//const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupFormTypeAdd = popupAddCard.querySelector('.popup__form');  //Форма с полями ввода и кнопкой сохранить
const placeNameInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_name'); //Поле Название
const placeLinkInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_link'); //Поле Ссылка
const buttonSaveNewCard = popupFormTypeAdd.querySelector('.popup__save-button');  //Кнопка Сохранить

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //Окно попапа
//const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupFormTypeEdit = popupEditProfile.querySelector('.popup__form'); //Область поле ввода+кнопка
const nameFieldInPopup = popupFormTypeEdit.querySelector('.popup__input-field_name_name'); //Поле Имя
const professionFieldInPopup = popupFormTypeEdit.querySelector('.popup__input-field_name_profession'); //поле Профессия
//const buttonSave = popupFormTypeEdit.querySelector('.popup__save-button'); //кнопка Сохранить

//Попап картинки
const popupOpenPicture = document.querySelector('.popup_type_open-picture'); //Попап большой картинки
//const buttonClosePopupBigPicture = popupOpenPicture.querySelector('.popup__close-button'); //Кнопка Закрыть попап
const captionBigPicture = popupOpenPicture.querySelector('.popup__caption');  //Подпись к картике
const pictureInPopup =  popupOpenPicture.querySelector('.popup__image');  //Картинка в попапе
const captionInPopup =  popupOpenPicture.querySelector('.popup__caption'); //Подпись в попапе

//+ Функция добавления карточек на страницу из массива
function addCardToPage(arrayCard){
    for (let i=0; i<arrayCard.length; i++){
        sectionElementsContainer.append(createCard(arrayCard[i].name, arrayCard[i].link));
    }
}
addCardToPage(initialCards);

//Функция создания карточки
function createCard(title, link){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона карточки
    const cardElementImage = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title');

    cardElementImage.src = link;  // заполняем в ней поля
    cardElementImage.alt = title;
    cardElementTitle.textContent = title;
  
    // повесить слушателей
    //на просмотр картинки
    cardElement.querySelector('.card__cover').addEventListener('click', function openPopupBigPicture(){
        openPopup(popupOpenPicture);
        pictureInPopup.src = cardElement.querySelector('.card__image').src;
        pictureInPopup.alt = cardElement.querySelector('.card__title').textContent;
        captionInPopup.textContent =  cardElement.querySelector('.card__title').textContent;
    });

    //На кнопку лайк
    cardElement.querySelector('.card__like-button').addEventListener('click', function toggleLikeCard(){
        cardElement.querySelector('.card__like-button').classList.toggle("card__like-button_active"); //меняет фон сердечка
    });

    //На кнопку удалить
    cardElement.querySelector('.card__delete-button').addEventListener('click', function removeCard(){
      cardElement.remove();
    });

    return cardElement;  // вернуть значение карточки
}

//Функция открытия попапа редактирования профиля
function openPopupEditProfile() {
    openPopup(popupEditProfile);
    nameFieldInPopup.value = userName.textContent;
    professionFieldInPopup.value = userProfession.textContent;
}

//Функция сохраняет введенные данные в профиле пользователя
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    userName.textContent = nameFieldInPopup.value;  //Передаем в профиль пользователя значения из полей input попапа
    userProfession.textContent = professionFieldInPopup.value; 
    closePopup(popupEditProfile); //Вызываем функцию закрывающую попап
}

//Функция сохраняющая введенные данные нового места
function handleAddCardFormSubmit (evt) {
    evt.preventDefault();
    sectionElementsContainer.prepend(createCard(placeNameInPopupAddCard.value, placeLinkInPopupAddCard.value)); //Забираем значения из полей ввода и передали их в функцию создания карточки и Добавляем карточку в начало блока с карточками
    closePopup(popupAddCard);  //Закрываем попап
    popupFormTypeAdd.reset();  //Очищаем поля ввода 
    buttonSaveNewCard.classList.add("popup__save-button_invalid");
}

//Функция открытия попапа
function openPopup(popup){
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
buttonEditProfile.addEventListener('click', openPopupEditProfile);  //По кнопке Редактировать открываем попап и передаем установленные значения в поля ввода
popupFormTypeEdit.addEventListener('submit', handleProfileFormSubmit);  // По кнопке Submit (Сохранить) вызываем функцию обновляющую данные в профиле пользователя

//Добавление карточки по кнопке +
buttonAddCard.addEventListener('click', () =>{openPopup(popupAddCard)});  //Открыть попап добавления новой карточки
popupFormTypeAdd.addEventListener('submit', handleAddCardFormSubmit); //Сохранить новую карточку

//функция закрытия попапа по кнопке ESc
function closePopupViaEsc(evt){
    if (evt.key === "Escape") {
        const popupExit = document.querySelector('.popup_opened');
        closePopup(popupExit);
        
    }
};

//Закрытие попапа по клику вне попапа или по крестику
popupList.forEach((popup) => {
    popup.addEventListener('click', function checkClickInPopup(evt) {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-button")){
            closePopup(popup);
        };
    });
});