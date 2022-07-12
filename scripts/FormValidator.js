import { locators } from './locators.js';

export class FormValidator{
    constructor(setting, formElement){
        this._setting = setting;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._setting.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._setting.inputSelector));
    }

    //Добавляет класс с ошибкой в форму ввода
    _showInputError (inputElement, errorMessage){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._setting.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._setting.errorClass);
        console.log('Добавляет класс с ошибкой в форму ввода');
    }

    //Скрывает сообщение об ошибке на форме ввода
    hideErrorMessage (){
        this._inputList.forEach((item) => {
            this._hideInputError(item)});
            console.log('Скрывает сообщение с ошибкой');
    }

    //Удаляет класс с ошибкой из формы ввода  
    _hideInputError (inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._setting.inputErrorClass);
        errorElement.classList.remove(this._setting.errorClass);
        errorElement.textContent = '';
        console.log('Удаляет класс с ошибкой из формы ввода');
    }

    //Проверяет валидность поля ввода  
    _isValid(inputElement){
        console.log('Проверяет валидность поля ввода');
        //если значение в поле ввода не валидно - покажем ошибку
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage); 
        }
        else { //скроем ошибку
            this._hideInputError(inputElement);
        }
    }

    //Проверяет есть ли в инпутах хотя бы одно невалидное значение. Возвращает true , если находит
    _hasInvalidInput(){
        console.log('Проверяет есть ли в инпутах хотя бы одно невалидное значение. Возвращает true , если находит');
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    //Функция делает кнопку в форме неактивной
    _disableButton(){
        console.log('Функция делает кнопку в форме неактивной');
        this._buttonElement.classList.add(this._setting.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    //Переключает состояние кнопки Сохранить, если валидация пройдена или нет
    toggleButtonState(){
        console.log('Переключает состояние кнопки Сохранить, если валидация пройдена или нет');
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._setting.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        }
        else {
            this._buttonElement.classList.remove(this._setting.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', true);
        }
    }


    //Функция находит все поля ввода на форме и вешает на них слушателя на input. Инпут проверяется на валидность
    _setEventListener(){
        console.log('Функция находит все поля ввода на форме и вешает на них слушателя на input. Инпут проверяется на валидность');
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            });
        });
    }

    //Функция находит все формы и вешает на них обработчиков
    enableValidation(){
        //console.log('повесил обработчика', this._formElement);
        //this._setting.formSelector._setEventListener();
        console.log('Функция находит все формы и вешает на них обработчиков');
        this._formList = Array.from(document.querySelectorAll(this._setting.formSelector));

        this._formList.forEach((formElement) => {
        this._setEventListener();
        });
    }
}