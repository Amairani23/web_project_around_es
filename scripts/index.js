import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

initialCards.forEach(function (item) {
  console.log(item.name);
});

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
  clearValidation();
  formNewCard.reset();
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
  clearValidation();
}

openEditModal.addEventListener("click", handleOpenEditModal);

closeEditModal.addEventListener("click", () => {
  closeModal(editModal);
  // editModal es tu modal específico
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
//const closeCardBtn = cardPopup.querySelector(".popup__close");
const containerList = document.querySelector(".cards__list");
const formNewCard = document.querySelector("#new-card-form");
const nameInputForm = formNewCard.querySelector(".popup__input_type_card-name");
const imageInputForm = formNewCard.querySelector(".popup__input_type_url");
const imagenPopup = document.querySelector("#image-popup");
const imagenPopupElement = imagenPopup.querySelector(".popup__image");
const captionPopupImage = imagenPopup.querySelector(".popup__caption");
//const imagenPopupClose = imagenPopup.querySelector(".popup__close");

function getCardElement(name, link) {
  const cardElement = cardsTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const finalName = name.trim() === "" ? "Sin título" : name;
  const finalLink = link.trim() === "" ? "./images/placeholder.jpg" : link;

  cardImage.src = finalLink;
  cardImage.alt = finalName;
  cardTitle.textContent = finalName;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    imagenPopupElement.src = finalLink;
    imagenPopupElement.alt = finalName;
    captionPopupImage.textContent = finalName;
    openModal(imagenPopup);
  });

  // imagenPopupClose.addEventListener("click", function () {
  //   closeModal(imagenPopup);
  // });

  return cardElement;
}

function renderCard(name, link, containerList) {
  const cardElements = getCardElement(name, link);
  containerList.prepend(cardElements);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, containerList);
});

openCardBtn.addEventListener("click", function () {
  openModal(cardPopup);
});

// closeCardBtn.addEventListener("click", function () {
//   closeModal(cardPopup);
// });

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInputForm.value.trim();
  const link = imageInputForm.value.trim();

  renderCard(name, link, containerList);

  formNewCard.reset();
  closeModal(cardPopup);
}

formNewCard.addEventListener("submit", handleCardFormSubmit);

//validación del formulario
const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      if (!inputElement.validity.valid) {
        showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage,
        );
      } else {
        hideInputError(formElement, inputElement);
      }

      toggleButtonState(inputList, buttonElement);
    });
  });
});

//Mostrar mensaje de error
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

//Ocultar mensaje de error
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`,
  );

  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

//Deshabilitar el Botón
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    // Botón DESHABILITADO
    buttonElement.classList.add("popup__submit_disabled");
    buttonElement.disabled = true;
  } else {
    // Botón HABILITADO
    buttonElement.classList.remove("popup__submit_disabled");
    buttonElement.disabled = false;
  }
}

//Verificar la condición para cada input
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

//Cerrar ventana en superposición
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  setupPopupEventListeners(popup);
});

function setupPopupEventListeners(popup) {
  //botones ".popup__close"
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
  //caja ".popup"
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(evt.target);
    }
  });
}

//Tecla: Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

//limpia mensaje de error
function clearValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });

    toggleButtonState(inputList, buttonElement);
  });
}

//Crea una instancia
initialCards.forEach((item) => {
  const card = new Card(item, "#cards-template");
  const cardElement = card.generateCard();

  document.querySelector(".cards__list").prepend(cardElement);
});

const config = {
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_error",
};

const formElement = document.querySelector(".popup__form");
const formValidator = new FormValidator(config, formElement);
formValidator.setEventListeners();
