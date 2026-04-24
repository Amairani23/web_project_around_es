import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.imageElement = this._container.querySelector(".popup__image");
  }
  open(url) {
    super.open();
    this.imageElement.src = url;
  }
}
