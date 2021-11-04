const listaCompra = document.querySelector(`#lista-compra tbody`);
let carrito;
$().ready(function () {
    const carStorage = JSON.parse(localStorage.getItem(`carrito`));

    carrito = carStorage || [];
    carritoTotal()
})

function actualizarCompraHTML(){
    listaCompra.innerHTML = '';    
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
              ${hamburguesa.cantidad * hamburguesa.precio}
         </td>
         <td>
            <a href="#" id="borrar" class="borrar-producto" data-id="${hamburguesa.id}"><i class="fas fa-trash"></i></a>
        </td>
    `
    listaCompra.appendChild(fila);
})
}

$(document).ready(leerLocalStorageCompra)
 function leerLocalStorageCompra(){
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
              ${hamburguesa.cantidad * hamburguesa.precio}
         </td>
         <td>
            <a href="#" id="borrar" class="borrar-producto" data-id="${hamburguesa.id}"><i class="fas fa-trash"></i></a>
        </td>
    `;
    listaCompra.appendChild(fila);
    });
}

function actualStorageCompra(){
    localStorage.setItem(`carrito`,JSON.stringify(carrito))
}

//Eliminar Burguer
listaCompra.addEventListener(`click`, EliminarBurguer)
function EliminarBurguer(e){
    e.preventDefault()
    if(e.target.nodeName === "I"){
       const id = e.target.closest(`a`).getAttribute(`data-id`) 
       const carritocompra = carrito.filter(producto => producto.id !== id)
       console.log(carritocompra)
       carrito = [...carritocompra]
       actualizarCompraHTML()
       actualStorageCompra()
       carritoTotal()
    }
}

//Suma
function carritoTotal() {
    total = 0;
    const itemTotal = document.querySelector(`#total`)
    
    carrito.forEach((item) => { 
        
        total = total + item.precio * item.cantidad
    })

    itemTotal.textContent = total.toFixed(2)
   
    actualStorageCompra()
}   

//btn procesar compra
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const direccion = document.getElementById('direccion');

const procesarCompra = document.getElementById(`procesar-compra`)
procesarCompra.addEventListener(`click`, comprar)
function comprar(e){
    e.preventDefault();
    if(carrito.length === 0){
        Swal.fire({
            position: 'top-end',
            title: "<h4 class='pop' style='color:white'>No existen Burguer</h4>",
            showConfirmButton: false,
            timer: 1500,
            background: '#fff',
            padding: 25, 
            width: 300,
            
          }).then(function (){
              window.location = "index.html"
          })
        } else if (cliente.value === '' || correo.value === '' || telefono.value ===  '' || direccion.value ===   '') {
            Swal.fire({
                type: 'Error',
                title: "<h4 style='color:white'>Ingrese todos los campos requeridos</h4>",
                showConfirmButton: false,
                timer: 2000,
                background: '#fff',
            })
        } else {
            const gif = document.querySelector(`#gif`)
            gif.style.display = `block`;

            const ok = document.createElement(`img`);
            ok.src = `ima/gifburguer.gif`;
            ok.style.display = `block`;
            ok.width = `200`

            setTimeout(() => {
                gif.style.display = `none`;
                document.querySelector(`#loaders`).appendChild(ok)
            }, 9000);
        }
    
}

//Animacion
$(`.title__text`).animate ({ fontSize: "60px",opacity:0.7},2000)
