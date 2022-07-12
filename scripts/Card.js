import { openPopup } from './index.js';
import { locators } from './locators.js';

export class Card{

    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._popupOpenPicture = document.querySelector('.popup_type_open-picture');
    }
    
    _getTemplate(){ //Забирает разметку из html и клонирует содержимое шаблона карточки
        this._element = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return this._element;
    }

    //Навешивает слушателей на события
    _setEventListeners(){
        //на клик по картинке
        this._cardImage.addEventListener('click', ()=>{
            this._openPopupBigPicture();
        });

        //на клик по кнопке Лайк   
        this._likeButton.addEventListener('click', ()=>{
            this._toggleLikeCard();
        });

        //на клик по мусорке
        this._deleteButton.addEventListener('click', ()=>{
            this._removeCard();
        });
    };

    //открывает попап с картинкой
    _openPopupBigPicture = () => {
        openPopup(this._popupOpenPicture);

        locators.pictureInPopup.src = this._link;
        locators.pictureInPopup.alt = this._name;
        locators.captionInPopup.textContent = this._name;
    };


    _toggleLikeCard(){ //Переключает фон сердечка
        this._likeButton.classList.toggle("card__like-button_active"); //меняет фон сердечка
    };

   
    _removeCard(){ //Удаляет карточку
        this._element.remove();
        this._element = null;
    };

    generateCard(){
        // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');

        // Добавим данные
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        // Вернём элемент наружу
        return this._element;
    }
}