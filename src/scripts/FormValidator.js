export default class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;

  constructor(formElement, setting) {
    this.#formSelector = setting.formSelector;
    this.#inputSelector = setting.inputSelector;
    this.#submitButtonSelector = setting.submitButtonSelector;
    this.#inactiveButtonClass = setting.inactiveButtonClass;
    this.#inputErrorClass = setting.inputErrorClass;

    this._formElement = formElement;
  }

  #showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass)
    errorElement.textContent = inputElement.validationMessage;
  };

  #hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass)
    errorElement.textContent = '';
  };

  #checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  };

  #hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  #toggleButtonState = () => {
    if (this.#hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    };
  };

  disableButton = () => {
    this._buttonElement.classList.add(this.#inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  }

  enableButton = () => {
    this._buttonElement.classList.remove(this.#inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  resetValidation = () => {
    this._inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement)
    });
  }

  enableValidation = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this.#inputSelector));
    this._buttonElement = this._formElement.querySelector(this.#submitButtonSelector);

    this.#toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  };

}
