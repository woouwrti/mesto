export default class UserInfo {

  constructor({ selectorName, selectorDesc, selectorAvatar, userID }) {
    this._profileName = document.querySelector(selectorName);
    this._profileDesc = document.querySelector(selectorDesc);
    this._profileAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      desc: this._profileDesc.textContent,
      avatarSrc: this._profileAvatar.src
    }
  }

  getUserID() {
    return this._userID
  }

  setUserData({ name, desc, userID }) {
    this._profileName.textContent = name;
    this._profileDesc.textContent = desc;
    this._userID = userID;
  }

  setUserName(name) {
    this._profileName.textContent = name;
  }

  setUserDesc(desc) {
    this._profileDesc.textContent = desc;
  }

  setUserAvatar(avatarSrc) {
    this._profileAvatar.src = avatarSrc;
  }
}
