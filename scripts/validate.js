const settingOfEnableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__profile-line',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...rest }) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

const setEventListeners = (formElement, settingOfEnableValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(settingOfEnableValidation.inputSelector));
  const buttonElement = formElement.querySelector(settingOfEnableValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settingOfEnableValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, settingOfEnableValidation);
    });
  });
};

const enableValidation = (settingOfEnableValidation) => {
  const formList = Array.from(document.querySelectorAll(settingOfEnableValidation.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingOfEnableValidation);
  });
};

enableValidation(settingOfEnableValidation);
