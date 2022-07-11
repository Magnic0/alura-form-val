"use sctrict"

const birthDate = document.querySelector('#nascimento');

console.log(birthDate.value);

birthDate.addEventListener('blur', (event) => {
    valiDate(event.target);
});

export function validate(input) {
    const inputType = input.dataset.type;

    if(validators[inputType]) {
        validators[inputType](input);
    };
}

const validators = {
    birthDate:input => valiDate(input)
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
