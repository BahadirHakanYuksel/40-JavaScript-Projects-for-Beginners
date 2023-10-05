const responsive_btn = document.getElementById('responsive_btn')
const menu = document.getElementById('menu')

responsive_btn.addEventListener('click',() => {
    if(menu.style.height != "calc(100vh - 5rem)"){
        menu.style.height = "calc(100vh - 5rem)"
        menu.style.visibility = 'visible'
        menu.style.opacity = '1'
    }else{
        menu.style.height = ""
        menu.style.visibility = ''
        menu.style.opacity = ''
    }
})