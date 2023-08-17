import Card from './Card.js';
import FormValidator from './FormValidator.js';

function handleCardClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
    openPopup(imagePopup);
}

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick);
    return card.getView();
}

const renderCard = (card) => {
    elements.prepend(card);
}

const addCard = (item) => {
    const card = createCard(item)
    renderCard(card);
}

initialCards.reverse().forEach((item) => {
    addCard(item);
});

const closeOnEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEsc);
}

function submitProfileForm(evt) {
    evt.preventDefault();

    const userNameInput = nameInput.value;
    const userJobInput = jobInput.value;

    profileName.textContent = userNameInput;
    profileSpeciality.textContent = userJobInput;

    closePopup(profilePopup);
}

function submitCardForm(evt) {
    evt.preventDefault();

    const newCard =
    {
        name: placeInput.value,
        link: imageInput.value
    }

    addCard(newCard);

    placeInput.value = '';
    imageInput.value = '';

    formValidators[cardFormElement.getAttribute('name')].disableButton();

    closePopup(cardPopup);

}

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpeciality.textContent;
    openPopup(profilePopup);
    formValidators[profileFormElement.getAttribute('name')].deleteError();
});

addButton.addEventListener('click', () => {
    openPopup(cardPopup);
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

profileFormElement.addEventListener('submit', submitProfileForm);

cardFormElement.addEventListener('submit', submitCardForm)

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

export default openPopup;


