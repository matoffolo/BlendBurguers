const listaCompra = document.querySelector(`#lista-compra tbody`);
let carrito;
$().ready(function () {
    const carStorage = JSON.parse(localStorage.getItem(`carrito`));

    carrito = carStorage || [];

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
function carritoTotal() {
    total = 0;
    const itemTotal = document.querySelector(`#total`)
    
    carrito.forEach((item) => { 
        
        total = total + item.precio * item.cantidad
    })

    itemTotal.textContent = total.toFixed(2)
   
    actualStorageCompra()
}   



$(`.title__text`).animate ({ fontSize: "60px",opacity:0.7},2000)
