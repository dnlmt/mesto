import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
    _card;
    constructor(popup, submit, waiting) {
        super(popup);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._popup.querySelector('.popup__button');
        this._textButton = this._button.textContent;
        this._waitingMessage = waiting;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
                evt.preventDefault();
                this._waiting();
                this._submit(this._card);
            }
        );
    }

    setCard(card) {
        this._card = card;
    }

    _waiting() {
        this._button.disabled = true;
        this._button.textContent = this._waitingMessage;
    }

    endWaiting() {
        this._button.disabled = false;
        this._button.textContent = this._textButton;
    }

}

export default PopupWithSubmit;