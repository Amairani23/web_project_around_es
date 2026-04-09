import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  btnEditProfile,
  btnCreateCard,
  containerList,
  nameInput,
  aboutInput,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

const popupEditProfile = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo(data);
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

  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  aboutInput.value = info.about;
});

btnCreateCard.addEventListener("click", () => {
  popupCreateCard.open();
  validationInputs();
});

//Crear Cards
function renderCard(data) {
  const card = new Card(data, "#cards-template", (src) => {
    imagePopup.open(src);
  });
  const cardElement = card.generateCard();
  containerList.prepend(cardElement);
}

//Administra las listas en el DOM
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#cards-template", (src) => {
        imagePopup.open(src);
      });
      return card.generateCard();
    },
  },
  ".cards__list",
);

cardList.renderItems();

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
