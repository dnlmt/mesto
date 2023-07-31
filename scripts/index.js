function showImage(element) { 
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupImageName.textContent = element.name;
    openPopup(imagePopup);
}

const createCard = (element) => {
    const card = template.querySelector('.element').cloneNode(true);
    const place = card.querySelector('.element__place');
    const image = card.querySelector('.element__photo');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like-button');

    image.src = element.link;
    image.alt = element.name;
    place.textContent = element.name;   

    likeButton.addEventListener('click', () => {
        if (!likeButton.classList.contains('element__like-button_enabled')) {
            likeButton.classList.add('element__like-button_enabled');
        } else {
            likeButton.classList.remove('element__like-button_enabled');
        }
    })

    deleteButton.addEventListener('click', () => {
        card.remove();
    })

    image.addEventListener('click', () => showImage(element));

    return card;
  }

 const renderCard = (card) => {
    elements.prepend(card);
 } 
  
 const addCard = (item) => {
    const card = createCard(item); 
    renderCard(card);
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

    disableButton(cardPopup.querySelector(validationConfig.submitButtonSelector));

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
    deleteError(profilePopup.querySelector(validationConfig.formSelector));
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

cardFormElement.addEventListener('submit', submitCardForm);

enableValidation(validationConfig);


