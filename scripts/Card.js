import openPopup from "./index.js";

class Card {
    constructor (card) {
        this._name = card.name;
        this._link = card.link;
    }

    _getTemplate() {
        const cardTemplate = document
        .querySelector('#element-template')
        .content.querySelector('.element')
        .cloneNode(true);

        return cardTemplate;
    }

    _setData() {
        const place = this._newCard.querySelector('.element__place');
        const image = this._newCard.querySelector('.element__photo');
        image.src = this._link;
        image.alt = this._name;
        place.textContent = this._name;

        return image;
    }

    _showImage() {
        const popupImage = document.querySelector('.popup__image');
        const popupImageName = document.querySelector('.popup__image-name');
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageName.textContent = this._name;
        openPopup(imagePopup);
    };

    _setListeners() {
        const likeButton = this._newCard.querySelector('.element__like-button');

        likeButton.addEventListener('click', () => {
            if (!likeButton.classList.contains('element__like-button_enabled')) {
                likeButton.classList.add('element__like-button_enabled');
            } else {
                likeButton.classList.remove('element__like-button_enabled');
            }
        })

        const deleteButton = this._newCard.querySelector('.element__delete');

        deleteButton.addEventListener('click', () => {
            this._newCard.remove();
            this._newCard = null;
        });

        this._setData().addEventListener('click', () => this._showImage());
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();

        return this._newCard;
    }
}

export default Card;