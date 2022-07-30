import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector); //окно попапа
        this._handleFormSubmit = handleFormSubmit; //функция выполняющаяя отправку для конкретной формы
        this.popupForm = document.querySelector(popupSelector).querySelector('.popup__form');  //форма в попапе
        this._inputList = this.popupForm.querySelectorAll('.popup__input-field');  //все поля ввода в попапе
        this._buttonSubmit = this.popupForm.querySelector('.popup__save-button');  //кнопка Сохранить
        
    }

    _getInputValues(){ //Собирает данные всех полей формы
        this._formValues = {};
        this._inputList.forEach((item) => {
            this._formValues[item.name] = item.value; 
        })
        return this._formValues;
    }

    setInputValue(data) { // Возвращение input
        this._inputList.forEach((input) => {
        input.value = data[input.name];
        });
    }

    setEventListeners(){
        super.setEventListeners(); //вешает слушателей как в родительском классе (на закрытие попапа)
        this.popupForm.addEventListener('submit', (evt) => { //вешает слушателя на кнопку Сохранить
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        } )
    }

    close() { //При закрытии в форме сбрасываются поля ввода
        super.close();
        this.popupForm.reset();
    }
}