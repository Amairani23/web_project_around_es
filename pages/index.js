import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Avatar from "../components/Avatar.js";
import {
  initialCards,
  btnEditProfile,
  btnCreateCard,
  containerList,
  nameInput,
  aboutInput,
  imageInput,
  profileImageContainer,
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

const imageInfo = new Avatar({
  avatarSelector: ".profile__image",
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
    (card) => {
      const request = card.isLiked
        ? api.removeLike(card._id)
        : api.addLike(card._id);

      request
        .then((updatedCard) => {
          card.updateLikes(updatedCard.isLiked);
          card.isLiked = updatedCard.isLiked;
        })
        .catch((error) => {
          console.log(error + " al actualizar like");
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

//Ventana emergente para eliminar tarjeta
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
        (card) => {
          const request = card.isLiked
            ? api.removeLike(card._id)
            : api.addLike(card._id);

          request
            .then((updatedCard) => {
              card.updateLikes(updatedCard.isLiked);
              card.isLiked = updatedCard.isLiked;
            })
            .catch((error) => {
              console.log(error + " al actualizar like");
            });
        },
      );
      const cardElement = card.generateCard();
      containerList.append(cardElement);
    });
  })
  .catch((error) => {
    console.log(error + " al crear tarjetas");
  });

// Cargar información del usuario
api
  .getUserInfo()
  .then((usersData) => {
    // actualizar la interfaz con los datos
    userInfo.setUserInfo(usersData);
    imageInfo.setImageInfo(usersData);
  })
  .catch((error) => {
    console.log(error + " al cargar información");
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
    .catch((error) => {
      console.log(error);
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

///Ventana emergente para Edital foto de perfil
const editAvatarPopup = new PopupWithForm("#edit-avatar", (avatarData) => {
  api
    .updateAvatar(avatarData)
    .then((userData) => {
      imageInfo.setImageInfo(userData);
      editAvatarPopup.close();
      editAvatarPopup.formElement.reset();
    })
    .catch((error) => {
      console.log(error + " al agregar foto de perfil");
    });
});
editAvatarPopup.setEventListeners();

profileImageContainer.addEventListener("click", () => {
  editAvatarPopup.open();
  validationInputs();
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
    .catch((error) => {
      console.log(error + " al agregar tarjeta");
    });
});
popupCreateCard.setEventListeners();

btnCreateCard.addEventListener("click", () => {
  popupCreateCard.open();
  validationInputs();
});
