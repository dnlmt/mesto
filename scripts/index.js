
const createCard = (element) => {
    const card = template.querySelector('.element').cloneNode(true);
    const place = card.querySelector('.element__place');
    const image = card.querySelector('.element__photo');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like-button');

    const popupImage = document.querySelector('.popup__image');
    const popupImageName = document.querySelector('.popup__image-name');

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

    function showImage() { 
        popupImage.src = element.link;
        popupImage.alt = element.name;
        popupImageName.textContent = element.name;
        imagePopup.classList.add('popup_opened');
    }

    image.addEventListener('click', showImage);

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

  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function profileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let userNameInput = nameInput.value;
    let userJobInput = jobInput.value;

    profileName.textContent = userNameInput;
    profileSpeciality.textContent = userJobInput;
    
    closePopup(profilePopup);
}

function addCardFormSubmit (evt) {
    evt.preventDefault();

    const newCard = 
        {
        name: placeInput.value,
        link: imageInput.value
    }

    addCard(newCard);

    placeInput.value = '';
    imageInput.value = '';

    closePopup(addCardPopup);
}

const closeOnEsc = (evt, popup) => {
    if (popup.classList.contains('popup_opened') && evt.keyCode == 27) {
        closePopup(popup);
    }
};

const closeByOverlay = (evt, popup) => {
    if(evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
}

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpeciality.textContent;
    openPopup(profilePopup);
});

addButton.addEventListener('click', () => {
    openPopup(addCardPopup);
})

profilePopupCloseButton.addEventListener('click', () => {
    closePopup(profilePopup);
});
addCardPopupCloseButton.addEventListener('click', () => {
    closePopup(addCardPopup);
});

closeImageButton.addEventListener('click', () => {
    closePopup(imagePopup);
});

document.addEventListener('keydown', (evt) => {
    closeOnEsc(evt, addCardPopup);
});

document.addEventListener('keydown', (evt) => {
    closeOnEsc(evt, profilePopup);
});

document.addEventListener('keydown', (evt) => {
    closeOnEsc(evt, imagePopup);
});

profilePopup.addEventListener('click', (evt) => {
    closeByOverlay(evt, profilePopup);
});

addCardPopup.addEventListener('click', (evt) => {
    closeByOverlay(evt, addCardPopup);
});

imagePopup.addEventListener('click', (evt) => {
    closeByOverlay(evt, imagePopup);
});

profilePopupFormElement.addEventListener('submit', profileFormSubmit); 

addCardFormElement.addEventListener('submit', addCardFormSubmit);

enableValidation(validationConfig);


