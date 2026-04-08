//Validador
export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButton = this._formElement.querySelector(".popup__button");
    this._inputList = Array.from(this._formElement.querySelectorAll("input"));
  }

  // mostrar error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // ocultar error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Valida un input individual
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Inicia limpiando los mensajes de error
  _clearValdation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // Revisa si todo el formulario es válido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Habilita o deshabilita el botón
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add("popup__submit_disabled");
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove("popup__submit_disabled");
      this._submitButton.disabled = false;
    }
  }

  // Configura listeners de todos los inputs
  _setInputListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Inicializa validación del formulario
  setEventListeners() {
    this._setInputListeners();
    this._clearValdation();
    this._toggleButtonState(); // inicializa el estado del botón
    this._formElement.addEventListener("submit", (evt) => {
      if (this._hasInvalidInput()) {
        evt.preventDefault();
      }
    });
  }
}
