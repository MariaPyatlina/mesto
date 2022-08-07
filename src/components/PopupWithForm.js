import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector); //окно попапа
        
        this.popupForm = this._popup.querySelector('.popup__form');  //форму ищем в попапе, который нашли в родительском классе.
        this._inputList = this.popupForm.querySelectorAll('.popup__input-field');  //все поля ввода в попапе
        this._buttonSubmit = this.popupForm.querySelector('.popup__save-button');  //кнопка Сохранить
        this._handleFormSubmit = handleFormSubmit; //функция выполняющаяя отправку для конкретной формы
        this._initialTitleButton = this._buttonSubmit.textContent;
        
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
        } )
    }

    close() { //При закрытии в форме сбрасываются поля ввода
        super.close();
        this.popupForm.reset();
    }

    renderLoading(isLoading){ //При загрузке данных меняется название кнопки
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        }
        else {
            this._buttonSubmit.textContent = this._initialTitleButton;
        }
    }
}