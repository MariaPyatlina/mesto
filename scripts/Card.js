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

//Класс карточки
class Card{
    //Свойства
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    //Методы
    //Работаем с шаблоном карточки в разметке
    _getTemplate(){//Забирает разметку из html и клонирует элемент
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона карточки
            
        return cardElement;
    }

    //Навешивает слушателей на события
    _setEventListeners(){
        //на клик по картинке
        this._element.querySelector('.card__cover').addEventListener('click', ()=>{
            this._openPopupBigPicture();
        });

        //на клик по кнопке Лайк   
        this._element.querySelector('.card__like-button').addEventListener('click', ()=>{
            this._toggleLikeCard();
        });

        //на клик по мусорке
        this._element.querySelector('.card__delete-button').addEventListener('click', ()=>{
            this._removeCard();
        });
    };


    //открывает попап с картинкой
    _openPopupBigPicture(){
        openPopup(popupOpenPicture);
        pictureInPopup.src =  this._element.querySelector('.card__image').src;
        pictureInPopup.alt = this._element.querySelector('.card__title').textContent;
        captionInPopup.textContent =  this._element.querySelector('.card__title').textContent;
    };

    //Переключает фон сердечка
    _toggleLikeCard(){
        this._element.querySelector('.card__like-button').classList.toggle("card__like-button_active"); //меняет фон сердечка
    };
    

    //Удаляет карточку
    _removeCard(){
      const cardForRemoving = this._element.querySelector('.card__delete-button').closest('.card');
      cardForRemoving.remove();
    };

    generateCard(){
        // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();

        // Добавим данные
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        // Вернём элемент наружу
        return this._element;
    }
   
    }


initialCards.forEach((item) => {
    //Создадим экземпляр карточки
    const card = new Card(item, '.card_template');
    //Создаем карточку и возвращаем наружу
    const cardElement = card.generateCard();
    //Добавляем в Дом
    sectionElementsContainer.append(cardElement);
});
