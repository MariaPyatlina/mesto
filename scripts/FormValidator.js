import { locators } from './Locators.js';


// const configuration = {
//     formSelector: '.popup__form',  //форма в попапе
//     inputSelector: '.popup__input-field', //поле ввода в форме
//     submitButtonSelector: '.popup__save-button',  //кнопка Сохранить на форме
//     inactiveButtonClass: 'popup__save-button_invalid',  //Неактивная кнопка Сохранить
//     inputErrorClass: 'popup__input-field_type_error',  // Поле ввода подсвечено с ошибкой
//     errorClass: 'popup__input-error_active'  //Текст ошибки становится видимым 
// };

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
        console.log('Ошибку показали');
    }

    hideErrorMessage (){
        console.log(this._inputList);
        this._inputList.forEach((item) => {
            console.log('hideErrorMessage', item);
            this._hideInputError(item)});
    }

    //Удаляет класс с ошибкой из формы ввода  
    _hideInputError (inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        console.log('errorElement', errorElement);
        inputElement.classList.remove(this._setting.inputErrorClass);
        errorElement.classList.remove(this._setting.errorClass);
        errorElement.textContent = '';
        console.log('errorElement.textContent', errorElement.textContent);
        console.log('Ошибку скрыли');
    }

    //Проверяет валидность поля ввода  
    _isValid(inputElement){
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
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    //Функция делает кнопку в форме неактивной
    _disableButton(){
        this._buttonElement.classList.add(this._setting.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    //Переключает состояние кнопки Сохранить, если валидация пройдена или нет
    toggleButtonState(){
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
        this._formList = Array.from(document.querySelectorAll(this._setting.formSelector));

        this._formList.forEach((formElement) => {
        this._setEventListener();
        });
    }
}