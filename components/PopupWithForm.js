import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this.handleFormSubmit = callback;
    this.formElement = this._container.querySelector("form");
  }

  _getInputValues() {
    this._inputList = Array.from(this.formElement.querySelectorAll("input"));

    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
      this.close();
      this.formElement.reset();
    });
  }
}
