export default class UserInfo {
  constructor({ selectorName, selectorDesc }) {
    this._selectorName = selectorName;
    this._selectorDesc = selectorDesc;

    this._profileName = document.querySelector('.profile__name');
    this._profileDesc = document.querySelector('.profile__description');
  }

  getUserInfo() {
    return { name: this._selectorName, desc: this._selectorDesc }
  }

  setUserInfo({ selectorName, selectorDesc }) {
    this._selectorName = selectorName;
    this._selectorDesc = selectorDesc;

    this._profileName.textContent = selectorName;
    this._profileDesc.textContent = selectorDesc;
  }
}
