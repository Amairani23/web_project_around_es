import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor() {}

  _getInputValues() {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
  }

  setEventListeners(btnElement) {
    super.setEventListeners();
    btnElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });
  }

  close(modalElement) {
    modalElement.reset();
  }
}
