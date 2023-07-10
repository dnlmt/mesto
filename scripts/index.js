const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('#profile');
const addCardPopup = document.querySelector('#addCard');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profilePopupCloseButton = document.querySelector('#profilePopupCloseButton');
const addCardPopupCloseButton = document.querySelector('#addCardPopupCloseButton');
const createButton = document.querySelector('#createCard');

const imagePopup = document.querySelector('#showImage');
const closeImageButton = document.querySelector('#closeImage');

const formElement = document.querySelector('.popup__form');
const addCardFormElement = document.querySelector('#addCardForm');

const nameInput = formElement.querySelector('#userName');
const jobInput = formElement.querySelector('#userSpec');

const placeInput = addCardFormElement.querySelector('#name');
const imageInput = addCardFormElement.querySelector('#link');

const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__speciality');

const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;

const renderElements = (element) => {
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

    function showImage() {
        const img = document.querySelector('.popup__image');
        const name = document.querySelector('.popup__image-name')
    
        img.src = element.link;
        img.alt = element.name;
        name.textContent = element.name;
        imagePopup.classList.add('popup_opened');
    }

    image.addEventListener('click', showImage);

    elements.append(card);
  } 

  initialCards.forEach((card) => {
    renderElements(card);
  });

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpeciality.textContent;
    profilePopup.classList.add('popup_opened');
}

function closeProfilePopup() {
    profilePopup.classList.remove('popup_opened');
}

function openAddCardPopup() {
    addCardPopup.classList.add('popup_opened');
}

function closeAddCardPopup() {
    addCardPopup.classList.remove('popup_opened');
}

function closeImagePopup() {
    imagePopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let userNameInput = nameInput.value;
    let userJobInput = jobInput.value;

    profileName.textContent = userNameInput;
    profileSpeciality.textContent = userJobInput;
    
    closeProfilePopup();
}

function addCard (evt) {
    evt.preventDefault();

    const newCard = 
        {
        name: placeInput.value,
        link: imageInput.value
    }

    renderElements(newCard);

    closeAddCardPopup();
}

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddCardPopup)
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);

closeImageButton.addEventListener('click', closeImagePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

createCard.addEventListener('click', addCard);


