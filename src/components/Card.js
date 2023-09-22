class Card {
    _likeSelector;
    _likeButton;
    deleteButton;
    constructor({ name, link, _id, likes, owner }, template, handleCardClick, deletePopup, like, userId) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._deletePopup = deletePopup;
        this._owner = owner;
        this._like = like;
        this._userId = userId;
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
        this._likeSelector = this._newCard.querySelector('.element__like-counter');
        this._likeButton = this._newCard.querySelector('.element__like-button');
        if (this._likes) {
            this._likeSelector.textContent = this._likes.length;
            this._likes.forEach((like) => {
                if (like['_id'] === this._userId) {
                    this._likeButton.classList.add("element__like-button_enabled")
                }
            })
        }
    }

    updateLikes(id) {
        // if (this._likes) {
            this._likeSelector.textContent = id.likes.length;
        // }
        // else {
        //     this._likeSelector.textContent = 0;
        // }
    }

    _setListeners() {
        this._likeButton.addEventListener("click", () => {
            this._like(this);
        });

        this.deleteButton = this._newCard.querySelector('.element__delete');

        this.deleteButton.addEventListener('click', () => {
            this._deletePopup(this);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    _checkOwner() {
    if (this._owner) {
        if (this._owner._id !== this._userId) {
            this.deleteButton.remove();
        }
    }
}

    checkLike() {
        return this._likeButton.classList.contains('element__like-button_enabled')
    }

    toggleLike() {
        this._likeButton.classList.toggle("element__like-button_enabled");
    }

    getView() {
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector('.element__photo');
        this._setData();
        this._setListeners();
        this._checkOwner();

        return this._newCard;
    }

    removeCard() {
            this._newCard.remove();
            this._newCard = null;
    }
}

export default Card;