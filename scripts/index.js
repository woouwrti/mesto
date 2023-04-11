const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
initialCards.forEach(initialCard => elements.append(createCard(initialCard.name, initialCard.link)));

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditProfileButton = profile.querySelector('.profile__edit-button');
const profileAddImgButton = profile.querySelector('.profile__add-button');

const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('#input-profile');
const popupProfileName = document.querySelector('#input-profile-name');
const popupProfileDesc = document.querySelector('#input-profile-description');

const popupCard = document.querySelector('#popup-card');
const popupCardForm = document.querySelector('#input-card');
const popupCardName = document.querySelector('#input-card-name');
const popupCardLink = document.querySelector('#input-card-link');

const popupZoomedImage = document.querySelector('#popup-img');
const popupZoomedImageImg = popupZoomedImage.querySelector('.popup__image');
const popupZoomedImageTitle = popupZoomedImage.querySelector('.popup__image-title');

function createCard(cardName, cardLink) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__picture').src = cardLink;
  cardElement.querySelector('.element__picture').alt = cardName;

  cardElement.querySelector('.element__button').addEventListener('click',
    function () { this.classList.toggle('element__button_active') });
  cardElement.querySelector('.element__basket').addEventListener('click',
    () => cardElement.remove());
  cardElement.querySelector('.element__picture').addEventListener('click',
    () => zoomCardImage(cardName, cardLink));

  return cardElement
}

function openPopup(popup) {
  document.addEventListener('keydown', closeByEsc);

  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfileEditor() {
  popupProfileName.value = profileName.textContent;
  popupProfileDesc.value = profileDesc.textContent;
  openPopup(popupProfile);
}

function saveProfileEditorChange(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDesc.value;
  closePopup(popupProfile);
}

function openCardEditor() {
  popupCardForm.reset();
  openPopup(popupCard);
}

function saveCardEditorChange(event) {
  event.preventDefault();
  const cardName = popupCardName.value;
  const cardLink = popupCardLink.value;
  elements.prepend(createCard(cardName, cardLink));
  closePopup(popupCard);
}

function closeByEsc (event) {
  if (event.key === 'Escape') {
    closePopup(popupCard);
    closePopup(popupProfile);
    closePopup(popupZoomedImage);
  }
}

function zoomCardImage(name, link) {
  popupZoomedImageTitle.textContent = name;
  popupZoomedImageImg.src = link;
  popupZoomedImageImg.alt = name;
  openPopup(popupZoomedImage);
}

profileEditProfileButton.addEventListener('click', () => openProfileEditor());
popupProfileForm.addEventListener('submit', (event) => saveProfileEditorChange(event));

profileAddImgButton.addEventListener('click', () => openCardEditor());
popupCardForm.addEventListener('submit', (event) => saveCardEditorChange(event));

const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupZoomedImage.addEventListener('click',
  (event) => { if (event.target.id === 'popup-img') {closePopup(popupZoomedImage)}});
