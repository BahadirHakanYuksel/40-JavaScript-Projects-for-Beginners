const hexCode = document.getElementById('hex-code')
const changeColorBtn = document.getElementById('change-color')
const copyBtn = document.getElementById('copy-btn')

changeColorBtn.addEventListener('click',() => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16); // create random color code
    hexCode.textContent = `#${randomColor}`
    document.querySelector('.container').style.backgroundColor = `#${randomColor}`
})

copyBtn.addEventListener('click',() => {
    // animation - start
    copyBtn.style.backgroundColor = 'green'
    copyBtn.textContent = 'Copied'
    setTimeout(() => {
        copyBtn.style.backgroundColor = ''
        copyBtn.textContent = 'Copy'
    }, 3000);
    // animation - end

    // copy code - start
    navigator.clipboard.writeText(`background-color : ${hexCode.textContent.trim()}`)
    console.log(`background-color : ${hexCode.textContent.trim()}`);
    // copy code - end
})
