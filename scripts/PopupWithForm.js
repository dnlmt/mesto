import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, form, submit) {
        super(popup);
        this._submit = submit;
        this._form = form;
    }

    _getInputValues() {
        const inputs = {};
        const formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
        formInputs.forEach((input) => {
            inputs[input.id] = input.value;
        })
        return inputs;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submit);
    }

    close() {
        super.close();
        this._form.reset;
    }
}

export default PopupWithForm;