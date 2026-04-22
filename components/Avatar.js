export default class UserInfo {
  constructor({ avatarSelector }) {
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getImageInfo() {
    const userInfo = {
      avatar: this._avatarElement.src,
    };

    return userInfo;
  }

  setImageInfo({ avatar }) {
    this._avatarElement.src = avatar;
  }
}
