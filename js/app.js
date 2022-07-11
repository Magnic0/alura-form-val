import { validate } from "./validacao.js";

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blue', (event) => {
        validate(event.target);
    })
})
