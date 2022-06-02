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

//Секция профиль
const profileArea = document.querySelector('.profile'); //Область Профиль
const addButton = profileArea.querySelector('.profile__add-button'); //Кнопка "Добавить"
const profileContainer = document.querySelector('.profile__container'); 
const editButton = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
const userProfession = profileContainer.querySelector('.profile__profession'); //Профессия пользователя

//Секция Элементы
const sectionElements = document.querySelector('.elements');  //Блок Элементы
const sectionElementsContainer = document.querySelector('.cards-container'); //Блок с карточками
const cardItem = sectionElementsContainer.querySelector('.card'); //Карточка
// const cardImage = cardItem.querySelector('.card__image');  //Картинка карточки
// const cardTitle = cardItem.querySelector('.card__title');  //Название карточки
// const cardLikeButton = document.querySelector('.card__like-button'); //Кнопка лайк
const cardDeleteButton = document.querySelector('.card__delete-button');  //кнопка Удалить
  
//Шаблон карточки
const cardTemplate = document.querySelector('.card_template').content;  //Контент из шаблон карточки
const cardTemplateImage = cardTemplate.querySelector('.card__image');  //Картинка
const cardTemplateTitle = cardTemplate.querySelector('.card__title');  //Название
const cardTemplateLikeButton = cardTemplate.querySelector('.card__like-button');  //Лайк
const cardTemplateDeleteButton = cardTemplate.querySelector('.card__delete-button');  //Мусорка

//Попап добавления нового места
const popupAddCard = document.querySelector('.popup__add-card'); //Нашли попап на станице
const closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupFormTypeAdd = popupAddCard.querySelector('.popup__form_type-add');  //Форма с полями ввода и кнопкой сохранить
const placeNameInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_name'); //Поле Название
const placeLinkInPopupAddCard = popupFormTypeAdd.querySelector('.popup__input-field_place_link'); //Поле Ссылка        
const saveNewCardButton = popupFormTypeAdd.querySelector('.popup__save-button');  //Кнопка Сохранить

//попап редактирования профиля
const popup = document.querySelector('.popup'); //Окно попапа
const closeButton = popup.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const popupForm = popup.querySelector('.popup__form'); //Область поле ввода+кнопка
const nameFieldInPopup = popupForm.querySelector('.popup__input-field_name_name'); //Поле Имя
const professionFieldInPopup = popupForm.querySelector('.popup__input-field_name_profession'); //поле Профессия
const saveButton = popupForm.querySelector('.popup__save-button'); //кнопка Сохранить

//Попап картинки
const popupOpenPicture = document.querySelector('.popup__open-picture'); //Попап большой картинки
const closePopupBigPictureButton = popupOpenPicture.querySelector('.popup__close-button'); //Кнопка Закрыть попап
const captionBigPicture = popupOpenPicture.querySelector('.popup__caption');  //Подпись к картике
const imageBigPicture = popupOpenPicture.querySelector('.popup__image');  //Картинка в попапе



//+ Функция добавления карточек на страницу из массива
function addCardToPage(arrayCard){
  console.log('вызвана функция добавления карточек из массива');
    for (let i=0; i<arrayCard.length; i++){      
        sectionElementsContainer.append(createCard(arrayCard[i].name, arrayCard[i].link));
    }    
}
addCardToPage(initialCards);

//Функция создания карточки
function createCard(title, link){
    console.log('вызвана функция создания карточки');

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона карточки
    console.log(cardElement);
  // заполняем в ней поля 
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = title;
    cardElement.querySelector('.card__title').textContent = title;
  
  // повесить слушателей
  //на просмотр картинки
    cardElement.querySelector('.card__image').addEventListener('click', function addPopupBigPicture(){
        console.log('открыли попап с большой картинкой');
        popupOpenPicture.classList.add("popup_opened");
        
        const pictureInPopup =  popupOpenPicture.querySelector('.popup__image');
        const captionInPopup =  popupOpenPicture.querySelector('.popup__caption');
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
      const cardForRemoving = cardElement.querySelector('.card__delete-button').closest('.card');
      cardForRemoving.remove();
    });

    console.log('карточка', cardElement);
  
    // вернуть значение карточки
    return cardElement;
}

//+ Функция открытия/закрытия попапа редактирования профиля
function togglePopup() {
  popup.classList.toggle("popup_opened")    //TODO: Здесь наверно нужен класс с анимацией.

  if(popup.classList.contains("popup_opened")){ //При открытии попапа подставляет значения в поля формы из профиля
      nameFieldInPopup.value = userName.textContent; 
      professionFieldInPopup.value = userProfession.textContent; 
  }  
}

//+ Функция открытия/закрытия попапа добавления нового места
function togglePopupAddCard(){
    console.log('вызвана функция открытия/закрытия попапа добавления карточки');
    popupAddCard.classList.toggle("popup_opened");  //TODO: Здесь наверно нужен класс с анимацией.
}

//+ Функция закрытия попапа с картинкой
function closePopupBigPicture(){
    popupOpenPicture.classList.remove("popup_opened");
}

//+ Функция обновляет введенные данные в профиле пользователя
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  //Передаем в профиль пользователя значения из полей input попапа
  userName.textContent = nameFieldInPopup.value;
  userProfession.textContent = professionFieldInPopup.value;

  //Вызываем функцию закрывающую попап
  togglePopup();
}

//+ Функция сохраняющая введенные данные нового места
function formSubmitHandlerAddCard (evt) {
    evt.preventDefault();
    console.log('вызвана функция сохранения карточки');

    //Забираем значения из полей ввода и передали их в функцию создания карточки
    //Добавляем карточку в начало блока с карточками
    sectionElementsContainer.prepend(createCard(placeNameInPopupAddCard.value, placeLinkInPopupAddCard.value));
   
    //Очистили инпуты в попапе
    placeNameInPopupAddCard.value = null;
    placeLinkInPopupAddCard.value = null;
    console.log('Очистили значения инпутов');
    
    //Закрыть попап
    togglePopupAddCard();
}


//Слушатели кликов вне карточки
//Редактирования профиля
editButton.addEventListener('click', togglePopup);  //По кнопке Редактировать открываем попап и передаем установленные значения в поля ввода
closeButton.addEventListener('click', togglePopup);   //По кнопке крестик - закрываем попап без изменения полей
popupForm.addEventListener('submit', formSubmitHandler);  // По кнопке Submit (Сохранить) вызываем функцию обновляющую данные в профиле пользователя

//Добавление карточки по кнопке +
addButton.addEventListener('click', togglePopupAddCard);  //Открыть попап добавления новой карточки
closeAddCardPopupButton.addEventListener('click', togglePopupAddCard);  //закрыть попап добавления новой карточки
popupFormTypeAdd.addEventListener('submit', formSubmitHandlerAddCard); //Сохранить новую карточку

//закрытие попапа с картинкой
closePopupBigPictureButton.addEventListener('click', closePopupBigPicture); //Закрыть попап с картинкой











console.log('конец файла');