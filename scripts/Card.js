export class Card {
  #cardsContainerTemplate;
  #popupZoomedImage;
  #popupZoomedImageImg;
  #popupZoomedImageTitle;

  constructor(setting) {
    this.#cardsContainerTemplate = setting.cardsContainerTemplate;
    this.#popupZoomedImage = setting.popupZoomedImage;
    this.#popupZoomedImageImg = setting.popupZoomedImageImg;
    this.#popupZoomedImageTitle = setting.popupZoomedImageTitle;
  }

  #closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.#closePopup(document.querySelector('.popup_opened'));
    }
  }

  #openPopup = (popup) => {
    document.addEventListener('keydown', this.#closeByEsc);
    popup.classList.add('popup_opened');
  }

  #closePopup = (popup) => {
    document.removeEventListener('keydown', this.#closeByEsc);
    popup.classList.remove('popup_opened');
  }

  #zoomCardImage = (name, link) => {
    this.#popupZoomedImageTitle.textContent = name;
    this.#popupZoomedImageImg.src = link;
    this.#popupZoomedImageImg.alt = name;
    this.#openPopup(this.#popupZoomedImage);
  }

  createCard = (cardName, cardLink) => {
    const cardElement = this.#cardsContainerTemplate.querySelector('.element').cloneNode(true);
    const cardElementPicture = cardElement.querySelector('.element__picture')

    cardElement.querySelector('.element__title').textContent = cardName;
    cardElementPicture.src = cardLink;
    cardElementPicture.alt = cardName;

    cardElement.querySelector('.element__button').addEventListener('click',
      function () { this.classList.toggle('element__button_active') });

    cardElement.querySelector('.element__basket').addEventListener('click',
      () => cardElement.remove());

    cardElementPicture.addEventListener('click',
      () => this.#zoomCardImage(cardName, cardLink));

    return cardElement
  }

}
