const input = document.getElementById('input');
const products = document.getElementById('products');
const add_icon = document.getElementById('add_icon');
const all_del_btn = document.getElementById('all_del_btn');
const message = document.getElementById('message');
var product_list = [];
let addBool = true;

events();

function events(){
    input.addEventListener('keyup',(e) => {
        if(e.keyCode == 13) addActions();
    });
    add_icon.addEventListener('click',addActions);
    document.addEventListener('DOMContentLoaded',page_loaded);
    document.addEventListener('click',productActions);
    all_del_btn.addEventListener('click',removeTheAllProduct);
}

function addActions(){
        const value = input.value.trim();
        value.length > 0 ? save_actions(value) : alert("Please write something !");
        input.value = "";
}

function save_actions(value){
    addBool = true;
    check_product_list()
    if(product_list.length > 0){
        product_list.forEach(product => {
            if(product.toLowerCase() === value.toLowerCase()){
                addBool = false;
            }
        })
        
        if(addBool === true){
            addUI(value);
            addStorage(value);

            scrollControlForProducts();
        }else{
            alert("The Product is Already on Your List !");
            input.value = "";
        }

    }else{
        // addUI
        addUI(value);
        // addStorage
        addStorage(value);
        
        message.style.opacity = 0;      
    }
}

function addUI(product_name){
    const product = document.createElement('div');
    product.className = 'product';

    const p_name = document.createElement('span')
    p_name.className = 'p_name';
    p_name.textContent = product_name;

    const p_icons = document.createElement('div');
    p_icons.className = 'p_icons';

    const edit = document.createElement('i');
    edit.className = 'fa-solid fa-pen-to-square edit';

    const del = document.createElement('i');
    del.className = 'fa-solid fa-trash delete';

    p_icons.appendChild(edit);
    p_icons.appendChild(del);

    product.appendChild(p_name);
    product.appendChild(p_icons);

    products.insertBefore(product,products.children[0]);
}

function addStorage(product_name){
    check_product_list();
    product_list.push(product_name);
    product_list = localStorage.setItem("Product_List",JSON.stringify(product_list));
}

function check_product_list(){
    localStorage.getItem("Product_List") === null ? product_list = [] : product_list = JSON.parse(localStorage.getItem("Product_List"));
}

function page_loaded(){
    check_product_list();
    product_list.forEach(product => addUI(product));
    scrollControlForProducts();
}

function productActions(e){
    if(e.target.className === 'fa-solid fa-trash delete'){
        // remove the UI
        e.target.parentElement.parentElement.remove();
        removeTheStorage(e.target.parentElement.parentElement.children[0].textContent);
    }if(e.target.className === 'fa-solid fa-pen-to-square edit'){
        // edit action
        const edit_sec = document.createElement('section');
        edit_sec.className = 'edit_sec';
        const edit_input = document.createElement('input');
        edit_input.className = 'edit_input';
        edit_input.placeholder = 'Edit';
        const edit_save_btn = document.createElement('button');
        edit_save_btn.className = 'edit_save_btn';
        edit_save_btn.textContent = 'Close';
        edit_sec.appendChild(edit_input);
        edit_sec.appendChild(edit_save_btn);
        e.target.parentElement.parentElement.children[0].style.display = 'none';
        e.target.parentElement.parentElement.insertBefore(edit_sec,e.target.parentElement.parentElement.children[0]);

        document.querySelector('.edit_save_btn').addEventListener('click',edit_sec_actions);
        document.querySelector('.edit_input').addEventListener('keyup',EI_Action);
    }
}

function removeTheStorage(reProductName){
    check_product_list();
    product_list.forEach((pName,index) => {
        if(pName === reProductName) product_list.splice(index,1);
    })
    product_list = localStorage.setItem("Product_List",JSON.stringify(product_list));
    scrollControlForProducts();
}

function removeTheAllProduct(){
    check_product_list();
    if(product_list.length > 0){
        product_list = []; //remove Storage
        product_list = localStorage.setItem("Product_List",JSON.stringify(product_list));
        location.reload(); //remove UI
    }
}

function scrollControlForProducts(){
    check_product_list();
    product_list.length > 4 ? products.style.overflowY = 'scroll' : products.style.overflowY = 'hidden';
    product_list.length > 0 ? message.style.opacity = 0 : message.style.opacity = 1;
}

function edit_sec_actions(e){
    if(e.target.className === 'edit_save_btn') closeTheEditSec(e.target);
    if(e.target.className === 'edit_save_btn edit_save_btn_active'){
        const newProduct = e.target.parentElement.children[0].value.trim();
        check_product_list();
        let ind;
        product_list.forEach((product,index) => {
            if(product === e.target.parentElement.parentElement.children[1].textContent){
                product_list.splice(index,1);
                ind = index;
            }
        })
        product_list.push(newProduct);
        product_list = localStorage.setItem("Product_List",JSON.stringify(product_list));
        e.target.parentElement.parentElement.children[1].textContent = newProduct;

        closeTheEditSec(e.target);
    }
}

function closeTheEditSec(btn){
    btn.parentElement.parentElement.children[1].style.display = 'block';
    btn.parentElement.remove();
}

function EI_Action(e){
    if(e.target.value.trim().length > 0){
        e.target.parentElement.children[1].classList.add('edit_save_btn_active');
        e.target.parentElement.children[1].textContent = 'Save';
    }
    else{ 
        e.target.parentElement.children[1].classList.remove('edit_save_btn_active');
        e.target.parentElement.children[1].textContent = 'Close';
    }    
}