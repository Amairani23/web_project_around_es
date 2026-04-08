import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this.callback = callback;
    this.formElement = this._container.querySelector("form");
  }

  _getInputValues() {
    this._inputList = Array.from(this._formElement.querySelectorAll("input"));
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
      this.formElement.reset();
    });
  }
}
