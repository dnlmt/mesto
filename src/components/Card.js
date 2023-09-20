class Card {
    constructor({ name, link, _id, likes }, template, handleCardClick, handleDeleteCard, like) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        // this._openDeletePopup = openDeletePopup;
        this._like = like;
        this._handleDeleteCard = handleDeleteCard;
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
        const likes = this._newCard.querySelector('.element__like-counter');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        place.textContent = this._name;
        if (this._likes) {
            likes.textContent = this._likes.length }
        else {
            likes.textContent = 0;
        }
    }

    _setListeners() {
        const likeButton = this._newCard.querySelector('.element__like-button');

        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("element__like-button_enabled");
            this._like();
        });

        const deleteButton = this._newCard.querySelector('.element__delete');

        deleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this._id);
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

    remove() {
        this._newCard.remove();
        this._newCard = null;
    }
}

export default Card;