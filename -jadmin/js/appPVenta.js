const d = document;

const inputBarcode = d.querySelector('#inputBarcode');


const totalVenta = d.getElementById('totalVenta');


const carritoList = d.querySelector('#carritoList');
const templateCarrito = d.querySelector('#templateCarrito');
const fragmentCarritoList = d.createDocumentFragment();

const fragmentInputGranel = d.createDocumentFragment();


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


function modalShowGranel(idItem, productoItem) {
    alert(`El producto a granel que se modificara es: ${productoItem} que corresponde al id: ${idItem}`);
}



function mostrarCarrito() {
    let total = 0;
    let numberItem = 0;

    if (localStorage.getItem('carrito') === null) {
        carritoList.innerHTML = '';
        console.log('El carrito esta vacio, comienza a agregar productos :)');
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

                cloneTemplateCarrito.querySelector('.precio').textContent = `$ ${(item.precio).toFixed(2)} Kg ⚖️  |  $ ${(Number(item.precio) / 4).toFixed(2)} 1/4`;
                cloneTemplateCarrito.querySelector('.cantidad input').classList.add('cantInput');
                cloneTemplateCarrito.querySelector('.cantidad input').value = (item.cantidad).toFixed(3);
                cloneTemplateCarrito.querySelector('.cantidad input').addEventListener('click', () => { modalShowGranel(item.id, item.producto) });
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

                cloneTemplateCarrito.querySelector('.precio').textContent = `$ ${(item.precio).toFixed(2)} 📱`;
                cloneTemplateCarrito.querySelector('.cantidad input').classList.add('cantInput');
                cloneTemplateCarrito.querySelector('.cantidad input').value = (item.cantidad).toFixed(2);
                cloneTemplateCarrito.querySelector('.cantidad input').addEventListener('click', () => { modalShowGranel(item.id, item.producto) });
                cloneTemplateCarrito.querySelector('.cantidad input').disabled = false;

            }else if (item.rol === 'pagoservicio') {
                
                const buttonsCantidad = cloneTemplateCarrito.querySelectorAll('.cantidad button');

                buttonsCantidad.forEach(button => {
                    button.parentNode.removeChild(button);
                });

                cloneTemplateCarrito.querySelector('.precio').textContent = `comision $ 10 incluida📱`;
                cloneTemplateCarrito.querySelector('.cantidad input').classList.add('cantInput');
                cloneTemplateCarrito.querySelector('.cantidad input').value = (item.cantidad).toFixed(2);
                cloneTemplateCarrito.querySelector('.cantidad input').addEventListener('click', () => { modalShowGranel(item.id, item.producto) });
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
