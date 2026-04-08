export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._btnClose = this._container.querySelector(".popup__close");
    this._blackBorder = document.querySelectorAll(".popup");
  }

  open() {
    this._container.classList.add("popup_is-opened");
  }

  close() {
    this._container.classList.remove("popup_is-opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        this.close();
      }
    }
  }

  setEventListeners() {
    //botones ".popup__close"
    this._btnClose.addEventListener("click", () => {
      this.close();
    });

    //caja ".popup"
    this._blackBorder.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close(evt.target);
      }
    });
  }
}
