import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, submit, waiting) {
        super(popup);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._button = this._popup.querySelector('.popup__button');
        this._textButton = this._button.textContent;
        this._waitingMessage = waiting;
    }

    _getInputValues() {
        const inputValues = {};
        this._formInputs.forEach((input) => {
            inputValues[input.id] = input.value;
        })
        return inputValues;
    }

    setInputValues(values) {
        const inputValues = values;
        this._formInputs.forEach((input) => {
            input.value = inputValues[input.id];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
          evt.preventDefault();
          this._waiting();
          this._submit(this._getInputValues());
      }
);
    }

    _waiting() {
        this._button.disabled = true;
        this._button.textContent = this._waitingMessage;
    }

    endWaiting() {
        this._button.disabled = false;
        this._button.textContent = this._textButton;
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;