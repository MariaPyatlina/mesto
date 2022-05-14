//Определяем объекты из профиля пользователя
const profileContainer = document.querySelector('.profile__container'); 
const editButton = profileContainer.querySelector('.profile__edit-button'); //Кнопка Редактировать
const userName = profileContainer.querySelector('.profile__name'); //Имя пользователя
const userProfession = profileContainer.querySelector('.profile__profession'); //Профессией пользователя

//Определяем объекты попапа
const popup = document.querySelector('.popup'); //Окно попапа
const closeButton = popup.querySelector('.popup__close-button');  //Кнопка Закрыть попап
const nameFieldInPopup = popup.querySelector('.popup__input-field_name'); //Поле Имя
const professionFieldInPopup = popup.querySelector('.popup__input-field_profession'); //поле Профессия
const saveButton = popup.querySelector('.popup__save-button'); //кнопка Сохранить


//Функция добавляет класс "popup_opened" если его нет, удаляет если есть. Делает попап видимым или невидимым.
function togglePopup() {
    popup.classList.toggle("popup_opened")
}

//Функция обновляет введенные данные в профиле пользователя
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из попапа
    let nameInput = nameFieldInPopup.value;
    let jobInput = professionFieldInPopup.value;

    // Выберите элементы, куда должны быть вставлены значения полей - в профиль пользователя
    userName.textContent = nameInput;
    userProfession.textContent = jobInput;

    //По кнопке Сохранить закрываем попап
    popup.classList.toggle("popup_opened");
}

//Слушаем нажатие на кнопки
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', formSubmitHandler);

//При открытии попапа нужно передавать установленное значение в соответвующее поле
let settedUserName = userName.textContent;  //Получили значение поля Имя пользователя
let settedUserProfession = userProfession.textContent; //Получили значение поля Профессия пользователя

//Передали установленные значения в поля попапа.
nameFieldInPopup.value = settedUserName; 
professionFieldInPopup.value = settedUserProfession;