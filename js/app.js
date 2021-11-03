const menuBurguer = document.querySelector('#menu');
const menuBurguer1 = document.querySelector('#menu1');
let carrito;
let total = 0;


$().ready(function () {
    const carStorage = JSON.parse(localStorage.getItem(`carrito`));

    carrito = carStorage || [];
    $.ajax({
        url: 'js/hamburguesas.json',
        success: function (hamburguesasClasicas, textStatus, xhr){
            listaDeHamburguesas(hamburguesasClasicas)
        },
        error: function (xhr, textStatus, error){
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        },
    })
    $.ajax({
        url: 'js/hamburguesasG.json',
        success: function (hamburguesasGourmet, textStatus, xhr){
            listaDeHamburguesas1(hamburguesasGourmet)
        },
        error: function (xhr, textStatus, error){
            console.log(xhr);       
            console.log(textStatus);
            console.log(error);
        },
    })
})

//Agregar al carrito la Burguer Seleccionada
const tablaCarrito = document.querySelector(`#lista-carrito tbody`)

$('#menu').click(agregraBurguer);
$('#menu1').click(agregraBurguer);

function agregraBurguer(e){
 e.preventDefault();
 if (e.target.classList.contains('agregar-carrito')){
        const burguerSeleccionada = e.target.parentElement;
        const burguerAgregar = {
            nombre:burguerSeleccionada.querySelector('.titulo_menu').textContent,
            precio:burguerSeleccionada.querySelector('.precio-hamburguesa').textContent,
            cantidad: 1,
            id:burguerSeleccionada.querySelector('a').dataset.id,
        }
        const existe = carrito.some(hamburguesa => hamburguesa.id === burguerAgregar.id)
       
        if(existe) {
            const nuevoCarrito = carrito.map(hamburguesa => {
                if(hamburguesa.id === burguerAgregar.id){
                    hamburguesa.cantidad++;
            }  
            return hamburguesa
            });
            carrito = [ ...nuevoCarrito ];
        }else{
            carrito.push(burguerAgregar)
        }
    
        actualizarCarritoHTML();
        actualStorage();
        carritoTotal()
 }
}



function actualizarCarritoHTML(){
    tablaCarrito.innerHTML = '';    
    carrito.forEach(hamburguesa =>{
        const fila = document.createElement(`tr`);
        fila.innerHTML =`
         <td class="title">
               ${hamburguesa.nombre}
         </td>
         <td>
              ${hamburguesa.precio}
         </td>
         <td>
              ${hamburguesa.cantidad} 
         </td>
         <td>
            <a href="#" id="borrar" class="borrar-producto" data-id="${hamburguesa.id}"><i class="fas fa-trash"></i></a>
        </td>
    `
    tablaCarrito.appendChild(fila);
})
}

function actualStorage(){
    localStorage.setItem(`carrito`,JSON.stringify(carrito))
}



// Cargan en el DOM las Burguers
function listaDeHamburguesas (hamburguesasClasicas){
    hamburguesasClasicas.forEach( hamburguesa => {
        
    const html = `   
        <div class="combo col-xs-6 col-sm-6 col-md-3" id="talle container-fluid">
            <img src="${hamburguesa.imagen}"class="imagen-burguer img-fluid img-responsive" >
                <div class="jumbotron jumbotron_menu bg-transparent">
                    <h1 class="titulo_menu" >${hamburguesa.nombre}</h1>
                    <p class="contenido_menu">${hamburguesa.descripcion}</p>
                    <p class="titulo_precio">$ <span class="precio-hamburguesa">${hamburguesa.precio}</span></p>
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${hamburguesa.id}">Agregar al Carrito</a>
                </div>
        </div>`   

          menuBurguer.innerHTML += html;
        });    
}

function listaDeHamburguesas1 (hamburguesasGourmet){
    hamburguesasGourmet.forEach( hamburguesa => {
        
    const html = `   
        <div class="combo col-xs-6 col-sm-6 col-md-3" id="talle container-fluid">
            <img src="${hamburguesa.imagen}"class="imagen-burguer img-fluid img-responsive" >
                <div class="jumbotron jumbotron_menu bg-transparent">
                    <h1 class="titulo_menu">${hamburguesa.nombre}</h1>
                    <p class="contenido_menu">${hamburguesa.descripcion}</p>
                    <p class="titulo_precio">$ <span class="precio-hamburguesa">${hamburguesa.precio}</span></p>
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${hamburguesa.id}">Agregar al Carrito</a>
                </div>
        </div>`   

          menuBurguer1.innerHTML += html;
        });    
}

//Vaciar Carrito
$('#vaciar-carrito').click(vaciarCarrito);
function vaciarCarrito(e) {
    e.preventDefault();
   
    carrito = [];
    actualizarCarritoHTML(e);
    actualStorage(e)
    carritoTotal()
}

//Eliminar por Burguer
$(`#lista-carrito tbody`).click(EliminarBurguer)
function EliminarBurguer (e) {
    e.preventDefault()
    if (e.target.nodeName === "A" || e.target.nodeName === "I"  ) {
        const id = e.target.closest(`a`).dataset.id;
        const carritofiltrado = carrito.filter(producto => producto.id !== id)
        carrito = [...carritofiltrado];
        actualizarCarritoHTML();
        actualStorage();
        carritoTotal()
}
}

//Suma total en $
function carritoTotal() {
    total = 0;
    const itemTotal = document.querySelector(`#total`)
    carrito.forEach((item) => { 
        
        total = total + item.precio * item.cantidad
    })

    itemTotal.textContent = total.toFixed(2)
}   


//devuelve los productos guardados en LocalStorage cuando se actualiza la pagina
$(document).ready(leerLocalStorage)
 function leerLocalStorage(){
    carrito.forEach(hamburguesa => {
        const fila = document.createElement(`tr`);
        fila.innerHTML =`
         <td class="title">
               ${hamburguesa.nombre}
         </td>
         <td>
              ${hamburguesa.precio}
         </td>
         <td>
              ${hamburguesa.cantidad} 
         </td>
         <td>
            <a href="#" id="borrar" class="borrar-producto" data-id="${hamburguesa.id}"><i class="fas fa-trash"></i></a>
        </td>
    `;
    tablaCarrito.appendChild(fila);
    });
}





//Comprar
$(`#comprar`).click(realizarCompra)
function realizarCompra (e) {
    e.preventDefault();
    if(carrito.length === 0){
        Swal.fire({
            position: 'top-end',
            title: "<h4 style='color:black'>El Carrito esta Vacio</h4>",
            showConfirmButton: false,
            timer: 1500,
            background: '#fff',
            padding: 25, 
            width: 300,
            
          })
    }
    else {
        location.href = "compra.html";
    }
}

//Animacion
$("#menu").fadeOut(2000, ()=>{$("#menu").fadeIn(2000,()=>{$("#menu").animate ({ opacity: 0.7},1000 )}) })
$("#menu1").fadeOut(2000, ()=>{$("#menu1").fadeIn(2000,()=>{$("#menu1").animate ({ opacity: 0.7},1000)}) })

$(`.title__text`).animate ({ fontSize: "60px",opacity:0.7},4000)


