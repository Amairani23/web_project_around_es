import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";

let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const openEditModal = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description",
);
const editForm = document.querySelector("#edit-profile-form");
const openCardBtn = document.querySelector(".profile__add-button");
const containerList = document.querySelector(".cards__list");
const formNewCard = document.querySelector("#new-card-form");
const nameInputForm = formNewCard.querySelector(".popup__input_type_card-name");
const imageInputForm = formNewCard.querySelector(".popup__input_type_url");
const imagenPopup = document.querySelector("#image-popup");

//Popup de Edit
openEditModal.addEventListener("click", function () {
  fillProfileForm();

  const popup = new Popup("#edit-popup");
  popup.open();
  popup.setEventListeners();

  validationInputs();
});

//Editar perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  const popup = new Popup("#edit-popup");
  popup.close();
}

editForm.addEventListener("submit", handleProfileFormSubmit);

//Popup de Cards
openCardBtn.addEventListener("click", function () {
  const popup = new Popup("#new-card-popup");
  popup.open();
  popup.setEventListeners();
  formNewCard.reset();
  validationInputs();
});

//Crear Cards
function renderCard(data) {
  const card = new Card(data, "#cards-template");
  const cardElement = card.generateCard();
  containerList.prepend(cardElement);

  const popup = new Popup("#new-card-popup");
  popup.close();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: nameInputForm.value,
    link: imageInputForm.value,
  };

  renderCard(data);
}

formNewCard.addEventListener("submit", handleCardFormSubmit);

//Tecla: Escape;
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

//Muestra las tarjetas
initialCards.forEach((item) => {
  renderCard(item);
});

//Validación de formulario
const config = {
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_error",
};

function validationInputs() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.setEventListeners();
  });
}

//Popup de Imagen
const cardImage = Array.from(document.querySelectorAll(".card__image"));

const imagenPop = new PopupWithImage("#image-popup");
imagenPop.setEventListeners();

cardImage.forEach((item) => {
  item.addEventListener("click", () => {
    imagenPop.open(item.src);
  });
});
