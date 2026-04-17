export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  //Clona el template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //Crea la tarjeta
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__image").src = this._link;

    return this._element;
  }

  //Activa o Desactiva el botón
  _handleLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  //Elimina la tarjeta
  _handleDeleteClick() {
    this._handleDeleteClick(this);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._data._id;
  }

  //configura listeners
  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link);
      });
  }
}
