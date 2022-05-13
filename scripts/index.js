//Работа с попапом
const editButton = document.querySelector('.profile__edit-button'); //Нашли кнопку Редактировать
const popup = document.querySelector('.popup'); //Нашли окно попапа
const closeButton = popup.querySelector('.popup__close-button');  //В окне попапа нашли кнопку Закрыть

//Функция добавляет класс "popup_opened" если его нет, удаляет если есть. Делает попап видимым или невидимым.
function togglePopup() {
    popup.classList.toggle("popup_opened")
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);


//Работа с полями имени и профессии
//const userName = document.querySelector('.profile__name'); //Нашли поле с Именем пользователя
//const userProfession = document.querySelector('.profile__profession'); //Нашли поле с профессией пользователя


// console.log({
//     editButton, popup, closeButton
// });

// console.log ('Name = ', userNameValue);
// console.log ('Profession = ', userProfession);




//Кнопка лайк
// const card = document.querySelector('.card'); //нашли одну (первую) карточку
// const likeButton = card.querySelector('.card__like-button'); //нашли на ней сердечко

// console.log({
//     card, likeButton
// });
// function toggleLike() {
//     card.classList.toggle("card__like-button_active")
// }

// likeButton.addEventListener('click', toggleLike);