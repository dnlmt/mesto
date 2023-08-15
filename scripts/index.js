import Card from './Card.js';
import FormValidator from './FormValidator.js';

 const renderCard = (card) => {
    elements.prepend(card);
 } 

 const addCard = (item) => {
    const card = new Card(item); 
    renderCard(card.getView());
 }
  
initialCards.reverse().forEach((item) => {
    addCard(item);
  });

const closeOnEsc = (evt) => { 
    if (evt.keyCode == 27) {
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

function submitProfileForm (evt) {
    evt.preventDefault();

    const userNameInput = nameInput.value;
    const userJobInput = jobInput.value;

    profileName.textContent = userNameInput;
    profileSpeciality.textContent = userJobInput;
    
    closePopup(profilePopup);
}

function submitCardForm (evt) {
    evt.preventDefault();

    const newCard = 
        {
        name: placeInput.value,
        link: imageInput.value
    }

    addCard(newCard);

    placeInput.value = '';
    imageInput.value = '';

    cardFormValidator.disableButton(cardPopup.querySelector(validationConfig.submitButtonSelector));

    closePopup(cardPopup);

}

const closeByOverlay = (evt, popup) => {
    if(evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
}

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpeciality.textContent;
    openPopup(profilePopup);
    profileFormValidator.deleteError(profilePopup.querySelector(validationConfig.formSelector));
});

addButton.addEventListener('click', () => {
    openPopup(cardPopup);
})

buttonClosePopupProfile.addEventListener('click', () => {
    closePopup(profilePopup);
});
buttonClosePopupCard.addEventListener('click', () => {
    closePopup(cardPopup);
});

buttonCloseImage.addEventListener('click', () => {
    closePopup(imagePopup);
});

profilePopup.addEventListener('click', (evt) => {
    closeByOverlay(evt, profilePopup);
});

cardPopup.addEventListener('click', (evt) => {
    closeByOverlay(evt, cardPopup);
});

imagePopup.addEventListener('click', (evt) => {
    closeByOverlay(evt, imagePopup);
});

profileFormElement.addEventListener('submit', submitProfileForm); 

cardFormElement.addEventListener('submit', submitCardForm)

const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();

export default openPopup;


