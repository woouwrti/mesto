import Popup from './Popup.js'

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._submitButtonOriginalTitle = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', () => {
      this._handleSubmit(this._target);
    });
  }

  setTarget(target) {
    this._target = target;
  }

  setAwaitTitle() {
    this._submitButton.textContent = 'Выполняем...';
  }

  setOriginalTitle() {
    this._submitButton.textContent = this._submitButtonOriginalTitle;
  }

}
