//Добавляет класс с ошибкой в форму ввода
const showInputError = (formElement, inputElement, errorMessage, setting) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(inputElement.id);

    inputElement.classList.add(setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setting.errorClass);
  }
  
//Удаляет класс с ошибкой из формы ввода  
const hideInputError = (formElement, inputElement, setting) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = '';
  }
  
//Проверяет валидность поля ввода  
const isValid = (formElement, inputElement, setting) => {
    //если значение в поле ввода не валидно
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, setting); 
        console.log('сработал вызов функции показать ошибку');
        console.log('ошибка', inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement, setting);
        console.log('сработал вызов функции скрыть ошибку');
    }
  }

//Функция находит все поля ввода на форме и вешает на них слушателя на input. Инпут проверяется на валидность
const setEventListener = (formElement, setting) => {
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, setting);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, setting);
            toggleButtonState(inputList, buttonElement, setting);
        });
    });
    formElement.addEventListener('reset', () => disableButton(buttonElement, setting));
}

//Функция делает кнопку в форме неактивной
const disableButton = (buttonElement, setting) => {
    buttonElement.classList.add(setting.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
}

//Функция находит все формы и вешает на них обработчиков
const enableValidation = (setting) => {
    const formList = Array.from(document.querySelectorAll(setting.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(formElement, setting);
    });
}

//Проверяет есть ли в инпутах хотя бы одно невалидное значение. Возвращает true , если находит
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//Переключает состояние кнопки Сохранить, если валидация пройдена или нет
const toggleButtonState = (inputList, buttonElement, setting) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(setting.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
    else {
        buttonElement.classList.remove(setting.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input-field_type_error',
    errorClass: 'popup__input-error_active'
});