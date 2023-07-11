const profilePopup = document.querySelector('.popup_profile');
const addCardPopup = document.querySelector('.popup_add-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopupCloseButton = document.querySelector('.popup_profile_close-button');
const addCardPopupCloseButton = document.querySelector('.popup_add-card_close-button');

const imagePopup = document.querySelector('.popup_show-image');
const closeImageButton = document.querySelector('.button_image_close-button');

const profilePopupFormElement = document.querySelector('.popup_profile_form');
const addCardFormElement = document.querySelector('.popup_add-card_form');

const nameInput = profilePopupFormElement.querySelector('#userName');
const jobInput = profilePopupFormElement.querySelector('#userSpec');

const placeInput = addCardFormElement.querySelector('#name');
const imageInput = addCardFormElement.querySelector('#link');

const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__speciality');

const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;