class Card {
    constructor(card, template, handleCardClick) {
        this._name = card.name;
        this._link = card.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._template)
            .content.querySelector('.element')
            .cloneNode(true);

        return cardTemplate;
    }

    _setData() {
        const place = this._newCard.querySelector('.element__place');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        place.textContent = this._name;
    }

    _setListeners() {
        const likeButton = this._newCard.querySelector('.element__like-button');

        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("element__like-button_enabled");
        });

        const deleteButton = this._newCard.querySelector('.element__delete');

        deleteButton.addEventListener('click', () => {
            this._newCard.remove();
            this._newCard = null;
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    getView() {
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector('.element__photo');
        this._setData();
        this._setListeners();

        return this._newCard;
    }
}

export default Card;