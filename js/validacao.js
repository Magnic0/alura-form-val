"use sctrict"

const birthDate = document.querySelector('#nascimento');
const errorMessages = {
    email: {
        typeMismatch: 'Digite um email válido.',
        valueMissing: 'O campo não pode estar vazio!'
    },
    password: {
        patternMismatch: 'A senha deve conter ao menos 6 e no máximo 24 caracteres, com no mínimo uma letra maiúscula, uma minúscula e um número',
        valueMissing: 'O campo não pode estar vazio!'
    },
    birthDate: {
        customError: 'Você deve ser maior de 18 para se cadastrar!',
        valueMissing: 'O campo não pode estar vazio!'
    }
};
const validators = {
    birthDate:input => valiDate(input)
};
const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

export function validate(input) {
    const inputType = input.dataset.type;

    if(validators[inputType]) {
        validators[inputType](input);
    };

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = showErrorMsg(inputType, input);
    };
}

function showErrorMsg(inputType, input) {
    let msg = '';

    errorTypes.forEach(event => {
        if(input.validity[event]) {
            msg = errorMessages[inputType][event];
        }
    });

    return msg;
}

function valiDate(input) {
    const receivedDate = new Date(input.value);
    let message = '';

    if(!moreThan18(receivedDate)) {
        message = 'Você deve ser maior de 18 para se cadastrar!';
    };

    input.setCustomValidity(message);
}

function moreThan18(date) {
    const currentDate = new Date();
    const moreThan18Date = new Date(
        date.getUTCFullYear() + 18,
        date.getUTCMonth(),
        date.getUTCDate()
    );

    return (moreThan18Date <= currentDate);
}

birthDate.addEventListener('blur', (event) => {
    valiDate(event.target);
});
