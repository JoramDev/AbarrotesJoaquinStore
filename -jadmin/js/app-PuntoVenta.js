const inputs = document.querySelectorAll('.input');

inputs.forEach(input => {

    if (input.value !== ''){
        input.parentNode.querySelector('.labelHolder').classList.add('focusTop');
        input.classList.add('focus');
    }


    input.onfocus = (e) => {
        e.target.parentNode.querySelector('.labelHolder').classList.add('focusTop');
        e.target.classList.add('focus');
    }
    input.onblur = (e) => {
        if (e.target.value.trim() !== '') return
        e.target.parentNode.querySelector('.labelHolder').classList.remove('focusTop');
        e.target.classList.remove('focus');
        e.target.value = '';
    }
     
});


const inputsLibres = document.querySelectorAll('.inputLibre');

inputsLibres.forEach(input => {


    input.onfocus = (e) => {
        e.target.parentNode.querySelector('.labelHolderLibre').classList.add('focus');
    }
    input.onblur = (e) => {
        e.target.parentNode.querySelector('.labelHolderLibre').classList.remove('focus');
    }
     
});



const d = document;

const inputBarcode = d.querySelector('#inputBarcode');


const totalVenta = d.getElementById('totalVenta');


const carritoList = d.querySelector('#carritoList');
const templateCarrito = d.querySelector('#templateCarrito');
const fragmentCarritoList = d.createDocumentFragment();



async function searchItemForBarcode(barcode) {
    
    let formdataBarcode = new FormData();
        formdataBarcode.append('barcode', barcode);

        const responseSearchBarcode = await fetch('back/searchBarcode.php', { method: 'POST', body: formdataBarcode});

        const respuestaDataSearchBarcode = await responseSearchBarcode.json();
        
        if (respuestaDataSearchBarcode !== null){

            addItemCarrito(respuestaDataSearchBarcode.id, respuestaDataSearchBarcode.producto, respuestaDataSearchBarcode.precio, respuestaDataSearchBarcode.nameImage, respuestaDataSearchBarcode.rol);
        
        }else{
            alert('El codigo de barras que ingresaste no corresponde a ningun producto registrado');
        }
}


function addItemCarrito(id, producto, precio, nameImage, rol){
    if (localStorage.getItem('carrito') === null) {
        var arregloCarrito = [];
            arregloCarrito.push({
                id: id,
                producto: producto,
                precio: Number(precio),
                cantidad: 1,    
                image: nameImage,
                rol: rol
            })

        localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

        mostrarCarrito();

    }else{

        arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

        let encontro = false;

        arregloCarrito.forEach(item => {
            if (item.id == id) {
                encontro = true;
                item.cantidad++; 
            }
        });

        if (!encontro) {
            arregloCarrito.push({
                id: id,
                producto: producto,
                precio: Number(precio),
                cantidad: 1,    
                image: nameImage,
                rol: rol
            })
        }

        localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

        mostrarCarrito();

    }

    d.querySelector('.containerTablaCarrito').scrollTop = '9999';

}


function plus(idItem) {

    arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

    arregloCarrito.find(item => {
        if (item.id === idItem) {
            item.cantidad++
        }
    })

    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

    mostrarCarrito();
}


function minus(idItem) {

    arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

    arregloCarrito.forEach(item => {
        if (item.id === idItem) {
            if (item.cantidad <= 1) return
            item.cantidad--
        }
    })

    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

    mostrarCarrito();
}


function deleteItemCarrito(idItem) {

    arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

    let nuevoArrayCarrito =  [];
    
    arregloCarrito.find(item => {
        if (item.id !== idItem) {
            nuevoArrayCarrito.push({
                id: item.id,
                producto: item.producto,
                precio: item.precio,
                cantidad: item.cantidad,    
                image: item.image,
                rol: item.rol
            })
        }
    });

    if (nuevoArrayCarrito.length <= 0) {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }else{
        localStorage.setItem('carrito', JSON.stringify(nuevoArrayCarrito));
        mostrarCarrito();
    }
    
}




