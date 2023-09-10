import '../pages/index.css';
import { validationConfig, editButton, addButton, formValidators, profileFormElement, cardFormElement, placeInput, imageInput, elements } from '../utils/constants.js';
import initialCards from '../utils/cards.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

function handleCardClick(name, link) {
    imagePopup.open({ name, link });
}

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick);
    return card.getView();
}

const section = new Section({ items: initialCards, renderer: (item) => section.addItem(createCard(item)) }, '.elements');
section.render();

const imagePopup = new PopupWithImage('.image');
imagePopup.setEventListeners();

const userInfo = new UserInfo({ name: '.profile__name', spec: '.profile__speciality' });

function submitProfileForm(inputValues) {
    const { userName: name, userSpec: spec } = inputValues;

    userInfo.setUserInfo({ name, spec });

    profilePopup.close();
}

function submitCardForm() {
    const newCard =
    {
        name: placeInput.value,
        link: imageInput.value
    }

    const card = createCard(newCard)
    section.addItem(card);

    cardPopup.close();
}

editButton.addEventListener('click', () => {
    profilePopup.open();
    formValidators[profileFormElement.getAttribute('name')].deleteErrors();
});

addButton.addEventListener('click', () => {
    cardPopup.open();
    formValidators[cardFormElement.getAttribute('name')].disableButton();
})

const profilePopup = new PopupWithForm('.edit-profile', submitProfileForm)
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.add-card', submitCardForm);
cardPopup.setEventListeners();

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


