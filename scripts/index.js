const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup');
const profilePopupForm = document.getElementById('profile-input');
const profilePopupName = document.getElementById('input-name');
const profilePopupDesc = document.getElementById('input-description');
const profilePopupClose = profilePopup.querySelector('.popup__close-button');

function changePopupVisible () {
  profilePopup.classList.toggle('popup_opened');
}

function openProfileEditor () {
  profilePopupName.value = profileName.textContent;
  profilePopupDesc.value = profileDesc.textContent;
  changePopupVisible();
}

function saveProfileChange (event) { 
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileDesc.textContent = profilePopupDesc.value;
  changePopupVisible();
}

profilePopupClose.addEventListener('click', changePopupVisible);
profileEditButton.addEventListener('click', openProfileEditor);
profilePopupForm.addEventListener('submit', saveProfileChange);