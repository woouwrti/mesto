// import { zoomCardImage } from './index.js'

export default class Card {

  constructor(data, template, handleCardClick) {
    this._data = data;
    this._cardElement = template.querySelector('.element').cloneNode(true);
    this.handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__button').addEventListener('mousedown',
      this.likeCard
    );

    this._cardElement.querySelector('.element__basket').addEventListener('mousedown',
      () => this.deleteCard()
    );

    this._cardElementPicture.addEventListener('click',
      () => this.handleCardClick(this._data.name, this._data.link));
  }

  likeCard() {
    this.classList.toggle('element__button_active');
  }

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
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
