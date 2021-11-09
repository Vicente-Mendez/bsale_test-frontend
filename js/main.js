// Se instancian elementos con los id dentro del html para insertar los datos
// Instance elements with the html ids to insert data
const proSearch = document.getElementById('pro-search')
const cmbCategory = document.getElementById('combo-box')
const output = document.getElementById('output')

window.addEventListener("load",() => {
    // Se llama fetchProducts que llena la página con los productos y llama fillComboBox que llena el filtro combobox de categorias
    // Call fetchProducts that fill the page with all of the products and fillCombobox that insert the categories to the combobox filter
    fetchProducts();
    fillComboBox();
})

proSearch.addEventListener('change', () => {
    // tomamos el valor escrito en el id'pro-search' y con el se utiliza la funcion de fetchProducts() con el valor introducido para filtrar
    // take the value in 'pro-search' and with it call fetchProducts with the value to filter by name
    let searchQuery = proSearch.value;
    loader();
    fetchProducts(searchQuery);
});
proSearch.addEventListener('click', () => {
    // lo mismo de antes pero ahora con click como detector de cambio
    // same as before but with click as eventlistener
    let searchQuery = proSearch.value;
    loader();
    fetchProducts(searchQuery);
});

cmbCategory.addEventListener('change', () => {
    //Se toma el valor de la categoria elegida en el combobox y  se llama a fetchProductsByCategory usando ese id
    // take the value of the selected categorty and call fetchProductsByCategory using that id
    let searchQuery = cmbCategory.value;
    loader();
    fetchProductsByCategory(searchQuery);
});

function loader(){
    //funcion para que cuando cargue la pagina salga un icono de carga
    // function for a loader icon to appear when the page is refreshed
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.webp"></img></div>'
}

async function fillComboBox (){
    //Esta funcion llena el combobox llamando al endpoint
    // This function fills the combobox calling the endpoint
    res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/categories/`)
    let results = await res.json();
    //se pasa el resultado del fetch a json para manipularlo mejor
    //take the results and convert it into json to better handling

    if (results.categories){
        let categories = results.categories
        values = Object.values(categories);
        //solo tomamos los valores de las categorias
        //only take the values of the categories
    }
        if(values){
            // mapear las categorias dentro del combobox
            // map this categories into comboBoxOptions
            values.map(category => {
                comboBoxOptions(category.id,category.name);
        })}

    }



async function fetchProducts(query){
    let res;
    //Si hay una query usamos el endpoint de busqueda por nombre, en caso contrario llama todos los productos
    //if theres a query, use the search by name endpoint, in the opposite case we call all the products
    if(query){
        res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/products/${query}`);
    }else{
        res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/products/`);
    }

    //take the results to json and declare values to take the values of the objects
    //los resultados a json y declarar values para tomar los valores de los objetos
    let results = await res.json();
    let values;

    //dependiendo si es query o no, devolvera products o product, por eso este if para pasarle los valores
    //depending if is query or not, returns products or product, so I make this if to insert the values
    if (results.products){
        let products = results.products
        values = Object.values(products);
    }else{
        let products = results.product
        values = Object.values(products)
    }

    //Para que el html de las cartas de productos se refresque
    //to refresh the html of the products cards
    output.innerHTML = "";

    //Aseguramos que values llega y mapeamos sus valores y se los pasamos a la funcion dataCard
    //make sure that values comes in and map its values and pass them to the datacard function
    if(values){
        values.map(product => {
            dataCard(product.url_image,product.name,product.price,product.category);
    })}
    }

    async function fetchProductsByCategory(query){
        let res;
        //tomamos la query(id de categoria) para hacer el fetch de los datos de esa categoria
        // take the query(category id) to make the fetch of the data of that category
        if(query){
            res = await fetch(`https://bsaleapi-heroku-vicente.herokuapp.com/products/category/${query}`);
        }
        let results = await res.json();
        //results to json

        let products = results.products
        //pasar los valores 
        //pass the values 
        values = Object.values(products);

        output.innerHTML = "";

        //Aseguramos que values llega y mapeamos sus valores y se los pasamos a la funcion dataCard
        //make sure that values comes in and map its values and pass them to the datacard function
        if(values){
            values.map(product => {
                dataCard(product.url_image,product.name,product.price,product.category);
        })}

    }

    
    
function dataCard(url_image, name, price, category ){
    //dataCard es un bloque de HTML de las cartas, esta funcion se utiliza en cada fetch para mostrar los productos
    //dataCard() is a html block of the product cards, this function is utilized in every fetch to show the products
        const htmlString = `<img src="${url_image}" class="img">
                <div class="info-display">
                    <h5>Nombre: ${name}</h5>
                    <h6>Precio: <span>${price}</span></h6>
                    <h6>Categoria: <span>${category}</span></h6>
                </div>`;
                
                //Creamos un div, le damos clases para estilo, por ultimo lo ingresamos con el id output
                //create a div, give it classes to stilyze it and insert it with the output id
                let outputString = document.createElement('div');
                outputString.classList.add('col-md-3', 'mb-3', 'img-info');
                outputString.innerHTML = htmlString;
                output.appendChild(outputString);
    
        }
function comboBoxOptions(id, name){
    //Comboboxoptions muestra las opciones en el combobox de las categorias, esta funcion se llama en fillcombobox
    //comboboxoptions show the options in the category combobox, this is used in fillcombobox
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = name.toUpperCase();
    cmbCategory.appendChild(opt);
}


