import { openPopup } from './index.js';
import { locators } from './Locators.js';



export class Card{

    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._popupOpenPicture = document.querySelector('.popup_type_open-picture');
    }
    //Забирает разметку из html и клонирует содержимое шаблона карточки
    _getTemplate(){
        this._element = locators.cardTemplate.querySelector('.card').cloneNode(true);
        console.log('this._element', this._element);
        return this._element;
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
    _openPopupBigPicture = () => {
        openPopup(this._popupOpenPicture);
        locators.pictureInPopup.src =  this._element.querySelector('.card__image').src;
        locators.pictureInPopup.alt = this._element.querySelector('.card__title').textContent;
        locators.captionInPopup.textContent =  this._element.querySelector('.card__title').textContent;
    };

    //Переключает фон сердечка
    _toggleLikeCard(){
        this._element.querySelector('.card__like-button').classList.toggle("card__like-button_active"); //меняет фон сердечка
    };

    //Удаляет карточку
    _removeCard(){
        this._element.querySelector('.card__delete-button').closest('.card').remove();
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