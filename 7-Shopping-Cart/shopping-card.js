const scm_open_btn = document.getElementById('Shopping-Cart-Btn');
const shopping_cart_menu = document.getElementById('shopping_cart_menu');
const closeTheShoppingCartBtn = document.getElementById('closeTheShoppingCartBtn');
const products = document.getElementById('products');
const numbers_of_products = document.getElementById('numbers_of_products');
const scm_products = document.getElementById('scm_products');
const totalCost = document.getElementById('totalCost');
const total = document.getElementById('total');
const html = document.querySelector('html');

let carts = [];
let counter = 0;
let sumOf_totalCost = 0;

runEvenets();

function runEvenets(){
    scm_open_btn.addEventListener('click',openTheShoppingCartMenu);
    closeTheShoppingCartBtn.addEventListener('click',closeTheShoppingCartMenu);
    document.addEventListener('DOMContentLoaded',pageLoadedActions);
    document.addEventListener('click',clickActions);
}

function openTheShoppingCartMenu(){
    html.style.overflowY = 'hidden';
    shopping_cart_menu.classList.add('scm_active');
    check_carts();
    carts.forEach(cart => {
        addTheUI_scm(cart.inno,cart.name,cart.cost,cart.src);
    })

    sumOf_totalCost = 0;
    const scm_product = document.querySelectorAll('.scm_product');
    if(scm_product.length > 0){
        total.style.display = '';
        scm_product.forEach(pr => {
            sumOf_totalCost += Number(pr.children[1].children[1].children[1].children[0].textContent) * Number(pr.children[2].children[0].children[1].textContent);
            totalCost.textContent = sumOf_totalCost;
        });
        scrollControl();
    }else total.style.display = 'none';
}

function closeTheShoppingCartMenu(){
    html.style.overflowY = '';
    shopping_cart_menu.classList.remove('scm_active');
    const scm_product = document.querySelectorAll('.scm_product');

    check_carts();

    scm_product.forEach(pr => {
        const indexNo = Number(pr.children[0].textContent);

        carts.forEach(cart => {
            if(cart.inno === indexNo){
                cart.quantity = Number(pr.children[2].children[0].children[1].textContent);
            }
        })

    })

    carts = localStorage.setItem("Carts",JSON.stringify(carts));

    scm_product.forEach(scmp => scmp.remove());
}

function pageLoadedActions(){
    getTheProductsToHome();
    check_carts();
    counter = carts.length
    animationTheCartOfShopping_Add(counter);
}

