import "./index.css";
import { enableValidation, settings } from "../scripts/validation.js";

import goldenGateImage from "../images/golden-gate.jpg";
import valThorensImage from "../images/val-thorens.jpg";
import terraceImage from "../images/terrace.jpg";
import cafeImage from "../images/outdoor-cafe.jpg";
import forestBridgeImage from "../images/forest-bridge.jpg";
import tunnelImage from "../images/tunnel.jpg";
import mountainHouseImage from "../images/mountain-house.jpg";

const initialCards = [
  {
    name: "Golden Gate bridge",
    link: goldenGateImage,
  },
  {
    name: "Val Thorens",
    link: valThorensImage,
  },
  {
    name: "Restaurant terrace",
    link: terraceImage,
  },
  {
    name: "An outdoor cafe",
    link: cafeImage,
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: forestBridgeImage,
  },
  {
    name: "Tunnel with morning light",
    link: tunnelImage,
  },
  {
    name: "Mountain house",
    link: mountainHouseImage,
  },
];

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

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");

const newPostSubmitBtn = newPostModal.querySelector(".modal__button");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#image__caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");

const previewCaption = previewModal.querySelector(".modal__caption");
previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

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

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(newPostSubmitBtn, settings);
  closeModal(newPostModal);
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

const modals = [editProfileModal, newPostModal, previewModal];

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
  document.removeEventListener("keydown", handleEscapeKey);
}

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(settings);
