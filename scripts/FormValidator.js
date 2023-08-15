class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(input) {
        input.classList.add(this._config.inputErrorClass);
        const span = this._form.querySelector(`.${input.id}-error`);
        span.textContent = input.validationMessage;
    };

    _hideInputError(input) {
        input.classList.remove(this._config.inputErrorClass);
        const span = this._form.querySelector(`.${input.id}-error`);
        span.textContent = '';
    };

    _hasInvalidValue() {
        return this._inputs.some(input => !input.validity.valid)
    };

    _toggleButtonState() {
        if (this._hasInvalidValue(this._inputs)) {
          this._button.classList.add(this._config.inactiveButtonClass);
          this._button.disabled = true
        } else {
          this._button.classList.remove(this._config.inactiveButtonClass);
          this._button.disabled = false
        }
    };

    _isValid(input) {
        input.validity.valid.log;
        if (!input.validity.valid) {
            this._showInputError(input)
        } else {
            this._hideInputError(input)
        }
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonState();
            })
    })}

    deleteError() {
        this._inputs.forEach(input => {
        this._hideInputError(input)
        });
    };
    
    disableButton() {
        this._button.classList.add(this._config.inactiveButtonClass);
        this._button.disabled = true
    }

    enableValidation() {
        const forms = Array.from(document.querySelectorAll(this._config.formSelector));

        forms.forEach(form => {
            this._setEventListeners(form)
        })
    }
}

export default FormValidator;