export default class UserInfo {

  constructor({ selectorName, selectorDesc }) {
    this._profileName = document.querySelector(selectorName);
    this._profileDesc = document.querySelector(selectorDesc);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      desc: this._profileDesc.textContent
    }
  }

  setUserInfo({ name, desc }) {
    this._profileName.textContent = name;
    this._profileDesc.textContent = desc;
  }

}
