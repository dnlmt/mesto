export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error'
};

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const formValidators = {};

export const profileFormElement = document.querySelector('.edit-profile__form');
export const cardFormElement = document.querySelector('.add-card__form');

export const placeInput = cardFormElement.querySelector('#name');
export const imageInput = cardFormElement.querySelector('#link');

export const elements = document.querySelector('.elements');