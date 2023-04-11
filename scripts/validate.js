const settingOfEnableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__profile-line',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__profile-line_invalid',
  errorClass: 'popup__error_visible',
  profileAddImgButtonClass: '.profile__add-button',
};

const showInputError = (formElement, inputElement, inputErrorClass, errorMessage) => {
  // console.log(inputElement);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass)
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settingOfEnableValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settingOfEnableValidation.inputErrorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, settingOfEnableValidation.inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
}

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...rest }) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  };
};

const setEventListeners = (formElement, settingOfEnableValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(settingOfEnableValidation.inputSelector));
  const buttonElement = formElement.querySelector(settingOfEnableValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settingOfEnableValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settingOfEnableValidation);
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
