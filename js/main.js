const proSearch = document.getElementById('pro-search')
const cmbCategory = document.getElementById('combo-box')
const output = document.getElementById('output')

window.addEventListener("load",() => {
    fetchProducts();
    fillComboBox();
})

proSearch.addEventListener('change', () => {
    let searchQuery = proSearch.value;
    console.log(searchQuery)
    loader();
    fetchProducts(searchQuery);
});
proSearch.addEventListener('click', () => {
    let searchQuery = proSearch.value;
    console.log(searchQuery)
    loader();
    fetchProducts(searchQuery);
});

cmbCategory.addEventListener('change', () => {
    let searchQuery = cmbCategory.value;
    console.log(searchQuery)
    loader();
    fetchProductsByCategory(searchQuery);
});

function loader(){
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.webp"></img></div>'
}

async function fillComboBox (){
    res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/categories/`)
    let results = await res.json();

    if (results.categories){
        let categories = results.categories
        values = Object.values(categories);
    }
        if(values){
            values.map(category => {
                console.log("category", category)
                comboBoxOptions(category.id,category.name);
        })}

    }



async function fetchProducts(query){
    let res;

    if(query){
        res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/products/${query}`);
    }else{
        res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/products/`);
    }

    let results = await res.json();
    let values;
    let array = [];

    if (results.products){
        let products = results.products
        values = Object.values(products);
    }else{
        let products = results.product

        array.push(products)
    }


    output.innerHTML = "";

    if(values){
        values.map(product => {
            dataCard(product.url_image,product.name,product.price,product.category);
    })}
    if(array){
        array.map(product => {
            dataCard(product.url_image,product.name,product.price,product.category);
    }
    )}}

    async function fetchProductsByCategory(query){
        let res;
        if(query){
            res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/products/category/${query}`);
        }
        let results = await res.json();

        let products = results.products
        values = Object.values(products);

        output.innerHTML = "";

        if(values){
            values.map(product => {
                dataCard(product.url_image,product.name,product.price,product.category);
        })}

    }

    
    
function dataCard(url_image, name, price, category ){
        const htmlString = `<img src="${url_image}" class="img">
                <div class="info-display">
                    <h5>Nombre: ${name}</h5>
                    <h6>Precio: <span>${price}</span></h6>
                    <h6>Categoria: <span>${category}</span></h6>
                </div>`;
                
                let outputString = document.createElement('div');
                outputString.classList.add('col-md-3', 'mb-3', 'img-info');
                outputString.innerHTML = htmlString;
                output.appendChild(outputString);
    
        }
function comboBoxOptions(id, name){
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = name.toUpperCase();
    cmbCategory.appendChild(opt);
}


