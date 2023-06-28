let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


// Находим форму в DOM
let formElement = document.querySelector('.popup');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#userName');
let jobInput = formElement.querySelector('#userSpec');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    let userNameInput = nameInput.value;
    let userJobInput = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    let profileName = document.querySelector('.profile__name');
    let profileSpeciality = document.querySelector('.profile__speciality');

    // Вставьте новые значения с помощью textContent

    profileName.textContent = userNameInput;
    profileSpeciality.textContent = userJobInput;
    
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 