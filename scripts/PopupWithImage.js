import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageImg = this._popup.querySelector('.popup__image');
    this._imageTitle = this._popup.querySelector('.popup__image-title');
  }

  open({name, link}) {
    this._imageTitle.textContent = name;
    this._imageImg.src = link;
    this._imageImg.alt = name;
    super.open();
  }

}
