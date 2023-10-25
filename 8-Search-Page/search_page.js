const buttons = document.querySelectorAll('#sd_2 > button');
const products = document.getElementById('products');
const search_input = document.getElementById('search_input');
const not_found_message = document.getElementById('not_found_message');

function events(){
    buttons.forEach(btn => {
        btn.addEventListener('click',() => {
            buttons.forEach(btn => btn.classList.remove('active'))
            btn.classList.add('active');
            document.querySelectorAll('.product').forEach(p => p.remove());
                fetch("data.json")
                .then(res => res.json())
                .then(data => {
                data.forEach(title => {
                    if(title.name === btn.id){
                        title.products.forEach(product => {
                            UI(
                                product.img,
                                product.name,
                                product.cost,
                                product.description
                            );
                        })
                    }else if(btn.id === 'all'){
                        title.products.forEach(product => {
                            UI(
                                product.img,
                                product.name,
                                product.cost,
                                product.description
                            );
                        })
                    }
                })
            })
            .catch(err => alert("Opss, Error !"));
        })
    });
    document.addEventListener('DOMContentLoaded',pageLoaded);
    search_input.addEventListener('keyup',search);
};
events();

function pageLoaded(){

    fetch("data.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(title => {
            title.products.forEach(product => {
                UI(
                    product.img,
                    product.name,
                    product.cost,
                    product.description
                )
            })
        })
    })
    .catch(err => alert("Opss, Error !"));
}

function UI(url,name,cost,description){
    const product = document.createElement('div');
    product.className = 'product';

    const img = document.createElement('div');
    img.className = 'img';
    img.style.backgroundImage = `url(${url})`;

    const product_infos = document.createElement('div');
    product_infos.className = 'product_infos';

    const dp_top = document.createElement('div');
    dp_top.className = 'dp_top';

    const product_name = document.createElement('header');
    product_name.className = 'product_name';
    product_name.textContent = name;

    const product_cost = document.createElement('span');
    product_cost.className = 'product_cost';
    product_cost.textContent = `$ ${cost}`;

    const product_description = document.createElement('p');
    product_description.className = 'product_description';
    product_description.textContent = description;

    dp_top.appendChild(product_name);
    dp_top.appendChild(product_cost);

    product_infos.appendChild(dp_top);
    product_infos.appendChild(product_description);

    product.appendChild(img);
    product.appendChild(product_infos);

    products.appendChild(product);
}

function search(){
    let counter = 0;
    document.querySelectorAll('.product').forEach(p => {
        if(p.children[1].children[0].children[0].textContent.toLowerCase().includes(search_input.value.toLowerCase().trim())){
            p.style.display = '';
            not_found_message.style.display = '';
        }else{
            p.style.display = 'none';
            if(counter === 0) not_found_message.style.display = 'flex';
        }
    });
}
