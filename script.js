const FormValidator = (() => {
    const form = document.querySelector('form');
    const formFields = form.querySelectorAll('input');
    const selectField = form.querySelectorAll('select');
    const passwordField = form.querySelector('#password');
    const passwordConfirmationField = form.querySelector('#password-confirmation');
    
    const validityMessages = {
        'first-name': {
            'tooShort': 'At least 2 letters',
            'tooLong': 'No more than 40 letters',
            'patternMismatch': 'Expecting only letters (A-Z)',
            'valueMissing': 'Must be filled out',
        },
        'last-name': {
            'tooShort': 'At least 2 letters',
            'tooLong': 'No more than 40 letters',
            'patternMismatch': 'Expecting only letters (A-Z)',
            'valueMissing': 'Must be filled out',
        },
        'email': {
            'tooShort': 'At least 2 characters',
            'tooLong': 'No more than 40 characters',
            'typeMismatch': 'Expecting email in the format "example@email.com"',
            'valueMissing': 'Must be filled out',
        },
        'phone': {
            'patternMismatch': 'Expecting phone number in the format "+0012345678"',
            'valueMissing': 'Must be filled out',
        },
        'country': {
            'missing': 'A country must be selected',
            'valueMissing': 'Must be filled out',
        },
        'zip': {
            'patternMismatch': 'Expecting zip code in the format "1234"',
            'valueMissing': 'Must be filled out',
        },
        'password': {
            'tooShort': 'At least 8 characters',
            'tooLong': 'No more than 40 characters',
            'patternMismatch': 'Must be between 8 and 40 characters, contain at least one uppercase and lowercase letter, one number, and one special character',
            'valueMissing': 'Must be filled out',
        },
        'password-confirmation': {
            'mismatch': 'Passwords do not match',
            'valueMissing': 'Must be filled out',
        },
    };

    const grabConstraint = (field) => {
        const validityState = field.validity;
        for (const constraint in validityState) {
            if (validityState[constraint]) {
                return constraint;
            }
        }
    };

    const getValidityMessage = (field, constraint) => {
        return validityMessages[field.id][constraint];
    };

    const setInputEventListeners = () => {
        formFields.forEach((field) => {
            field.addEventListener('input', () => {
                field.setCustomValidity('');
                if (!field.validity.valid) {
                    const constraint = grabConstraint(field);
                    const validityMessage = getValidityMessage(field, constraint);
                    field.setCustomValidity(validityMessage);
                    field.reportValidity();
                }
            });
        });
    };

    const setSelectEventListeners = () => {
        selectField.forEach((field) => {
            field.addEventListener('input', () => {
                field.setCustomValidity('');
                if (field.value === 'Select') {
                    const validityMessage = getValidityMessage(field, 'missing');
                    field.setCustomValidity(validityMessage);
                }
            });
        });
    };

    const setPasswordConfirmationEventListener = () => {
        passwordConfirmationField.addEventListener('input', () => {
            passwordConfirmationField.setCustomValidity('');
            if (passwordConfirmationField.value !== passwordField.value) {
                passwordConfirmationField.setCustomValidity('Passwords do not match');
            }
        });
    };

    const setFormEventListener = () => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            let firstInvalidField = false;

            formFields.forEach((field) => {
                if (!field.validity.valid) {
                    isValid = false;
                    if (firstInvalidField === false) {
                        field.reportValidity();
                        firstInvalidField = true;
                    };
                };
            });

            if (selectField.value === 'Select') {
                isValid = false;
                selectField.reportValidity();
            };

            if (isValid) {
                form.submit();
            }
        });
    };

    const init = () => {
        setInputEventListeners();
        setSelectEventListeners();
        setPasswordConfirmationEventListener();
        setFormEventListener();
    };

    return { init }

})();

document.addEventListener('DOMContentLoaded', () => {
    FormValidator.init();
});