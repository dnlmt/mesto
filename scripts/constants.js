const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error'
};

const profilePopup = document.querySelector('.edit-profile');
const cardPopup = document.querySelector('.add-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonClosePopupProfile = document.querySelector('.edit-profile__close-button');
const buttonClosePopupCard = document.querySelector('.add-card__close-button');

const imagePopup = document.querySelector('.image');
const buttonCloseImage = document.querySelector('.image__close-button');

const profileFormElement = document.querySelector('.edit-profile__form');
const cardFormElement = document.querySelector('.add-card__form');

const nameInput = profileFormElement.querySelector('#userName');
const jobInput = profileFormElement.querySelector('#userSpec');

const placeInput = cardFormElement.querySelector('#name');
const imageInput = cardFormElement.querySelector('#link');

const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__speciality');

const elements = document.querySelector('.elements');