
export default class FormValidator{
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
    }

    //Скрывает сообщение об ошибке на форме ввода
    hideErrorMessage (){
        this._inputList.forEach((item) => {
            this._hideInputError(item)});
    }

    //Удаляет класс с ошибкой из формы ввода  
    _hideInputError (inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._setting.inputErrorClass);
        errorElement.classList.remove(this._setting.errorClass);
        errorElement.textContent = '';
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

    //Функция вешает обработчиков на форму, которую передали в конструктор
    enableValidation(){
        this._setEventListener();
    }
}