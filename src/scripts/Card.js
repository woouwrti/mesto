import UserInfo from "./UserInfo";

export default class Card {

  constructor(
    { name, link, likes, owner, _id },
    userID,
    template,
    handleCardClick,
    handleLikeCard,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._userID = userID;
    this._isLiked = false;

    this._cardElement = template.querySelector('.element').cloneNode(true);
    this._cardBasket = this._cardElement.querySelector('.element__basket');
    this._cardLikeButton = this._cardElement.querySelector('.element__button');
    this._cardElementPicture = this._cardElement.querySelector('.element__picture');
    this._cardLikeCount = this._cardElement.querySelector('.element__likes-count');
    this._cardTitle = this._cardElement.querySelector('.element__title');

    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
  }

  _setEventListeners() {

    this._cardLikeButton.addEventListener('mousedown',
      () => this._handleLikeCard(this._id, this._isLiked)
    );

    this._cardElementPicture.addEventListener('click',
      () => this._handleCardClick(this._name, this._link)
    );

    if (this._owner._id == this._userID) {
      this._cardBasket.addEventListener('mousedown',
        () => this._handleDeleteCard(this._id)
      );
    }

  }

  getCardID() {
    return this._id
  }

  setLikes(likes) {
    this._likes = likes;
  }

  refreshLikesButton() {

    if (this._likes.some(userWhoLiked => userWhoLiked._id === this._userID)) {
      this._cardLikeButton.classList.add('element__button_active');
      this._isLiked = true;
    } else {
      this._cardLikeButton.classList.remove('element__button_active');
      this._isLiked = false;
    }

    if (this._likes.length) {
      this._cardLikeCount.textContent = this._likes.length;
    } else {
      this._cardLikeCount.textContent = '';
    }

  }

  createCard = () => {

    this._cardTitle.textContent = this._name;
    this._cardElementPicture.src = this._link;
    this._cardElementPicture.alt = this._name;

    this._setEventListeners();

    if (this._owner._id != this._userID) {
      this._cardBasket.remove();
      this._cardBasket = null;
    }

    this.refreshLikesButton()

    return this._cardElement
  }

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

}
