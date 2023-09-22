const inc = document.getElementById('inc')
const dec = document.getElementById('dec')
const reset = document.getElementById('reset')
const number = document.getElementById('number')

let counter = 0

inc.addEventListener('click',() => {
    counter = counter + 1
    number.textContent = counter
})
dec.addEventListener('click',() => {
    counter = counter - 1
    number.textContent = counter
})
reset.addEventListener('click',() => {
    counter = 0
    number.textContent = counter
})