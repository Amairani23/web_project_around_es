import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";

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

let openEditModal = document.querySelector(".profile__edit-button");
let editModal = document.querySelector("#edit-popup");
let closeEditModal = editModal.querySelector(".popup__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let nameInput = editModal.querySelector(".popup__input_type_name");
let descriptionInput = editModal.querySelector(
  ".popup__input_type_description",
);
const editForm = document.querySelector("#edit-profile-form");

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  validationInputs();
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
  formNewCard.reset();
  editForm.reset();
}

openEditModal.addEventListener("click", handleOpenEditModal);

closeEditModal.addEventListener("click", () => {
  closeModal(editModal);
  // editModal es el modal específico
});

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editModal);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

const cardContainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards-template");
const cardPopup = document.querySelector("#new-card-popup");
const openCardBtn = document.querySelector(".profile__add-button");
const containerList = document.querySelector(".cards__list");
const formNewCard = document.querySelector("#new-card-form");
const nameInputForm = formNewCard.querySelector(".popup__input_type_card-name");
const imageInputForm = formNewCard.querySelector(".popup__input_type_url");
const imagenPopup = document.querySelector("#image-popup");
const imagenPopupElement = imagenPopup.querySelector(".popup__image");
const captionPopupImage = imagenPopup.querySelector(".popup__caption");

function renderCard(data) {
  const card = new Card(data, "#cards-template");
  const cardElement = card.generateCard();
  containerList.prepend(cardElement);
}

openCardBtn.addEventListener("click", function () {
  openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: nameInputForm.value,
    link: imageInputForm.value,
  };

  renderCard(data);

  closeModal(cardPopup);
}

formNewCard.addEventListener("submit", handleCardFormSubmit);

const popups = document.querySelectorAll(".popup");
const popup = new Popup(popups);
popup.setEventListeners();

//Cerrar ventana en superposición
// const popups = document.querySelectorAll(".popup");
// popups.forEach((popup) => {
//   setupPopupEventListeners(popup);
// });

// function setupPopupEventListeners(popup) {
//   //botones ".popup__close"
//   const closeButton = popup.querySelector(".popup__close");
//   closeButton.addEventListener("click", () => {
//     closeModal(popup);
//   });
//   //caja ".popup"
//   popup.addEventListener("click", (evt) => {
//     if (evt.target.classList.contains("popup")) {
//       closeModal(evt.target);
//     }
//   });
// }

//Tecla: Escape
// function handleEscClose(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_is-opened");
//     if (openedPopup) {
//       closeModal(openedPopup);
//     }
//   }
// }

//Crea las Cards de la lista
initialCards.forEach((item) => {
  renderCard(item);
});

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
