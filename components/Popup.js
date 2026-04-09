export default class Popup {
  constructor(selector) {
    this._container = document.querySelector(selector);
    this._btnClose = this._container.querySelector(".popup__close");
  }

  open() {
    this._container.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._container.classList.remove("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._btnClose.addEventListener("click", () => {
      this.close();
    });

    this._container.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
