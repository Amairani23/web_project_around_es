class UserInfo {
  constructor({ nameInput, descriptionInput }) {
    this._nameInput = nameInput;
    this._descriptionInput = descriptionInput;
  }

  getUserInfo() {
    let profileTitle = document.querySelector(".profile__title");
    let profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = this._nameInput.value;
    profileDescription.textContent = this._descriptionInput.value;
  }

  setUserInfo() {
    let profileTitle = document.querySelector(".profile__title");
    let profileDescription = document.querySelector(".profile__description");

    this._nameInput.value = profileTitle.textContent;
    this._descriptionInput.value = profileDescription.textContent;
  }
}
