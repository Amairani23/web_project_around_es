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
//Formulario
let formElement = editModal.querySelector(".popup__form");

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
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
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editModal);
}

//formElement.addEventListener("submit", handleProfileFormSubmit);

const cardContainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards-template");
const cardPopup = document.querySelector("#new-card-popup");
const openCardBtn = document.querySelector(".profile__add-button");
const closeCardBtn = cardPopup.querySelector(".popup__close");
const containerList = document.querySelector(".cards__list");
const formNewCard = document.querySelector("#new-card-form");
const nameInputForm = formNewCard.querySelector(".popup__input_type_card-name");
const imageInputForm = formNewCard.querySelector(".popup__input_type_url");
const imagenPopup = document.querySelector("#image-popup");
const imagenPopupElement = imagenPopup.querySelector(".popup__image");
const captionPopupImage = imagenPopup.querySelector(".popup__caption");
const imagenPopupClose = imagenPopup.querySelector(".popup__close");

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

  imagenPopupClose.addEventListener("click", function () {
    closeModal(imagenPopup);
  });

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

closeCardBtn.addEventListener("click", function () {
  closeModal(cardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInputForm.value.trim();
  const link = imageInputForm.value.trim();

  renderCard(name, link, containerList);

  formNewCard.reset();
  closeModal(cardPopup);
}

//formNewCard.addEventListener("submit", handleCardFormSubmit);

//Validacion de formulario Edit

document.querySelectorAll(".popup__form").forEach((form) => {
  enableValidation(form);
});

function enableValidation(formElement) {
  const inputs = formElement.querySelectorAll(".form__input");
  const submitButton = formElement.querySelector(".form__button--submit");
  const editButton = formElement.querySelector(".edit-button");
  const newButton = formElement.querySelector(".new-button");

  function showInputError(inputElement, errorMessage) {
    const errorElement = formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );

    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }

  function hideInputError(inputElement) {
    const errorElement = formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );
    inputElement.classList.remove("form__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }

  function toggleButtonState() {
    const allValid = Array.from(inputs).every((input) => input.validity.valid);
    submitButton.disabled = !allValid;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
      } else {
        hideInputError(input);
      }
      toggleButtonState();
    });
  });

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formElement.checkValidity()) {
      inputs.forEach((input) => {
        if (!input.validity.valid) {
          showInputError(input);
        }
      });
      return;
    }

    handleProfileFormSubmit();
  });
}
//Validacion de formulario Edit
