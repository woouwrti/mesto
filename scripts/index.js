import { initialCards } from './cards.js' // format { name, link }
import { validationSettings } from './validate.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

const cardsContainer = document.querySelector('.elements');
const cardsContainerTemplate = document.querySelector('#element-template').content;

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditProfileButton = profile.querySelector('.profile__edit-button');
const profileAddImgButton = profile.querySelector('.profile__add-button');

const userData = new UserInfo({ selectorName: profileName.textContent, selectorDesc: profileDesc.textContent })

const popupProfileName = document.querySelector('#input-profile-name');
const popupProfileDesc = document.querySelector('#input-profile-description');
const popupProfile = new PopupWithForm('#popup-profile',
  () => {
    userData.setUserInfo({
      selectorName: popupProfileName.value,
      selectorDesc: popupProfileDesc.value
    })
    popupProfile.close()
  });
popupProfile.setEventListeners();
profileEditProfileButton.addEventListener('click',
  () => {
    const data = userData.getUserInfo()
    popupProfileName.value = data.name;
    popupProfileDesc.value = data.desc;
    formValidators['profile-form'].resetValidation();
    formValidators['profile-form'].enableButton();
    popupProfile.open()
  });

const popupCardName = document.querySelector('#input-card-name');
const popupCardLink = document.querySelector('#input-card-link');
const popupCard = new PopupWithForm('#popup-card',
  () => {
    const cardName = popupCardName.value;
    const cardLink = popupCardLink.value;
    cardsContainer.prepend(createCard({ name: cardName, link: cardLink }));
    popupCard.close()
  });
popupCard.setEventListeners();
profileAddImgButton.addEventListener('click',
  () => {
    formValidators['card-form'].resetValidation();
    formValidators['card-form'].disableButton();
    popupCard.open()
  });

const popupImage = new PopupWithImage('#popup-img');
popupImage.setEventListeners();

const createCard = (data) => {
  const newCard = new Card(data, cardsContainerTemplate, () => popupImage.open(data))
  return newCard.createCard()
}

const cardSection = new Section({ items: initialCards, renderer: createCard }, cardsContainer);
cardSection.rendererAllItems()

// const listOfPopups = Array.from(document.querySelectorAll('.popup'));

// console.log(listOfPopups)
// listOfPopups.forEach(item => console.log(item.id))

// listOfPopups.forEach((popup) => {
//   const popupItem = new Popup(popup);
// });

// const closeByEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }
// const openPopup = (popup) => {
//   document.addEventListener('keydown', closeByEsc);
//   popup.classList.add('popup_opened');
// }
// const closePopup = (popup) => {
//   document.removeEventListener('keydown', closeByEsc);
//   popup.classList.remove('popup_opened');
// }

// const openProfileEditor = () => {
//   popupProfileName.value = profileName.textContent;
//   popupProfileDesc.value = profileDesc.textContent;
//   formValidators['profile-form'].resetValidation();
//   formValidators['profile-form'].enableButton();
//   openPopup(popupProfile);
// }
// const saveProfileEditorChange = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = popupProfileName.value;
//   profileDesc.textContent = popupProfileDesc.value;
//   closePopup(popupProfile);
// }

// const openCardEditor = () => {
//   popupCardForm.reset();
//   formValidators['card-form'].resetValidation();
//   formValidators['card-form'].disableButton();
//   openPopup(popupCard);
// }
// const saveCardEditorChange = (evt) => {
//   evt.preventDefault();
//   const cardName = popupCardName.value;
//   const cardLink = popupCardLink.value;
//   cardsContainer.prepend(createCard({ name: cardName, link: cardLink }));
//   closePopup(popupCard);
// }

// export const zoomCardImage = (name, link) => {
//   popupZoomedImageTitle.textContent = name;
//   popupZoomedImageImg.src = link;
//   popupZoomedImageImg.alt = name;
//   openPopup(popupZoomedImage);
// }

// initialCards.forEach(initialCard => {
//   cardsContainer.append(createCard(initialCard))
// });

// profileEditProfileButton.addEventListener('click', openProfileEditor);
// popupProfileForm.addEventListener('submit', saveProfileEditorChange);

// profileAddImgButton.addEventListener('click', openCardEditor);
// popupCardForm.addEventListener('submit', saveCardEditorChange);

// listOfPopups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup)
//     }
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup)
//     }
//   })
// })
