import { Card } from "./Popup";

export class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
  }

  open(modalElement) {
    modalElement.classList.add("popup_is-opened");
  }

  close(modalElement) {
    modalElement.classList.remove("popup_is-opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        this.close(openedPopup);
      }
    }
  }

  setEventListeners(popup) {
    //botones ".popup__close"
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close(popup);
    });
    //caja ".popup"
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close(evt.target);
      }
    });
  }
}
