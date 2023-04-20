export class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;

  constructor(setting) {
    this.#formSelector = setting.formSelector;
    this.#inputSelector = setting.inputSelector;
    this.#submitButtonSelector = setting.submitButtonSelector;
    this.#inactiveButtonClass = setting.inactiveButtonClass;
    this.#inputErrorClass = setting.inputErrorClass;
  }

  #showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass)
    errorElement.textContent = inputElement.validationMessage;
  };

  #hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass)
    errorElement.textContent = '';
  };

  #checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this.#showInputError(formElement, inputElement);
    } else {
      this.#hideInputError(formElement, inputElement);
    }
  };

  #hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  #toggleButtonState = (inputList, buttonElement) => {
    if (this.#hasInvalidInput(inputList)) {
      this.disableButton(buttonElement);
    } else {
      this.enableButton(buttonElement);
    };
  };

  disableButton = (buttonElement) => {
    buttonElement.classList.add(this.#inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }

  enableButton = (buttonElement) => {
    buttonElement.classList.remove(this.#inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  #setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.#inputSelector));
    const buttonElement = formElement.querySelector(this.#submitButtonSelector);

    this.#toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(formElement, inputElement);
        this.#toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this.#formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this.#setEventListeners(formElement);
    });
  };

}
