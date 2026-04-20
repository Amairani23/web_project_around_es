import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._handleSubmit = null;
    this._card = null;
    this._form = this._container.querySelector("form");
  }

  setCard(card) {
    this._card = card;
  }

  setHandleSubmit(fn) {
    this._handleSubmit = fn;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
  }
}
