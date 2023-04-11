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

function createCard(cardName, cardLink) {
  const cardElement = cardsContainerTemplate.querySelector('.element').cloneNode(true);
  const cardElementPicture = cardElement.querySelector('.element__picture')

  cardElement.querySelector('.element__title').textContent = cardName;
  cardElementPicture.src = cardLink;
  cardElementPicture.alt = cardName;

  cardElement.querySelector('.element__button').addEventListener('click',
    function () { this.classList.toggle('element__button_active') });
  cardElement.querySelector('.element__basket').addEventListener('click',
    () => cardElement.remove());
  cardElementPicture.addEventListener('click',
    () => zoomCardImage(cardName, cardLink));

  return cardElement
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', closeByEsc);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove('popup_opened');
}

function openProfileEditor() {
  popupProfileName.value = profileName.textContent;
  popupProfileDesc.value = profileDesc.textContent;
  enableButton(popupProfileSaveButton, settingOfEnableValidation.inactiveButtonClass);
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
  disableButton(popupCardSaveButton, settingOfEnableValidation.inactiveButtonClass);
  openPopup(popupCard);
}

function saveCardEditorChange(event) {
  event.preventDefault();
  const cardName = popupCardName.value;
  const cardLink = popupCardLink.value;
  cardsContainer.prepend(createCard(cardName, cardLink));
  closePopup(popupCard);
}

function zoomCardImage(name, link) {
  popupZoomedImageTitle.textContent = name;
  popupZoomedImageImg.src = link;
  popupZoomedImageImg.alt = name;
  openPopup(popupZoomedImage);
}

initialCards.forEach(initialCard => cardsContainer.append(createCard(initialCard.name, initialCard.link)));

profileEditProfileButton.addEventListener('click', openProfileEditor);
popupProfileForm.addEventListener('submit', saveProfileEditorChange);

profileAddImgButton.addEventListener('click', openCardEditor);
popupCardForm.addEventListener('submit', saveCardEditorChange);

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupZoomedImage.addEventListener('click',
  (evt) => { if (evt.target === evt.currentTarget) { closePopup(popupZoomedImage) } });