function mostrarCarrito() {
    let total = 0;
    let numberItem = 0;

    if (localStorage.getItem('carrito') === null) {
        carritoList.innerHTML = '<div class="carritoEmpty"><i class="fa-solid fa-cart-plus"></i></div>';
    }else{

        arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

        carritoList.innerHTML = '';

        arregloCarrito.forEach(item => {

            ++numberItem

            const cloneTemplateCarrito = templateCarrito.content.cloneNode(true);
    
            cloneTemplateCarrito.querySelector('.number').textContent = numberItem;
            cloneTemplateCarrito.querySelector('.imgProduct img').setAttribute('src', `images_prod/${item.image}`);
            cloneTemplateCarrito.querySelector('.producto').textContent = item.producto;
            cloneTemplateCarrito.querySelector('.subtotal').textContent = `💲 ${Number(Number(item.precio) * Number(item.cantidad)).toFixed(2)}`;

            cloneTemplateCarrito.querySelector('.delete i').addEventListener('click', () => { deleteItemCarrito(item.id) })

            if (item.rol === 'granel' || item.rol === 'caja') {

                const buttonsCantidad = cloneTemplateCarrito.querySelectorAll('.cantidad button');

                buttonsCantidad.forEach(button => {
                    button.parentNode.removeChild(button);
                });

                cloneTemplateCarrito.querySelector('.liProductItem').addEventListener('click', (e) => { 
                    if (e.target.tagName === 'I') { return; }
                    modalShowCantidad(item.id, item.producto, `images_prod/${item.image}`, item.precio);
                });

                cloneTemplateCarrito.querySelector('.precio').textContent = `$ ${(item.precio).toFixed(2)} Kg ⚖️  |  $ ${(Number(item.precio) / 4).toFixed(2)} 1/4`;
                cloneTemplateCarrito.querySelector('.cantidad input').classList.add('cantInput');
                cloneTemplateCarrito.querySelector('.cantidad input').value = (item.cantidad).toFixed(3);
                cloneTemplateCarrito.querySelector('.cantidad input').disabled = false;


            } else if (item.rol === 'codigo' || item.rol === 'cerveza') {

                cloneTemplateCarrito.querySelector('.precio').textContent = `$ ${Number(item.precio).toFixed(2)} pza 🍶`;
                cloneTemplateCarrito.querySelector('.cantidad input').value = item.cantidad;
                cloneTemplateCarrito.querySelector('.cantidad .plus').addEventListener('click', () => { plus(item.id) });
                cloneTemplateCarrito.querySelector('.cantidad .minus').addEventListener('click', () => { minus(item.id) });

            }else if (item.rol === 'recargas') {
                
                const buttonsCantidad = cloneTemplateCarrito.querySelectorAll('.cantidad button');

                buttonsCantidad.forEach(button => {
                    button.parentNode.removeChild(button);
                });

                cloneTemplateCarrito.querySelector('.liProductItem').addEventListener('click', (e) => { 
                    if (e.target.tagName === 'I') { return; }
                    modalShowRecargas(item.id, item.producto, `images_prod/${item.image}`, item.precio);
                });

                cloneTemplateCarrito.querySelector('.precio').textContent = `$ ${(item.precio).toFixed(2)} 📱`;
                cloneTemplateCarrito.querySelector('.cantidad input').classList.add('cantInput');
                cloneTemplateCarrito.querySelector('.cantidad input').value = (item.cantidad).toFixed(2);
                cloneTemplateCarrito.querySelector('.cantidad input').disabled = false;

            }else if (item.rol === 'pagoservicio') {
                
                const buttonsCantidad = cloneTemplateCarrito.querySelectorAll('.cantidad button');

                buttonsCantidad.forEach(button => {
                    button.parentNode.removeChild(button);
                });

                cloneTemplateCarrito.querySelector('.liProductItem').addEventListener('click', (e) => { 
                    if (e.target.tagName === 'I') { return; }
                    modalShowPS(item.id, item.producto, `images_prod/${item.image}`, item.precio);
                });

                cloneTemplateCarrito.querySelector('.precio').textContent = `comision $ 10.00 incluida📱`;
                cloneTemplateCarrito.querySelector('.cantidad input').classList.add('cantInput');
                cloneTemplateCarrito.querySelector('.cantidad input').value = (item.cantidad).toFixed(2);
                cloneTemplateCarrito.querySelector('.cantidad input').disabled = false;

            }

            total += Number(item.precio) * Number(item.cantidad);

            fragmentCarritoList.appendChild(cloneTemplateCarrito);

        });

        carritoList.appendChild(fragmentCarritoList);
        
    }

    localStorage.setItem('carritoTotal', total);
    totalVenta.innerHTML = `<i class="fa-solid fa-sack-dollar"></i>  Total: $ ${Number(total).toFixed(2)}`;

    inputBarcode.focus();
}


