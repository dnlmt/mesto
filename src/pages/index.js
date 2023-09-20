import '../pages/index.css';
import {
    validationConfig,
    editButton,
    addButton,
    formValidators,
    profileFormElement,
    cardFormElement,
    profileName,
    profileSpeciality,
    profileAvatar
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
        authorization: 'c4e6ca55-829f-4091-982f-7d20c0c115fd',
        'Content-Type': 'application/json'
    }
});

let section = {};

api.getInitialCards().then((cards) => {
    section = new Section({ items: cards, renderer: (item) => section.addItem(createCard(item)) }, '.elements');
    section.render();
});

function handleCardClick(name, link) {
    imagePopup.open({ name, link });
}

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick, (id) => {
        api.deleteCard(id)
            .then((id) => {
                card.remove();
            })
    },
        (id) => {
        api.like(id, item)
            .then((id) => {

            })
    })
    return card.getView();
}


const imagePopup = new PopupWithImage('.image');
imagePopup.setEventListeners();

let userInfo = new UserInfo({ name: '.profile__name', about: '.profile__speciality' });

api.getUserInfo().then((res) => {
    profileName.textContent = res.name;
    profileSpeciality.textContent = res.about;
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    profilePopup._setInputValues({ userName: res.name, userSpec: res.about });
})

const profilePopup = new PopupWithForm('.edit-profile', submitProfileForm)
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.add-card', submitCardForm);
cardPopup.setEventListeners();

// const deletePopup = new Popup('.delete-card', submit);
// deletePopup.setEventListeners();
//
// function submit() {
//
// };

function submitProfileForm(inputValues) {
    const { userName: name, userSpec: about } = inputValues;
    const user = { name, about };
    api.setUserInfo(user).then((info) => {
        userInfo.setUserInfo(info);
    });
    profilePopup._setInputValues(inputValues);
    profilePopup.close();
}

function submitCardForm(inputValues) {
    api.addCard(inputValues).then((card) => {
        card = createCard(inputValues)
        section.addItem(card);
    })
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


