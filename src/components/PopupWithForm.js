import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, submit) {
        super(popup);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        const inputValues = {};
        this._formInputs.forEach((input) => {
            inputValues[input.id] = input.value;
        })
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._form.addEventListener('submit', evt => {
          evt.preventDefault();
          this._submit(this._getInputValues());
      })
);
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;