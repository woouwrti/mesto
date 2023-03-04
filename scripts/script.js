let user = {
  name: 'Жак-Ив Кусто',
  description: 'Исследователь океана',
  profileImage: "./images/profile.jpg"
}

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAvatar = profile.querySelector('.profile__avatar');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
profileName.textContent = user.name
profileDesc.textContent = user.description
profileAvatar.src = user.profileImage

const editProfile = document.querySelector('.edit-profile');
const editProfileSaveButton = editProfile.querySelector('.edit-profile__save-button');
const editProfileCloseButton = editProfile.querySelector('.edit-profile__close-button');
const editProfileName = document.getElementById("name");
const editProfileDesc = document.getElementById("desc");



for (let i = 0; i < 6; i++) {
  let element = document.getElementById(i).querySelector('.element__button');
  element.addEventListener('click', function () { element.classList.toggle('element__button_active') });
}

function changeEditProfileDisplay () {
  editProfile.classList.toggle('edit-profile_is-opened');
}

function openProfileEditor () {
  editProfileName.value = profileName.textContent;
  editProfileDesc.value = profileDesc.textContent;
  changeEditProfileDisplay();
}

function saveProfileChange () { 
  profileName.textContent = editProfileName.value;
  profileDesc.textContent = editProfileDesc.value;
  changeEditProfileDisplay();
}

profileEditButton.addEventListener('click', openProfileEditor);
editProfileSaveButton.addEventListener('click', saveProfileChange);
editProfileCloseButton.addEventListener('click', changeEditProfileDisplay);