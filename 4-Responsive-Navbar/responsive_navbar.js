const responsive_btn = document.getElementById('responsive_btn')
const menu = document.getElementById('menu')
const html = document.querySelector('html')
const nav_titles = document.querySelectorAll('.nav_title')

responsive_btn.addEventListener('click',() => {
    if(menu.style.height != "calc(100vh - 5rem)"){
        menu.style.height = "calc(100vh - 5rem)"
        menu.style.visibility = 'visible'
        menu.style.opacity = '1'
    }else closeTheResponsiveMenu()
})

nav_titles.forEach(title => {
    title.addEventListener('click',() => {
        if(menu.style.height === "calc(100vh - 5rem)") closeTheResponsiveMenu()
    })
})

function closeTheResponsiveMenu(){
    menu.style.height = ""
    menu.style.visibility = ''
    menu.style.opacity = ''
    html.style.overflow = 'scroll'
}