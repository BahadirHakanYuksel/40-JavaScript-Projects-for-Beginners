const scm_open_btn = document.getElementById('Shopping-Cart-Btn');
const shopping_cart_menu = document.getElementById('shopping_cart_menu');
const closeTheShoppingCartBtn = document.getElementById('closeTheShoppingCartBtn');
const products = document.getElementById('products');

let carts = [];

runEvenets();

function runEvenets(){
    scm_open_btn.addEventListener('click',openTheShoppingCartMenu);
    closeTheShoppingCartBtn.addEventListener('click',closeTheShoppingCartMenu);
    document.addEventListener('DOMContentLoaded',pageLoadedActions);
    document.addEventListener('click',clickActions);
}

function openTheShoppingCartMenu(){
    shopping_cart_menu.classList.add('scm_active');
}

function closeTheShoppingCartMenu(){
    shopping_cart_menu.classList.remove('scm_active');
}

function pageLoadedActions(){
    getTheProductsToHome();
}

function getTheProductsToHome(){
    fetch("data.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            console.log(product);
            addTheUIHome(product.index,product.name,product.cost,product.src);
        });
    })
    .catch(err => console.log(err))
}

function addTheUIHome(_inno,_name,_cost,_src){

    const product = document.createElement('div');
    product.className = 'product';

    const p_title = document.createElement('header');
    p_title.className = 'p_title';
    p_title.textContent = _name;

    const p_img_div = document.createElement('div');
    p_img_div.className = 'p_img_div';

    const p_img = document.createElement('img');
    p_img.className = 'p_img';
    p_img.src = _src;

    const p_infos = document.createElement('div');
    p_infos.className = 'p_infos';

    const cost_div = document.createElement('div');
    cost_div.className = 'cost_div'

    const cost = document.createElement('span');
    cost.className = 'cost';
    cost.textContent = _cost;

    const cost_text = document.createElement('span');
    cost_text.className = 'cost_text';
    cost_text.textContent = 'TL';

    const add_the_shopping_cart = document.createElement('button');
    add_the_shopping_cart.className = 'add_the_shopping_cart';
    add_the_shopping_cart.textContent = 'Add Box';
    check_carts();

    if(carts.length > 0){
        carts.forEach(cart => {
            if(cart.inno === _inno){
                add_the_shopping_cart.classList.add("added_add_the_shopping_cart");
                add_the_shopping_cart.textContent = 'Back Up';
            }
        })
    }
    else{
        add_the_shopping_cart.className = 'add_the_shopping_cart';
        add_the_shopping_cart.textContent = 'Add Box';
    }
    
    const inno_span = document.createElement('span');
    inno_span.className = 'inno';
    inno_span.textContent = _inno;

    product.appendChild(inno_span);
    product.appendChild(p_title);
    p_img_div.appendChild(p_img);
    product.appendChild(p_img_div);
    cost_div.appendChild(cost);
    cost_div.appendChild(cost_text);
    p_infos.appendChild(cost_div);
    p_infos.appendChild(add_the_shopping_cart);
    product.appendChild(p_infos);

    products.insertBefore(product,products.children[0]);

}

function clickActions(e){
    if(e.target.className === 'add_the_shopping_cart'){
        const addBtn = e.target;
        const _inno = Number(addBtn.parentElement.parentElement.children[0].textContent);
        const cost = addBtn.parentElement.children[0].children[0].textContent;
        const name = addBtn.parentElement.parentElement.children[1].textContent;
        const src = addBtn.parentElement.parentElement.children[2].children[0].src;
        console.log(_inno);
        var newCart = new createCart()
        newCart.name = name;
        newCart.cost = cost;
        newCart.src = src;
        newCart.inno = _inno;

        check_carts();
        console.log(carts);
        carts.push(newCart);
        carts = localStorage.setItem('Carts',JSON.stringify(carts));

        addBtn.textContent = 'Back Up';
        addBtn.classList.add('added_add_the_shopping_cart');
        animationTheCartOfShopping();
    }
    else if(e.target.className === 'add_the_shopping_cart added_add_the_shopping_cart'){
        const addBtn = e.target;
        const Index_no = Number(addBtn.parentElement.parentElement.children[0].textContent)
        check_carts();
        carts.forEach((cart,index) => {
            if(cart.inno === Index_no){
                carts.splice(index,1);
            }
        })
        carts = localStorage.setItem('Carts',JSON.stringify(carts));
        addBtn.textContent = 'Add Box';
        addBtn.classList.remove('added_add_the_shopping_cart');
    }
}

function animationTheCartOfShopping(){
    console.log("an");
}



var createCart = function(){
    this.name,
    this.cost,
    this.src,
    this.inno
}

function check_carts(){
    if(localStorage.getItem("Carts") === null){
        carts = []
    }else{
        carts = JSON.parse(localStorage.getItem("Carts"))
    }
}