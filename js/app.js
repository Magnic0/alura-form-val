import { validate } from "./validacao.js";

const inputs = document.querySelectorAll('input');
const birthDate = document.querySelector('#nascimento');

inputs.forEach((input) => {
    input.addEventListener('blur', (event) => {
        validate(event.target);
    })
    if(birthDate !== null) {
        birthDate.addEventListener('blur', (event) => {
            valiDate(event.target);
        });
    }
})