/* ------------------ FUNCION PARA USAR BARCODE --------------- */

inputBarcode.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {
        
        if (e.target.value.trim() === '') return 
        
        let barcode = e.target.value.trim();

        searchItemForBarcode(barcode);

        e.target.value = '';
        
    }
})


window.addEventListener("DOMContentLoaded", mostrarCarrito);





const modalCantidad = d.getElementById('modalCantidad');

const inputGramos = d.getElementById('inputGramos');
const inputDinero = d.getElementById('inputDinero');

const valoresItem = d.querySelector('#valoresItem');

const buttonsCantidad = d.getElementById('buttonsCantidad');

const GuardarCantidad = d.querySelector('#GuardarCantidad');


function modalShowCantidad(idProducto, productoName, imagenProducto, precioProducto) {
    let idProduct = idProducto;
    let producto = productoName;
    let imagen = imagenProducto;
    let precio = Number(precioProducto);

    inputGramos.value = '';
    inputDinero.value = '';

    valoresItem.innerHTML = `${producto} <img src="${imagen}" alt="${producto}"> <span id="precioProducto" data-precioProducto="${precio}">💲${precio.toFixed(2)} Kg </span>`;
    GuardarCantidad.setAttribute('data-idProduct', idProduct);

    modalCantidad.classList.add('modal-show');
    
    inputDinero.focus();

}


function calcularDinero(e) {
    let gramos = Number(this.value);
    let precio = Number(d.querySelector('#precioProducto').getAttribute('data-precioProducto'));
    let calculoD = gramos * precio;

    inputDinero.value = (calculoD).toFixed(2);

    if (e.key === 'Enter') {
        GuardarCantidad.click();
    }
}


function calcularGramos(e) {
    let dinero = Number(this.value);
    let precio = Number(d.querySelector('#precioProducto').getAttribute('data-precioProducto'));
    let calculoG = dinero / precio;

    inputGramos.value = (calculoG).toFixed(3);

    if (e.key === 'Enter') {
        GuardarCantidad.click();
    }
}


function saveCantidad(e) {
    let idProducto = Number(this.dataset.idproduct);
    let cantidad = Number(inputGramos.value);

    if (cantidad <= 0 || cantidad === '') { alert('cantidad en 0, Favor de verificar'); return }

    arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

    arregloCarrito.find(item => {
        if (item.id === idProducto) {
            item.cantidad = cantidad;
        }
    });

    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

    closeModal(this.dataset.modal);
    mostrarCarrito();
}



buttonsCantidad.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') { return; }

    let cantButton = Number(e.target.dataset.cantidad);

    inputGramos.value = cantButton;

    GuardarCantidad.click();

})

inputDinero.addEventListener('keyup', calcularGramos);
inputGramos.addEventListener('keyup', calcularDinero);
GuardarCantidad.addEventListener('click', saveCantidad);



const modalCantidadRecargas = d.getElementById('modalCantidadRecargas');
const valoresItemRecarga = d.querySelector('#valoresItemRecarga');
const montosRecargas = d.querySelectorAll('.montoRecarga');
const GuardarCantidadRecarga = d.querySelector('#GuardarCantidadRecarga');

