const main = document.body

let systemColor = []

const cards = document.querySelectorAll('.card')
const left_btn = document.getElementById('left_btn')
const right_btn = document.getElementById('right_btn')

const time = 5000 //5s
const auto = true
let card_interval

right_btn.addEventListener('click',() => {
    if(auto){
        clearInterval(card_interval)
        card_interval = setInterval(slider_right,time)
    }
    slider_right()
})
left_btn.addEventListener('click',() => {
    if(auto){
        clearInterval(card_interval)
        card_interval = setInterval(slider_right,time)
    }
    slider_left()
})

const slider_right = () => {
    const active_card = document.querySelector('.active_card')
    active_card.classList.remove('active_card')
    active_card.nextElementSibling.className === 'card' ? active_card.nextElementSibling.classList.add('active_card') : cards[0].classList.add('active_card')
}
const slider_left = () => {
    const active_card = document.querySelector('.active_card')
    active_card.classList.remove('active_card')
    active_card.previousElementSibling.className === 'card' ? active_card.previousElementSibling.classList.add('active_card') : cards[cards.length - 1].classList.add('active_card')
}

if(auto) card_interval = setInterval(slider_right(),time)


//change color
const colors = document.querySelectorAll('.color')

colors.forEach((color,i) => {
    color.addEventListener('click',() => {
        if(color.classList[1] != 'active_color'){
            colors.forEach(color => color.classList.remove('active_color'))
            color.classList.add('active_color')
            remove_colors()
            if(i === 0){
                checkSC()
                main.classList.add('blue')
                systemColor.push(i)
                systemColor.push('blue')
                systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
            }
            if(i === 1){
                checkSC()
                main.classList.add('red')
                systemColor.push(i)
                systemColor.push('red')
                systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
            }
            if(i === 2){
                checkSC()
                main.classList.add('green')
                systemColor.push(i)
                systemColor.push('green')
                systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
            }
            if(i === 3){
                checkSC()
                main.classList.add('pink')
                systemColor.push(i)
                systemColor.push('pink')
                systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
            }
            if(i === 4){
                checkSC()
                main.classList.add('purple')
                systemColor.push(i)
                systemColor.push('purple')
                systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
            }
            if(i === 5){
                checkSC()
                main.classList.add('orange')
                systemColor.push(i)
                systemColor.push('orange')
                systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
            }

        }
    })
})

function remove_colors(){
    checkSC()
    main.classList.remove('red')
    main.classList.remove('orange')
    main.classList.remove('pink')
    main.classList.remove('purple')
    main.classList.remove('green')
    systemColor = []
    systemColor = localStorage.setItem('sc',JSON.stringify(systemColor))
}

document.addEventListener('DOMContentLoaded',() => {
    checkSC()
    if(systemColor.length > 0){
        main.classList.add(systemColor[1])
        colors.forEach((color,index) => {
            color.classList.remove('acive_color')
            if(index === systemColor[0]){
                color.classList.add('active_color')
            }
        })
    }else{
        main.classList.add("blue")
        colors.forEach((color,index) => {
            color.classList.remove('acive_color')
            if(index === 0){
                color.classList.add('active_color')
            }
        })
    }
})  

function checkSC(){
    localStorage.getItem("sc") === null ? systemColor = [] : systemColor = JSON.parse(localStorage.getItem("sc"))
}