function getTheProductsToHome(){
    fetch("data.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
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
    add_the_shopping_cart.textContent = 'Add Cart';
    check_carts();

    if(carts.length > 0){
        carts.forEach(cart => {
            if(cart.inno === _inno){
                add_the_shopping_cart.classList.add("added_add_the_shopping_cart");
                add_the_shopping_cart.textContent = 'Take Back';
            }
        })
    }
    else{
        add_the_shopping_cart.className = 'add_the_shopping_cart';
        add_the_shopping_cart.textContent = 'Add Cart';
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

    products.appendChild(product);

}

function clickActions(e){
    if(e.target.className === 'add_the_shopping_cart'){
        const addBtn = e.target;
        const _inno = Number(addBtn.parentElement.parentElement.children[0].textContent);
        const cost = addBtn.parentElement.children[0].children[0].textContent;
        const name = addBtn.parentElement.parentElement.children[1].textContent;
        const src = addBtn.parentElement.parentElement.children[2].children[0].src;

        var newCart = new createCart()
        newCart.name = name;
        newCart.cost = cost;
        newCart.src = src;
        newCart.inno = _inno;
        newCart.quantity = 1;

        check_carts();
        carts.push(newCart);
        carts = localStorage.setItem('Carts',JSON.stringify(carts));

        addBtn.textContent = 'Take Back';
        addBtn.classList.add('added_add_the_shopping_cart');
        counter++;
        animationTheCartOfShopping_Add(counter,0);
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
        addBtn.textContent = 'Add Cart';
        addBtn.classList.remove('added_add_the_shopping_cart');

        if(counter != 0) counter--;
        animationTheCartOfShopping_Add(counter,1);
    }
    else if(e.target.className === 'fa-solid fa-minus minus' || e.target.className === 'fa-solid fa-plus sum'){
        let scm_counter = Number(e.target.parentElement.children[1].textContent);
        if(e.target.className === 'fa-solid fa-minus minus'){
            // minusBtn = e.target;
            if(scm_counter > 1){
                scm_counter--;
                sumOf_totalCost -= Number(e.target.parentElement.parentElement.parentElement.children[1].children[1].children[1].children[0].textContent);
            }
            e.target.parentElement.children[1].textContent = scm_counter;
            
            totalCost.textContent = sumOf_totalCost;
        }else if(e.target.className === 'fa-solid fa-plus sum'){
            if(scm_counter < 10){
                scm_counter++;
                sumOf_totalCost += Number(e.target.parentElement.parentElement.parentElement.children[1].children[1].children[1].children[0].textContent);
            }
            totalCost.textContent = sumOf_totalCost;
            e.target.parentElement.children[1].textContent = scm_counter;
        }
    }
    else if(e.target.className === 'remove_scmp_btn'){
        
        const multi = Number(e.target.parentElement.children[1].children[0].textContent) * Number(e.target.parentElement.parentElement.parentElement.children[2].children[0].children[1].textContent);
        totalCost.textContent = Number(totalCost.textContent)-multi;

        if(counter != 0) counter --;
        numbers_of_products.textContent = counter;

        const index_no = Number(e.target.parentElement.parentElement.parentElement.children[0].textContent);
        check_carts();
        carts.forEach((cart,index) => {
            if(cart.inno === index_no) carts.splice(index,1);
        });
        carts = localStorage.setItem('Carts',JSON.stringify(carts));

        const homeProducts = document.querySelectorAll('.product');
        homeProducts.forEach(pr => {
            if(pr.children[0].textContent == index_no){
                pr.children[3].children[1].textContent = 'Add Cart';
                pr.children[3].children[1].classList.remove('added_add_the_shopping_cart');
            }
        });

        e.target.parentElement.parentElement.parentElement.remove();

        scrollControl();
    }
}

function animationTheCartOfShopping_Add(count,controlValue){
    numbers_of_products.textContent = count;

    if(controlValue === 0){
        const add_animation_area = document.getElementById('add_animation_area');
        add_animation_area.style.display = ''
        add_animation_area.style.left = '';

        setTimeout(() => add_animation_area.style.left = '12rem', 1);
        setTimeout(() => {
            add_animation_area.style.transition = '0';
            add_animation_area.style.display = 'none';
            add_animation_area.style.left = '';
        },501);
        setTimeout(() => add_animation_area.style.transition = '', 502);
    }if(controlValue === 1){
        const minus_animation_area = document.getElementById('minus_animation_area');
        
        minus_animation_area.style.left = '';
        minus_animation_area.style.display = ''

        setTimeout(() => minus_animation_area.style.left = '-12rem', 1);
        setTimeout(() => {
            minus_animation_area.style.transition = '0';
            minus_animation_area.style.display = 'none';
            minus_animation_area.style.left = '';
        },501);
        setTimeout(() => minus_animation_area.style.transition = '', 502);
    }
}

function addTheUI_scm(_inno,_name,_cost,_src){

    const indexNoSCM = document.createElement('span');
    indexNoSCM.className = 'scm_index';
    indexNoSCM.textContent = _inno;

    const scm_product = document.createElement('div');
    scm_product.className = 'scm_product';

    scm_product.appendChild(indexNoSCM);

    const scmp_left = document.createElement('div');
    scmp_left.className = 'scmp_left';

    const scmp_img_div = document.createElement('div');
    scmp_img_div.className = 'scmp_img_div';

    const img = document.createElement('img');
    img.src = _src;

    scmp_img_div.appendChild(img);

    const scmp_infos = document.createElement('div');
    scmp_infos.className = 'scmp_infos';

    const scmp_name = document.createElement('span');
    scmp_name.className = 'scmp_name';
    scmp_name.textContent = _name;

    const scmp_cost_div = document.createElement('div');
    scmp_cost_div.className = 'scmp_cost_div';

    const scmp_cost = document.createElement('span');
    scmp_cost.className = 'scmp_cost';
    scmp_cost.textContent = _cost;

    const cost_txt = document.createElement('span');
    cost_txt.textContent = 'TL';

    const remove_scmp_btn = document.createElement('button');
    remove_scmp_btn.className = 'remove_scmp_btn';
    remove_scmp_btn.textContent = 'Remove';

    scmp_infos.appendChild(scmp_name);
    scmp_cost_div.appendChild(scmp_cost);
    scmp_cost_div.appendChild(cost_txt);
    scmp_infos.appendChild(scmp_cost_div);
    scmp_infos.appendChild(remove_scmp_btn);

    scmp_left.appendChild(scmp_img_div);
    scmp_left.appendChild(scmp_infos);


    const scmp_right = document.createElement('div');
    scmp_right.className = 'scmp_right';

    const control_of_scmp_numbers = document.createElement('div');
    control_of_scmp_numbers.className = 'control_of_scmp_numbers';

    const minus = document.createElement('i');
    minus.className = 'fa-solid fa-minus minus';

    check_carts();

    const numbersOfThisProduct = document.createElement('span');
    numbersOfThisProduct.className = 'numbersOfThisProduct';

    carts.forEach(cart => {
        if(cart.inno === _inno){
            numbersOfThisProduct.textContent = cart.quantity;
        }
    })

    const sum = document.createElement('i');
    sum.className = 'fa-solid fa-plus sum';

    control_of_scmp_numbers.appendChild(minus);
    control_of_scmp_numbers.appendChild(numbersOfThisProduct);
    control_of_scmp_numbers.appendChild(sum);

    scmp_right.appendChild(control_of_scmp_numbers);

    scm_product.appendChild(scmp_left);
    scm_product.appendChild(scmp_right);

    scm_products.insertBefore(scm_product,scm_products.children[0]);
}


var createCart = function(){
    this.name,
    this.cost,
    this.src,
    this.inno,
    this.quantity
}

function check_carts(){
    if(localStorage.getItem("Carts") === null){
        carts = []
    }else{
        carts = JSON.parse(localStorage.getItem("Carts"))
    }
}

function scrollControl(){
    const scmProducts = document.querySelectorAll(".scm_product");
    const mainScmp = document.getElementById('scm_products');
    if(scmProducts.length > 4){
        mainScmp.style.height = '43rem';
        mainScmp.style.overflowY = 'scroll';
    }else{
        mainScmp.style.height = '';
        mainScmp.style.overflowY = '';
    }
}