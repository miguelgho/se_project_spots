import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

let selectedCard, selectedCardId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ef183903-7be4-47a1-80bc-a51eb87a9d62",
    "Content-Type": "application/json",
  },
});

//Profile Avatar Edits
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const avatarInput = editAvatarModal.querySelector("#avatar-link-input");
const profileAvatarBtn = document.querySelector(".profile__image-edit-btn");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");

editAvatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
});
profileAvatarBtn.addEventListener("click", () => {
  openModal(editAvatarModal);
});

//Profile Elements Edits
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile__name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile__description-input",
);

// Profile Elements
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__image");
const newPostBtn = document.querySelector(".profile__add-btn");

//New Post Elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__button");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#image__caption-input");

// Delete form elements
const deleteModal = document.querySelector("#delete-confirmation-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteSubmitBtn = deleteModal.querySelector(".modal__button");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
deleteCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

// Preview image popup elements
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// Card Related Elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    const isCurrentlyLiked = cardLikeBtnEl.classList.contains(
      "card__like-btn_active",
    );
    api
      .changeLikeStatus(data._id, !isCurrentlyLiked)
      .then((updatedCard) => {
        cardLikeBtnEl.classList.toggle(
          "card__like-btn_active",
          updatedCard.isLiked,
        );
      })
      .catch(console.error);
  });

  cardDeleteBtnEl.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const originalText = deleteSubmitBtn.textContent;
  deleteSubmitBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteSubmitBtn.textContent = originalText;
    });
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  openModal(editProfileModal);
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  );
});

const cancelDeleteBtn = deleteModal.querySelector(".modal__button_cancel");

if (cancelDeleteBtn) {
  cancelDeleteBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  });
}

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
  resetValidation(
    newPostForm,
    [newPostLinkInput, newPostCaptionInput],
    settings,
  );
});
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userData) => {
      profileNameEl.textContent = userData.name;
      profileDescriptionEl.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
    });
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";

  api
    .addNewCard({
      name: newPostCaptionInput.value,
      link: newPostLinkInput.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButton(newPostSubmitBtn, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
    });
}
newPostForm.addEventListener("submit", handleAddCardSubmit);

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";

  api
    .updateAvatar({ avatar: avatarInput.value })
    .then((userData) => {
      profileAvatarEl.src = userData.avatar;
      closeModal(editAvatarModal);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

const modals = [
  editProfileModal,
  newPostModal,
  previewModal,
  editAvatarModal,
  deleteModal,
];

modals.forEach((modalEl) => {
  modalEl.addEventListener("mousedown", (evt) => {
    // Check if the click was on the modal overlay itself
    if (evt.target === evt.currentTarget) {
      closeModal(modalEl);
    }
  });
});

function openModal(modalEl) {
  modalEl.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modalEl) {
  modalEl.classList.remove("modal_is-opened");
  if (!document.querySelector(".modal_is-opened")) {
    document.removeEventListener("keydown", handleEscapeKey);
  }
}

enableValidation(settings);

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;

    profileAvatarEl.src = userData.avatar;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);
