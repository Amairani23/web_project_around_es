import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

const initialCards = [
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

const btnEditProfile = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const btnCreateCard = document.querySelector(".profile__add-button");
const containerList = document.querySelector(".cards__list");

const popupEditProfile = new PopupWithForm("#edit-popup", (data) => {
  profileDescription.textContent = data.about;
  profileTitle.textContent = data.name;
});
popupEditProfile.setEventListeners();

const popupCreateCard = new PopupWithForm("#new-card-popup", (data) => {
  renderCard(data);
});
popupCreateCard.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

btnEditProfile.addEventListener("click", () => {
  popupEditProfile.open();
});

btnCreateCard.addEventListener("click", () => {
  popupCreateCard.open();
});

//Crear tarjeta
function renderCard(data) {
  const card = new Card(data.name, data.link, "#cards-template");
  const cardElements = card.generateCard();

  containerList.prepend(cardElements);
}

//Administra las listas en el DOM
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#cards-template");
      return card.generateCard();
    },
  },
  ".cards__list",
);

cardList.renderItems();

//Tecla: Escape;
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

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

validationInputs();

//Popup de Imagen
const cardImage = Array.from(document.querySelectorAll(".card__image"));

cardImage.forEach((item) => {
  item.addEventListener("click", () => {
    imagenPop.open(item.src);
  });
});
