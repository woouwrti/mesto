import '../pages/index.css';

import { initialCards } from './cards.js' // format { name, link }
import { validationSettings } from './constants.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

const cardsContainer = document.querySelector('.elements');
const cardsContainerTemplate = document.querySelector('#element-template').content;

const profile = document.querySelector('.profile');
const profileEditProfileButton = profile.querySelector('.profile__edit-button');
const profileAddImgButton = profile.querySelector('.profile__add-button');

const userData = new UserInfo({ selectorName: '.profile__name', selectorDesc: '.profile__description' });

const popupProfileName = document.querySelector('#input-profile-name');
const popupProfileDesc = document.querySelector('#input-profile-description');
const popupProfile = new PopupWithForm('#popup-profile',
  () => {
    userData.setUserInfo({
      name: popupProfileName.value,
      desc: popupProfileDesc.value
    })
    popupProfile.close();
  });
popupProfile.setEventListeners();
profileEditProfileButton.addEventListener('click',
  () => {
    const data = userData.getUserInfo();
    popupProfileName.value = data.name;
    popupProfileDesc.value = data.desc;
    formValidators['profile-form'].resetValidation();
    formValidators['profile-form'].enableButton();
    popupProfile.open();
  });

const popupCardName = document.querySelector('#input-card-name');
const popupCardLink = document.querySelector('#input-card-link');
const popupCard = new PopupWithForm('#popup-card',
  () => {
    const cardName = popupCardName.value;
    const cardLink = popupCardLink.value;
    cardSection.addItem(createCard({ name: cardName, link: cardLink }));
    popupCard.close();
  });
popupCard.setEventListeners();
profileAddImgButton.addEventListener('click',
  () => {
    formValidators['card-form'].resetValidation();
    formValidators['card-form'].disableButton();
    popupCard.open();
  });

const popupImage = new PopupWithImage('#popup-img');
popupImage.setEventListeners();

const createCard = (data) => {
  const newCard = new Card(data, cardsContainerTemplate, () => popupImage.open(data));
  return newCard.createCard()
}

const cardSection = new Section({ items: initialCards, renderer: createCard }, cardsContainer);
cardSection.rendererAllItems();
