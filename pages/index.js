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

const popupWithConfirmation = new PopupWithConfirmation("#delete-popup");
popupWithConfirmation.setEventListeners();

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
        //         console.log(cardInstance.getId());
        //         //cardInstance.removeCard();
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

//cardList.renderItems();

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
    // Actualizar la interfaz con los datos
    document.querySelector(".profile__title").textContent = usersData.name;
    document.querySelector(".profile__description").textContent =
      usersData.about;
    //document.querySelector(".profile__avatar").src = usersData.avatar;
  })
  .catch((err) => {
    console.log(err + " al cargar información");
  });

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
          popupWithConfirmation.open();
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
api
  .updateUserInfo({
    name: nameInput.value,
    about: aboutInput.value,
  })
  .then((updatedUserData) => {
    // Actualizar la interfaz con los datos del servidor
    document.querySelector(".profile__title").textContent =
      updatedUserData.name;
    document.querySelector(".profile__description").textContent =
      updatedUserData.about;
  })
  .catch((err) => {
    console.log(err + " al editar perfil");
  });

// // Agregar una nueva tarjeta
const form = document.querySelector("#new-card-form");
const nameInputCard = form.querySelector(".popup__input_type_card-name");
const linkInputCard = form.querySelector(".popup__input_type_card-name");
api
  // .addCard({
  //   name: "Amairani",
  //   link: "https://i.blogs.es/8256d5/gpu-openai-chatgpt/500_333.jpeg",
  // })
  .addCard({
    name: nameInputCard.value,
    link: linkInputCard.value,
  })
  .then((card) => {
    console.log(card);
    renderCard(card);
  })
  .catch((err) => {
    console.log(err + " al agregar tarjeta");
  });

// Eliminar una tarjeta
// api
//   .deleteCard()
//   .then(() => {
//     card.removeCard();
//     deletePopup.close();
//   })
//   .catch((err) => console.log(err));
