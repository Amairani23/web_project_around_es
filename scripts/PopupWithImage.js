import Popup from "./Popup";

class PopupWithImage extends Popup {
  open(modalElement) {
    modalElement.src = this._link;
    modalElement.alt = this._name;
  }
}
