const proSearch = document.getElementById('pro-search')
const output = document.getElementById('output')

window.addEventListener("load",() => {
    fetchProducts();
})

proSearch.addEventListener('change', () => {
    let searchQuery = proSearch.value;
    console.log(searchQuery)
    loader();
    fetchProducts(searchQuery);
});

function loader(){
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.webp"></img></div>'
}


async function fetchProducts(query){
    let res;

    if(query){
        res = await fetch(`http://localhost:3000/products/${query}`);
    } else {
        res = await fetch(`http://localhost:3000/products/`)
    }

    let results = await res.json();
    let values;
    let array = [];

    if (results.products){
        let asd = results.products
        values = Object.values(asd);
    }else{
        let asd = results.product

        array.push(asd)
        console.log("asd", values)
    }


    output.innerHTML = "";

    if(values){
        values.map(product => {
            dataCard(product.url_image,product.name,product.price);
    })}
    if(array){
        array.map(product => {
            dataCard(product.url_image,product.name,product.price);
    }
        )}}

    function dataCard(url_image, name, price ){
        const htmlString = `<img src="${url_image}" class="img">
                <div class="info-display">
                    <h5>Nombre: ${name}</h5>
                    <h6>Precio: <span>${price}</span></h6>
                </div>`;
                
                let outputString = document.createElement('div');
                outputString.classList.add('col-md-3', 'mb-3', 'img-info');
                outputString.innerHTML = htmlString;
                output.appendChild(outputString);
    
        }