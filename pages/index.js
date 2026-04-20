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
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Crear instancia de Api
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "41863ac7-76e4-4b02-83ad-41a05f0c7f79",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

//Crear Cards
function renderCard(data) {
  const card = new Card(
    data,
    "#cards-template",
    (src) => {
      imagePopup.open(src);
    },
    () => {
      popupWithConfirmation.setCard(card);
      popupWithConfirmation.open();

      popupWithConfirmation.setHandleSubmit((card) => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.removeCard();
            popupWithConfirmation.close();
          })
          .catch(console.log);
      });
    },
  );
  const cardElement = card.generateCard();
  containerList.prepend(cardElement);
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

const popupWithConfirmation = new PopupWithConfirmation("#delete-popup");
popupWithConfirmation.setEventListeners();

// Cargar tarjetas desde el servidor
api
  .getInitialCards()
  .then((cardsData) => {
    //Renderizar las tarjetas en la página
    cardsData.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#cards-template",
        (src) => {
          imagePopup.open(src);
        },
        () => {
          popupWithConfirmation.setCard(card);
          popupWithConfirmation.open();

          popupWithConfirmation.setHandleSubmit((card) => {
            api
              .deleteCard(card._id)
              .then(() => {
                card.removeCard();
                popupWithConfirmation.close();
              })
              .catch(console.log);
          });
        },
      );
      const cardElement = card.generateCard();
      containerList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err + " al crear tarjetas");
  });

// Editar el perfil
const popupEditProfile = new PopupWithForm("#edit-popup", (data) => {
  api
    .updateUserInfo(data)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      popupEditProfile.close();
      popupEditProfile.formElement.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
popupEditProfile.setEventListeners();

btnEditProfile.addEventListener("click", () => {
  //obtiene los datos guardados en tu clase UserInfo
  const info = userInfo.getUserInfo();
  //rellena el input de nombre
  nameInput.value = info.name;
  //rellena el input de descripción
  aboutInput.value = info.about;

  popupEditProfile.open();
  validationInputs();
});

// Cargar información del usuario
api
  .getUserInfo()
  .then((usersData) => {
    // actualizar la interfaz con los datos
    userInfo.setUserInfo(usersData);
  })
  .catch((err) => {
    console.log(err + " al cargar información");
  });

// Agregar una nueva tarjeta
const popupCreateCard = new PopupWithForm("#new-card-popup", (data) => {
  api
    .addCard(data)
    .then((card) => {
      renderCard(card);
      popupCreateCard.close();
      popupCreateCard.formElement.reset();
    })
    .catch((err) => {
      console.log(err + " al agregar tarjeta");
    });
});
popupCreateCard.setEventListeners();

btnCreateCard.addEventListener("click", () => {
  popupCreateCard.open();
  validationInputs();
});
