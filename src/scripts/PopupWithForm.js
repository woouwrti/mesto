import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitAction) {
    super(popupSelector);

    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputsList = this._popupForm.querySelectorAll('.popup__profile-line');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
    this._submitButtonOriginalTitle = this._submitButton.textContent;

    this._inputValues = {};

    this._submitAction = submitAction;
  }

  _getInputValues() {
    this._inputsList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close()
  }

  setAwaitTitle() {
    this._submitButton.textContent = 'Выполняем...';
  }

  setOriginalTitle() {
    this._submitButton.textContent = this._submitButtonOriginalTitle;
  }

}
