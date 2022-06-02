//Функция лайк карточки
// function likeCard(event) {
//   let likeButtonCardPressed = event.target;
//   let cardLikeButton
//   console.log('Нажали кнопку Лайк на карточке', likeButtonCardPressed);
//   toggleLikeCard();
// }

// function toggleLikeCard(evt){
//   const cardLikeButton = document.querySelector('.card__like-button'); //Кнопка лайк
//   evt.target.cardLikeButton.classList.toggle("card__like-button_active"); //меняет фон сердечка
// }


// function subscribeToEvents(listElement){
//   //кнопки на карточке
//   //Кнопка Удалить
//   let removeButtonOnCard = listElement.querySelector('.card__delete-button');
//   removeButtonOnCard.addEventListener('click', removeCard);
//   //Кнопка Лайк
//   let likeButtonOnCard = listElement.querySelector('.card__like-button');
//   likeButtonOnCard.addEventListener('click', likeCard);

//   //Картинка
//   let viewPictureOnCard = listElement.querySelector('.card__image');
//   viewPictureOnCard.addEventListener('click', togglePopupBigPicture);
// }


//Функция открытия/закрытия попапа с картинкой
// function togglePopupBigPicture(evt){
//   console.log('открыли попап с большой картинкой');
//   evt.target.popupOpenPicture.classList.toggle("popup_opened");

//   if (popupOpenPicture.classList.contains("popup_opened")){
//       const pictureInPopup =  popupOpenPicture.querySelector('.popup__image');
//       const captionInPopup =  popupOpenPicture.querySelector('.popup__caption');
//       pictureInPopup.src = cardElement.querySelector('.card__image').src;
//       pictureInPopup.alt = cardElement.querySelector('.card__title').textContent;
//       captionInPopup.textContent =  cardElement.querySelector('.card__title').textContent;
//       //TODO: Здесь наверно нужен класс с анимацией.
//   }

//}

function test(){
    console.log('я тестовая функция');
  }

  // function toggleLikeCard(evt){
//   const cardLikeButton = document.querySelector('.card__like-button'); //Кнопка лайк
//   evt.target.cardLikeButton.classList.toggle("card__like-button_active"); //меняет фон сердечка
// }

//likeButtonOnCard.addEventListener('click', toggleLikeCard);



//Функция удаления карточки
// function removeCard(event) {
//   cardDeleteButton= event.target;
//   //let trashButtonCardPressed = event.target;
//   console.log('Нажали кнопку Удалить на карточке', cardDeleteButton);
//   const cardForRemoving = cardDeleteButton.closest('.card');
//   console.log(cardForRemoving);
//   cardForRemoving.remove();
// }

 // cardDeleteButton.addEventListener('click', removeCard );

 const cardLikeButton = document.querySelector('.card__like-button'); //Кнопка лайк

 // cardLikeButton.addEventListener('click', function(event){
 //   console.log('тут сработало');
 //   event.target.classList.toggle("card__like-button_active");
 // });
 