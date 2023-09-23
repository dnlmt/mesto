import '../pages/index.css';
import {
    validationConfig,
    editButton,
    addButton,
    formValidators,
    profileFormElement,
    cardFormElement,
    changeAvatarButton,
    avatarFormElement
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

let userId = '';
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__speciality', avatar: '.profile__avatar' });
const section = new Section({ renderer: item => createCard(item) }, '.elements');

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick, handleDeletePopup, like, userId)
    return card.getView();
}

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then(([info, cards]) => {
        userId = info._id;
        userInfo.setUserInfo(info);
        userInfo.setAvatar(info.avatar)
        section.render(cards);
})
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

function handleCardClick(name, link) {
    imagePopup.open({ name, link });
}

function like(card) {
    if (card.checkLike()) {
        api.unlike(card._id)
            .then((card) => {
                this.toggleLike();
                this.updateLikes(card);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    } else {
        api.like(card._id)
            .then((card) => {
                this.toggleLike();
                this.updateLikes(card);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    }
}

const imagePopup = new PopupWithImage('.image');
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm('.edit-profile', submitProfileForm, 'Сохранение...')
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.add-card', submitCardForm, 'Создание...');
cardPopup.setEventListeners();

const deletePopup = new PopupWithSubmit('.delete-card', deleteSubmitCard, 'Подождите...');
deletePopup.setEventListeners();

function handleDeletePopup(card) {
    deletePopup.setCard(card);
    deletePopup.open();
}

const avatarPopup = new PopupWithForm('.change-avatar', changeAvatarSubmit, 'Сохранение...');
avatarPopup.setEventListeners();

function changeAvatarSubmit(data) {
    api.setAvatar(data)
        .then(() => {
            userInfo.setAvatar(data.avatar)
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            avatarPopup.endWaiting();
        });
}

function deleteSubmitCard(card) {
    api.deleteCard(card._id)
        .then(() => {
            card.removeCard();
            deletePopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            deletePopup.endWaiting();
        });
}

function submitProfileForm(inputValues) {
    const { userName: name, userSpec: about } = inputValues;
    const user = { name, about };
    api.setUserInfo(user)
        .then((info) => {
            userInfo.setUserInfo(info);
            profilePopup.close();
    })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            profilePopup.endWaiting()
        });
}

function submitCardForm(inputValues) {
    api.addCard(inputValues).then((card) => {
        section.addItem(card);
        cardPopup.close();
    })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            cardPopup.endWaiting();
        });
}

editButton.addEventListener('click', () => {
    console.log(userInfo.getUserInfo())
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.open();
    formValidators[profileFormElement.getAttribute('name')].deleteErrors();
});

addButton.addEventListener('click', () => {
    cardPopup.open();
    formValidators[cardFormElement.getAttribute('name')].disableButton();
})

changeAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
    formValidators[avatarFormElement.getAttribute('name')].disableButton();
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


