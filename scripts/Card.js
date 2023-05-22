// import { zoomCardImage } from './index.js'

export class Card {

  constructor(data, template, handleCardClick) {
    this._data = data;
    this._cardElement = template.querySelector('.element').cloneNode(true);
    this.handleCardClick = handleCardClick;

    // this._zoomCardImage = zoomCardImage;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__button').addEventListener('mousedown',
      function () { this.classList.toggle('element__button_active') });

    this._cardElement.querySelector('.element__basket').addEventListener('mousedown',
      () => this._cardElement.remove());

    this._cardElementPicture.addEventListener('click',
      () => this.handleCardClick(this._data.name, this._data.link));
  }

  createCard = () => {
    this._cardElementPicture = this._cardElement.querySelector('.element__picture');

    this._cardElement.querySelector('.element__title').textContent = this._data.name;
    this._cardElementPicture.src = this._data.link;
    this._cardElementPicture.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement
  }

}
