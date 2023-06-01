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

  setUserName(name) {
    this._profileName.textContent = name;
  }

  setUserDesc(desc) {
    this._profileDesc.textContent = desc;
  }

  setUserAvatar(avatarSrc) {
    this._profileAvatar.src = avatarSrc;
  }

  setUserID(userID) {
    this._userID = userID;
  }
}
