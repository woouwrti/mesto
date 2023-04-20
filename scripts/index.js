import { initialCards } from './cards.js'
import { settingOfEnableValidation } from './validate.js'
import { Card as CardClass } from './Card.js'
import { FormValidator as FormValidatorClass } from './FormValidator.js'


const cardsContainer = document.querySelector('.elements');
const cardsContainerTemplate = document.querySelector('#element-template').content;

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditProfileButton = profile.querySelector('.profile__edit-button');
const profileAddImgButton = profile.querySelector('.profile__add-button');

const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = document.querySelector('#input-profile');
const popupProfileName = document.querySelector('#input-profile-name');
const popupProfileDesc = document.querySelector('#input-profile-description');
const popupProfileSaveButton = popupProfile.querySelector('.popup__save-button');

const popupCard = document.querySelector('#popup-card');
const popupCardForm = document.querySelector('#input-card');
const popupCardName = document.querySelector('#input-card-name');
const popupCardLink = document.querySelector('#input-card-link');
const popupCardSaveButton = popupCard.querySelector('.popup__save-button');

const popupZoomedImage = document.querySelector('#popup-img');
const popupZoomedImageImg = popupZoomedImage.querySelector('.popup__image');
const popupZoomedImageTitle = popupZoomedImage.querySelector('.popup__image-title');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const Card = new CardClass({
  cardsContainerTemplate: cardsContainerTemplate,
  popupZoomedImage: popupZoomedImage,
  popupZoomedImageImg: popupZoomedImageImg,
  popupZoomedImageTitle: popupZoomedImageTitle
});

const FormValidator = new FormValidatorClass(settingOfEnableValidation);

const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const openPopup = (popup) => {
  document.addEventListener('keydown', closeByEsc);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove('popup_opened');
}

const openProfileEditor = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDesc.value = profileDesc.textContent;
  FormValidator.enableButton(popupProfileSaveButton, settingOfEnableValidation.inactiveButtonClass);
  openPopup(popupProfile);
}

const saveProfileEditorChange = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDesc.value;
  closePopup(popupProfile);
}

function openCardEditor() {
  popupCardForm.reset();
  FormValidator.disableButton(popupCardSaveButton, settingOfEnableValidation.inactiveButtonClass);
  openPopup(popupCard);
}

function saveCardEditorChange(evt) {
  evt.preventDefault();
  const cardName = popupCardName.value;
  const cardLink = popupCardLink.value;
  cardsContainer.prepend(Card.createCard(cardName, cardLink));
  closePopup(popupCard);
}

initialCards.forEach(initialCard => cardsContainer.append(Card.createCard(initialCard.name, initialCard.link)));

profileEditProfileButton.addEventListener('click', openProfileEditor);
popupProfileForm.addEventListener('submit', saveProfileEditorChange);

profileAddImgButton.addEventListener('click', openCardEditor);
popupCardForm.addEventListener('submit', saveCardEditorChange);

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const listOfPopups = Array.from(document.querySelectorAll('.popup'));
listOfPopups.forEach((item) => {
  item.addEventListener('click',
    (evt) => {
      if (evt.target === evt.currentTarget) { closePopup(item) }
    });
});

FormValidator.enableValidation()
