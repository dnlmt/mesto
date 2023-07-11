const profilePopup = document.querySelector('.popup__profile');
const addCardPopup = document.querySelector('.popup__add-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopupCloseButton = document.querySelector('.popup__profile_close-button');
const addCardPopupCloseButton = document.querySelector('.popup__add-card_close-button');

const imagePopup = document.querySelector('.popup__show-image');
const closeImageButton = document.querySelector('.button__image_close-button');

const profilePopupFormElement = document.querySelector('.popup__profile_form');
const addCardFormElement = document.querySelector('.popup__add-card_form');

const nameInput = profilePopupFormElement.querySelector('#userName');
const jobInput = profilePopupFormElement.querySelector('#userSpec');

const placeInput = addCardFormElement.querySelector('#name');
const imageInput = addCardFormElement.querySelector('#link');

const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__speciality');

const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;