const showInputError = (form, input) => {
    input.classList.add(validationConfig.inputErrorClass);
    const span = form.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
};

const hideInputError = (form, input) => {
    input.classList.remove(validationConfig.inputErrorClass);
    const span = form.querySelector(`.${input.id}-error`);
    span.textContent = '';
};

const deleteError = (form) => {
    const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    
    inputs.forEach(input => {
            hideInputError(form, input)
    });
};

const disableButton = (button) => {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true
}

function enableValidation(config) {

    const isValid = (form, input) => {
        input.validity.valid.log;
        if (!input.validity.valid) {
            showInputError(form, input)
        } else {
            hideInputError(form, input)
        }
    };

    const hasInvalidValue = (inputs) => {
        return inputs.some(input => !input.validity.valid)
    };

    const toggleButtonState = (inputs, button) => {
      if (hasInvalidValue(inputs)) {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true
      } else {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false
      }
    };

    const setEventListeners = (form) => {
        const inputs = Array.from(form.querySelectorAll(config.inputSelector));
        const button = form.querySelector(config.submitButtonSelector);

        toggleButtonState(inputs, button);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                isValid(form, input);
                toggleButtonState(inputs, button);
            })
        })
    };

    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach(form => {
        setEventListeners(form)
    })
}