function modalShowRecargas(idProducto, productoName, imagenProducto, precioProducto){
    let idProduct = idProducto;
    let producto = productoName;
    let imagen = imagenProducto;
    let precio = Number(precioProducto);

    valoresItemRecarga.innerHTML = `${producto} <img src="${imagen}" alt="${producto}">`;
    GuardarCantidadRecarga.setAttribute('data-idProduct', idProduct);

    montosRecargas.forEach(inputMonto => {
        inputMonto.value = '';
    });


    modalCantidadRecargas.classList.add('modal-show');

    montosRecargas[0].focus();
}


function saveCantidadRecargas(e) {
    let idProducto = Number(this.dataset.idproduct);
    let recargaTotal = 0;

    montosRecargas.forEach(monto => {
        let cantidadMonto = Number(monto.value);
        if (cantidadMonto <= 0){ return }
        if (cantidadMonto < 50) { cantidadMonto++ }
        recargaTotal += cantidadMonto;
    });

    if (recargaTotal === 0) { alert('El monto de la recarga es de $ 0, Favor de verificar'); return }

    arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

    arregloCarrito.find(item => {
        if (item.id === idProducto) {
            item.cantidad = recargaTotal;
        }
    });

    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

    closeModal(this.dataset.modal);
    mostrarCarrito();
}


GuardarCantidadRecarga.addEventListener('click', saveCantidadRecargas);
montosRecargas.forEach(inputMontoR => {
        inputMontoR.addEventListener('keyup', (e)=>{ 
            if (e.key === 'Enter')  GuardarCantidadRecarga.click();  
        })
    });






    
    


const modalCantidadPS = d.querySelector('#modalCantidadPS');
const valoresItemPS = d.querySelector('#valoresItemPS');
const GuardarCantidadPS = d.querySelector('#GuardarCantidadPS');

const montosPs = d.querySelectorAll('.montoPS');


function modalShowPS(idProducto, productoName, imagenProducto, precioProducto){
    let idProduct = idProducto;
    let producto = productoName;
    let imagen = imagenProducto;
    let precio = Number(precioProducto);
    
    valoresItemPS.innerHTML = `${producto} <img src="${imagen}" alt="${producto}"> comision $10.00`;
    GuardarCantidadPS.setAttribute('data-idProduct', idProduct);
    
    montosPs.forEach(inputMonto => {
        inputMonto.value = '';
    });
    
    
    modalCantidadPS.classList.add('modal-show');
    
    montosPs[0].focus();
}



function saveCantidadPS(e) {
    let idProducto = Number(this.dataset.idproduct);
    let totalPS = 0;

    montosPs.forEach(monto => {
        let cantidadMonto = Number(monto.value);
        if (cantidadMonto <= 0){ return }
        cantidadMonto += 10;
        totalPS += cantidadMonto;
    });

    if (totalPS === 0) { alert('El monto del pago de servicio es de $ 0, Favor de verificar la cantidad ingresada'); return }

    arregloCarrito = JSON.parse(localStorage.getItem('carrito'));

    arregloCarrito.find(item => {
        if (item.id === idProducto) {
            item.cantidad = totalPS;
        }
    });

    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

    closeModal(this.dataset.modal);
    mostrarCarrito();
}


GuardarCantidadPS.addEventListener('click', saveCantidadPS);
montosPs.forEach(inputMontoPS => {
        inputMontoPS.addEventListener('keyup', (e)=>{ 
            if (e.key === 'Enter')  GuardarCantidadPS.click();  
        })
    });






const modalGradiant = d.querySelectorAll('.modalGradiant');
const btnCloseModal = d.querySelectorAll('.btnCloseModal');
const btnCancelar = d.querySelectorAll('.btnCancelar');

btnCancelar.forEach(btnCancelar => {
    btnCancelar.addEventListener('click', (e) => { closeModal(e.target.getAttribute('data-modal')) });
});

btnCloseModal.forEach(btnCloseModal => {
    btnCloseModal.addEventListener('click', (e) => { closeModal(e.target.getAttribute('data-modal')) });
});

