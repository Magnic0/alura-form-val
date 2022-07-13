import { validate } from "./validacao.js";

const inputs = document.querySelectorAll('input');
const birthDate = document.querySelector('#nascimento');

inputs.forEach((input) => {

    input.addEventListener('blur', (event) => {
        validate(event.target);
        if(input.dataset.type === 'price') {
            if(input.value == 0) {
                return;
            }
            SimpleMaskMoney.setMask(input, {
                allowNegative: false,
                prefix: 'R$ ',
                fixed: true,
                fractionDigits: 2,
                decimalSeparator: ',',
                thousandsSeparator: '.',
                cursor: 'end'
            })
        }
    })

    if(birthDate !== null) {
        birthDate.addEventListener('blur', (event) => {
            valiDate(event.target);
        });
    }
})
