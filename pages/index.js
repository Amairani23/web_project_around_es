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
//import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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

// const popupWithConfirmation = new PopupWithConfirmation(".popup_type_delete");
// popupWithConfirmation.setEventListeners();

btnCreateCard.addEventListener("click", () => {
  popupCreateCard.open();
  validationInputs();
});

//Crear Cards
function renderCard(data) {
  const card = new Card(
    data,
    "#cards-template",
    (src) => {
      imagePopup.open(src);
    },
    // (cardInstance) => {
    //   popupWithConfirmation.open(() => {
    //     api
    //       .deleteCard(cardInstance.getId())
    //       .then(() => {
    //         cardInstance.removeCard();
    //         popupWithConfirmation.close();
    //       })
    //       .catch((err) => console.log(err));
    //   });
    // },
  );
  const cardElement = card.generateCard();
  containerList.prepend(cardElement);
}

//Administra las listas en el DOM
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#cards-template",
        (src) => {
          imagePopup.open(src);
        },
        // (cardInstance) => {
        //   popupWithConfirmation.open(() => {
        //     api
        //       .deleteCard(cardInstance.getId())
        //       .then(() => {
        //         cardInstance.removeCard();
        //         popupWithConfirmation.close();
        //       })
        //       .catch((err) => console.log(err));
        //   });
        // },
      );
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

// Crear instancia de Api
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "5ee9c752-6cba-4218-ab59-fe5a887f2b10",
    "Content-Type": "application/json",
  },
});

// Cargar información del usuario
api
  .getUserInfo()
  .then((usersData) => {
    console.log(usersData);
  })
  .catch((err) => {
    console.log(err);
  });

// Cargar tarjetas desde el servidor
api
  .getInitialCards()
  .then((cardsData) => {
    console.log(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

// Editar el perfil
api
  .updateUserInfo()
  .then((userData) => {
    console.log(userData);
  })
  .catch((err) => {
    console.log(err);
  });

// Agregar una nueva tarjeta
api
  .addCard()
  .then((addCard) => {
    console.log(addCard);
  })
  .catch((err) => {
    console.log(err);
  });

// Eliminar una tarjeta
api
  .deleteCard(cardId)
  .then(() => {
    card.removeCard();
    deletePopup.close();
  })
  .catch((err) => console.log(err));
