import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this.handleFormSubmit = callback;
    this.formElement = this._container.querySelector("form");
    this._submitButton = this._container.querySelector(".popup__button");
    this._originalButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = Array.from(this.formElement.querySelectorAll("input"));

    const formValues = {};

    this._inputList.forEach((input) => {
      //se usa el atributo HTML "name" como clave dinámica
      formValues[input.name] = input.value;
      //valores como los agrega:
      //formValues["name"] = "Juan"
      //formValues["about"] = "Developer"
      //Resultado: { name: "Juan", about: "Developer"}
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt) => {
      console.log("SUBMIT FUNCIONA");
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._originalButtonText;
      this._submitButton.disabled = false;
    }
  }
}
