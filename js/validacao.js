"use sctrict"

// all global variables
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
    },
    cpf: {
        valueMissing: 'O campo não pode estar vazio!',
        customError: 'O CPF digitado não é válido.'
    },
    cep: {
        valueMissing: 'O campo não pode estar vazio!',
        patternMismatch: 'O CEP digitado não é válido.'
    }
};
const validators = {
    birthDate:input => valiDate(input),
    cpf:input => valiCPF(input)
};
const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];


// main function
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


// function that shows the error message
function showErrorMsg(inputType, input) {
    let msg = '';

    errorTypes.forEach(event => {
        if(input.validity[event]) {
            msg = errorMessages[inputType][event];
        }
    });

    return msg;
}

// date checker
birthDate.addEventListener('blur', (event) => {
    valiDate(event.target);
});

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

// cpf checker
function valiCPF(input) {
    const formattedCPF = input.value.replace((/\D/g), '');
    let msg = '';

    if(!repCheckCPF(formattedCPF)) {
        msg = 'O CPF digitado não é válido.'
    };

    input.setCustomValidity(msg);
}

function repCheckCPF(cpf) {
    const repValues = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];
    let validCPF = true;

    repValues.forEach((value) => {
        if(value === cpf) {
            validCPF = false;
        };
    });

    return validCPF;
}
