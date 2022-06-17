//Добавляет класс с ошибкой в форму ввода
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${element.id}-error`);

    inputElement.classList.add("popup__input-field_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }
  
//Удаляет класс с ошибкой из формы ввода  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${element.id}-error`);

    inputElement.classList.remove("popup__input-field_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = '';
  }
  
//Проверяет валидность поля ввода  
  const isValid = (formElement, inputElement) => {
    //если значение в поле ввода не валидно
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage); 
      console.log('сработал вызов функции показать ошибку');
      console.log('ошибка', inputElement.validationMessage);
    }
    else {
      hideInputError(formElement, inputElement);
      console.log('сработал вызов функции скрыть ошибку');
    }
  }





//Функция находит все поля ввода на форме и вешает на них слушателя на input. Инпут проверяется на валидность
const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
    const buttonElement = formElement.querySelector('.popup__save-button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}


//Функция находит все формы и вешает на них обработчиков
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      setEventListener(formElement);
    });
}  

//Проверяет есть ли в инпутах хотя бы одно невалидное значение. Возвращает true , если находит
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//Переключает состояние кнопки Сохранить, если валидация пройдена и нет
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__save-button_invalid");
    }
    else {
        buttonElement.classList.remove("popup__save-button_invalid");
    }
}