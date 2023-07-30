const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error'
};

const profilePopup = document.querySelector('.edit-profile');
const addCardPopup = document.querySelector('.add-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopupCloseButton = document.querySelector('.edit-profile__close-button');
const addCardPopupCloseButton = document.querySelector('.add-card__close-button');

const imagePopup = document.querySelector('.image');
const closeImageButton = document.querySelector('.image__close-button');

const profilePopupFormElement = document.querySelector('.edit-profile__form');
const addCardFormElement = document.querySelector('.add-card__form');

const nameInput = profilePopupFormElement.querySelector('#userName');
const jobInput = profilePopupFormElement.querySelector('#userSpec');

const placeInput = addCardFormElement.querySelector('#name');
const imageInput = addCardFormElement.querySelector('#link');

const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__speciality');

const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;