import '../pages/index.css';
import { validationConfig, editButton, addButton, formValidators, profileFormElement, cardFormElement, placeInput, imageInput, profileName, profileSpeciality, elements } from './constants.js';
import initialCards from './cards.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

function handleCardClick(name, link) {
    imagePopup.open({ name, link });
}

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick);
    return card.getView();
}

const section = new Section({ items: initialCards, renderer: (item) => section.addItem(createCard(item)) }, '.elements');
section.render();

const profilePopup = new Popup('.edit-profile');
profilePopup.setEventListeners();

const cardPopup = new Popup('.add-card');
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage('.image');
imagePopup.setEventListeners();

function submitProfileForm(evt) {
    evt.preventDefault();

    const userInfo = new UserInfo({ name: profileName, spec: profileSpeciality });
    const {userName: name, userSpec: spec} = profileForm._getInputValues();;
    userInfo.setUserInfo({ name, spec });

    profileForm.close();
}

function submitCardForm(evt) {
    evt.preventDefault();

    const newCard =
    {
        name: placeInput.value,
        link: imageInput.value
    }

    const card = createCard(newCard)
    elements.prepend(card);

    placeInput.value = '';
    imageInput.value = '';

    formValidators[cardFormElement.getAttribute('name')].disableButton();

    cardForm.close();
}

editButton.addEventListener('click', () => {
    profilePopup.open();
    formValidators[profileFormElement.getAttribute('name')].deleteError();
});

addButton.addEventListener('click', () => {
    cardPopup.open();
})

const profileForm = new PopupWithForm('.edit-profile', profileFormElement, submitProfileForm);
profileForm.setEventListeners();

const cardForm = new PopupWithForm('.add-card', cardFormElement, submitCardForm);
cardForm.setEventListeners();

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationConfig);


