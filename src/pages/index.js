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
    profileAvatar,
    changeAvatarButton
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit";

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
    const card = new Card(item, '#element-template', handleCardClick,
        () => {
        handleDeletePopup(item._id, card);
    }, like)
    return card.getView(checkOwner);
}

function checkOwner(card) {
    if (card._owner) {
        if (card._owner._id !== '2dd493b801cd0639e038440e') {
            card.deleteButton.remove();
        }
    }
}

function like(id, button, card) {
    if (button.classList.contains('element__like-button_enabled')) {
        api.unlike(id)
            .then((id) => {
                button.classList.remove("element__like-button_enabled");
                card.updateLikes(id.likes.length);
            })
    } else {
        api.like(id)
            .then((id) => {
                button.classList.add("element__like-button_enabled");
                card.updateLikes(id.likes.length);
            })
    }
}

const imagePopup = new PopupWithImage('.image');
imagePopup.setEventListeners();

let userInfo = new UserInfo({ name: '.profile__name', about: '.profile__speciality' });

api.getUserInfo().then((res) => {
    profileName.textContent = res.name;
    profileSpeciality.textContent = res.about;
    userInfo.setAvatar(profileAvatar, res.avatar)
    profilePopup._setInputValues({ userName: res.name, userSpec: res.about });
})

const profilePopup = new PopupWithForm('.edit-profile', submitProfileForm, 'Сохранение...')
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.add-card', submitCardForm, 'Создание...');
cardPopup.setEventListeners();

const deletePopup = new PopupWithSubmit('.delete-card', deleteSubmitCard, 'Подождите...');

function handleDeletePopup(id, card) {
    deletePopup.open();
    deletePopup.setEventListeners(id, card);
}

const avatarPopup = new PopupWithForm('.change-avatar', changeAvatarSubmit, 'Сохранение...');
avatarPopup.setEventListeners();

function changeAvatarSubmit(data) {
    api.setAvatar(data)
        .then(() => {
            userInfo.setAvatar(profileAvatar, data.avatar)
            avatarPopup.close();
            avatarPopup.endWaiting();
        })
}

function deleteSubmitCard(id, card) {
    api.deleteCard(id)
        .then((id) => {
            card.removeCard();
            deletePopup.endWaiting();
        })
    deletePopup.close();
}

function submitProfileForm(inputValues) {
    const { userName: name, userSpec: about } = inputValues;
    const user = { name, about };
    api.setUserInfo(user)
        .then((info) => {
        userInfo.setUserInfo(info);
    });
    profilePopup._setInputValues(inputValues);
    profilePopup.close();
    profilePopup.endWaiting();
}

function submitCardForm(inputValues) {
    api.addCard(inputValues).then((card) => {
        card = createCard(inputValues)
        section.addItem(card);
    })
    cardPopup.close();
    cardPopup.endWaiting();
}

editButton.addEventListener('click', () => {
    profilePopup.open();
    formValidators[profileFormElement.getAttribute('name')].deleteErrors();
});

addButton.addEventListener('click', () => {
    cardPopup.open();
    formValidators[cardFormElement.getAttribute('name')].disableButton();
})

changeAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
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


