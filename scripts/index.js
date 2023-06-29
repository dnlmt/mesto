let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('#userName');
let jobInput = formElement.querySelector('#userSpec');

let profileName = document.querySelector('.profile__name');
let profileSpeciality = document.querySelector('.profile__speciality');

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