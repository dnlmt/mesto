let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('#userName');
let jobInput = formElement.querySelector('#userSpec');

let profileName = document.querySelector('.profile__name');
let profileSpeciality = document.querySelector('.profile__speciality');

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

    elements.append(card);
  } 

  initialCards.forEach((card) => {
    renderElements(card);
  });

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpeciality.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
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
    
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 