modalGradiant.forEach(modalGradiant => {
    modalGradiant.addEventListener('click', (e) => {
        if (e.target.className === 'modalGradiant modal-show') {
            closeModal(e.target.getAttribute('data-modal')); 
        }
    });
});





function closeModal(modalNumber) {
    inputBarcode.focus();
    switch (modalNumber) {
        case '1':
            modalCantidad.classList.remove('modal-show');
            break;
        case '2':
            modalCantidadRecargas.classList.remove('modal-show');
            break;
        case '3':
            modalCantidadPS.classList.remove('modal-show');
            break;
    
        default:
            break;
    }
}





/* AUTOCOMPLETE BUSCADOR */

const inputSearch = d.getElementById('inputSearch');

const containerAutocomplete = d.getElementById('containerAutocomplete');

const fragmentLiAutocomplete = d.createDocumentFragment();

const templateAutocomplete = d.getElementById('templateAutocomplete');

inputSearch.addEventListener('input', autocomplete);
inputSearch.addEventListener('focus', autocomplete);

inputSearch.addEventListener('blur', function () {
    setTimeout(() => {
        closeAutocomplete();
    }, 500);
});

let itemFocus = -1;

function closeAutocomplete() {
    const lis_AC =  containerAutocomplete.querySelectorAll('li');

    lis_AC.forEach(li => {
        li.parentNode.removeChild(li);
    });

    itemFocus = -1;
}


 async function autocomplete(){

    closeAutocomplete();

    itemFocus = -1;

    if (inputSearch.value.trim() == '') return;

    let busqueda = inputSearch.value.trim(); 

    const formdataBusqueda = new FormData();
    formdataBusqueda.append('search', busqueda);

    const responseDataAutocomplete = await fetch('back/autocomplete.php', {method: 'POST', body: formdataBusqueda});
    const respuestaAutocomplete = await responseDataAutocomplete.json();

    if (responseDataAutocomplete.status !== 200) return;

    console.log(respuestaAutocomplete);

    respuestaAutocomplete.forEach(item => {
        
        const cloneTemplateAC = templateAutocomplete.content.cloneNode(true);

        cloneTemplateAC.querySelector('.itemLiAutocomplete').dataset.code = item.id;

        cloneTemplateAC.querySelector('.containerImgAC img').setAttribute('src', `images_prod/${item.nameImage}`);
        cloneTemplateAC.querySelector('.containerDescriptionAC .descriptionProd').textContent = item.producto;
        cloneTemplateAC.querySelector('.containerDescriptionAC .precioAC b').textContent = `💲${item.precio}`;

        cloneTemplateAC.querySelector('.itemLiAutocomplete').addEventListener('click', async() => {

            let barcode = item.codigobarras;
            await searchItemForBarcode(barcode);
            inputSearch.value = '';
            closeAutocomplete();

        });

        fragmentLiAutocomplete.appendChild(cloneTemplateAC);

    });

    containerAutocomplete.appendChild(fragmentLiAutocomplete);

}



inputSearch.addEventListener('keyup', function(e){

    e.preventDefault();

    let list_li_AC = [];

    if (containerAutocomplete.querySelectorAll(".itemLiAutocomplete").length < 1){
        return;
    } else { 
        list_li_AC = containerAutocomplete.querySelectorAll(".itemLiAutocomplete");
    }

    if (e.key === 'ArrowDown') {
        if (itemFocus < (list_li_AC.length - 1)){
            if (itemFocus > -1) list_li_AC[itemFocus].classList.remove('activeItem');
            itemFocus++
            list_li_AC[itemFocus].classList.add('activeItem');
        }
    }
    if (e.key === 'ArrowUp') {
        if (itemFocus > 0) {
            list_li_AC[itemFocus].classList.remove('activeItem');
            itemFocus--
            list_li_AC[itemFocus].classList.add('activeItem');
        }
    }
    if (e.key === 'Enter') {
        if (itemFocus !== -1) {
            list_li_AC[itemFocus].click();
        }
    }

})


