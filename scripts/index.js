document.addEventListener("DOMContentLoaded", () => {
  const initialCards = [
    {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
      name: "An outdoor cafe",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
      name: "A very long bridge, over the forest and through the trees",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
      name: "Tunnel with morning light",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },

    {
      name: "Bridge",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
  ];

  const profileEditButton = document.querySelector(".profile__edit-button");
  const cardEditButton = document.querySelector(".profile__new-post-button");
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  const editModal = document.querySelector("#edit-modal");
  const editFormElement = editModal.querySelector(".modal__form");
  const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
  const editModalNameInput = editModal.querySelector("#profile-name-input");
  const editModalDescriptionInput = editModal.querySelector(
    "#profile-description-input"
  );
  const cardTemplate = document.querySelector("#card-template");
  const cardsList = document.querySelector(".cards__list");

  const cardModal = document.querySelector("#add-card-modal");
  const cardForm = cardModal.querySelector(".modal__form");
  const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
  const cardNameInput = cardModal.querySelector("#add-card-name-input");
  const cardLinkInput = cardModal.querySelector("#add-card-link-input");

  const previewModal = document.querySelector("#preview-modal");
  const previewImage = previewModal.querySelector(".modal__image");
  const previewCaption = previewModal.querySelector(".modal__caption");
  const previewCloseBtn = previewModal.querySelector(
    ".modal__close_type_preview"
  );

  function getCardElement(data) {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardLikeBtn = cardElement.querySelector(".card__like-button");
    const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

    cardNameEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle("card__like-button-liked");
      console.log("Like button clicked!");
    });

    cardDeleteBtn.addEventListener("click", () => {
      cardElement.remove();
      console.log("Card deleted!");
    });

    cardImageEl.addEventListener("click", () => {
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
      openModal(previewModal);
    });

    return cardElement;
  }

  function openModal(modal) {
    modal.classList.add("modal_is-opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
  }

  function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
  }

  function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const inputValues = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    console.log("Adding card with values:", inputValues);
    const cardEl = getCardElement(inputValues);
    cardsList.prepend(cardEl);
    closeModal(cardModal);
  }

  profileEditButton.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent.trim();
    editModalDescriptionInput.value = profileDescription.textContent.trim();
    openModal(editModal);
  });

  editModalCloseBtn.addEventListener("click", () => closeModal(editModal));

  cardEditButton.addEventListener("click", () => openModal(cardModal));
  cardModalCloseBtn.addEventListener("click", () => closeModal(cardModal));

  editFormElement.addEventListener("submit", handleEditFormSubmit);
  cardForm.addEventListener("submit", handleAddCardSubmit);

  initialCards.forEach((item) => {
    const cardEl = getCardElement(item);
    cardsList.append(cardEl);
  });

  previewCloseBtn.addEventListener("click", () => closeModal(previewModal));
});
