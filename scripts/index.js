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
initialCards.forEach(initialCard => elements.append(createCard(initialCard.name, initialCard.link)));

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditProfileButton = profile.querySelector('.profile__edit-button');
const profileAddImgButton = profile.querySelector('.profile__add-button');

const popupProfile = document.getElementById('popup-profile');
const popupProfileForm = document.getElementById('input-profile');
const popupProfileName = document.getElementById('input-profile-name');
const popupProfileDesc = document.getElementById('input-profile-description');

const popupCard = document.getElementById('popup-card');
const popupCardForm = document.getElementById('input-card');
const popupCardName = document.getElementById('input-card-name');
const popupCardLink = document.getElementById('input-card-link');

const popupZoomedImage = document.getElementById('popup-img');
const popupZoomedImageImg = popupZoomedImage.querySelector('.popup__image');
const popupZoomedImageTitle = popupZoomedImage.querySelector('.popup__image-title');

function createCard(cardName, cardLink) {
  const elementTemplate = document.querySelector('#element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__picture').src = cardLink;
  cardElement.querySelector('.element__picture').alt = cardName;

  cardElement.querySelector('.element__button').addEventListener('click',
    function () {this.classList.toggle('element__button_active')});
  cardElement.querySelector('.element__basket').addEventListener('click',
    () => cardElement.remove());
  cardElement.querySelector('.element__picture').addEventListener('click',
    () => zoomCardImage(cardName, cardLink));

  return cardElement
}

function changePopupVisibleById (popupId) {
  const currentPopup = document.getElementById(popupId);
  currentPopup.classList.toggle('popup_opened');
}

function openProfileEditorById (id) {
  popupProfileName.value = profileName.textContent;
  popupProfileDesc.value = profileDesc.textContent;
  changePopupVisibleById(id);
}

function saveProfileEditorChangeById (id, event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDesc.value;
  changePopupVisibleById(id);
}

function openCardEditorById (id) {
  popupCardName.value = ''
  popupCardLink.value = '';
  changePopupVisibleById(id);
}

function saveCardEditorChangeById (id, event) {
  event.preventDefault();
  const cardName = popupCardName.value;
  const cardLink = popupCardLink.value;

  elements.prepend(createCard(cardName, cardLink));
  changePopupVisibleById(id);
}

function zoomCardImage (name, link) {
  popupZoomedImageTitle.textContent = name;
  popupZoomedImageImg.src = link;
  popupZoomedImageImg.alt = name;
  changePopupVisibleById('popup-img');
}

profileEditProfileButton.addEventListener('click', () => {openProfileEditorById('popup-profile')});
popupProfileForm.addEventListener('submit', () => saveProfileEditorChangeById('popup-profile', event));

profileAddImgButton.addEventListener('click', () => openCardEditorById('popup-card'));
popupCardForm.addEventListener('submit', () => saveCardEditorChangeById('popup-card', event));

document.querySelectorAll('.popup__close-button').forEach(element => {
  element.addEventListener('click', () => element.closest(".popup").classList.toggle('popup_opened'));
});



// console.log('page loaded!');
