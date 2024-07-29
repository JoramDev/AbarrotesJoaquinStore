const d = document;

/* loader */

function loader_show() {
    document.getElementById('loader').classList.add('active_loader');
}

function loader_close() {
    document.getElementById('loader').classList.remove('active_loader');
}


function mostrar_notificacion({tipo_n, titulo, mensaje}) {

    const notificationSucces = d.querySelector('.notificationSucces');
    const notificationError = d.querySelector('.notificationError');
    const notificationWarning = d.querySelector('.notificationWarning');



    let title = titulo;
    let tipo = tipo_n;
    let msg = mensaje;


    if (tipo == 1) {
        notificationSucces.querySelector('.notification__msg h3').innerHTML = title;
        notificationSucces.querySelector('.notification__msg p').innerHTML = msg;

        notificationSucces.querySelector('.notification__logo').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        notificationSucces.classList.add('succes');
        
        setTimeout(() => {
            notificationSucces.classList.remove('succes');
        }, 3000);
    }

    if (tipo == 2) {
        notificationError.querySelector('.notification__msg h3').innerHTML = title;
        notificationError.querySelector('.notification__msg p').innerHTML = msg;

        notificationError.querySelector('.notification__logo').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        notificationError.classList.add('error');
        
        setTimeout(() => {
            notificationError.classList.remove('error');
        }, 3000);
    }

    if (tipo == 3) {
        notificationWarning.querySelector('.notification__msg h3').innerHTML = title;
        notificationWarning.querySelector('.notification__msg p').innerHTML = msg;

        notificationWarning.querySelector('.notification__logo').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        notificationWarning.classList.add('warning');
        
        setTimeout(() => {
            notificationWarning.classList.remove('warning');
        }, 3000);
    }




}
/* ---- */


const tableBody = d.getElementById('tableBody');

const templateRow = d.getElementById('templateRow');
const fragmentRow = d.createDocumentFragment();

const mostrar = d.getElementById('mostrando');

const paginador = d.getElementById('paginador');

const templatePaginacion = d.getElementById('templatePaginacion');
const fragmentPaginacion = d.createDocumentFragment();

let paginaActual = 1;




/* --------- EDITAR PROVEEDOR ----------- */

const modalEditProveedor = d.querySelector('#modalEditProveedor');

const formEditProveedor = d.getElementById('formEditProveedor');

formEditProveedor.addEventListener('submit', (e) => { e.preventDefault() });


async function getDataProveedor(idProveedor) {
    
    const formDataIdProveedor = new FormData();
    formDataIdProveedor.append('idProveedor', idProveedor);

    const responseDataProveedor = await fetch('back/getInfoProveedor.php',{
        method: 'POST',
        body: formDataIdProveedor
    })

    const responseDataProvJson = await responseDataProveedor.json();
    
    if (!responseDataProvJson.error) {
        
        formEditProveedor.querySelectorAll('input').forEach((input) => {

            if (input.name === 'nombreProveedor') {
                input.focus();
                input.value = responseDataProvJson['array_data_proveedor'].proveedor;
            }

            if (input.name === 'diaVisita[]') {
                
                if (input.checked) input.click(); 
                
                responseDataProvJson['array_data_proveedor']['d_visita'].forEach((diaVisita)=>{
                    if (input.value.toLowerCase() == diaVisita.toLowerCase()) {
                        input.click();
                    }
                })

            }

            if (input.name === 'TVenta') {
               
                if (input.value.toLowerCase() == (responseDataProvJson['array_data_proveedor']['tipo_venta']).toLowerCase()) {
                    if (!input.checked) input.click();
                }

            }

        });

    }


}

const editarProveedor = d.getElementById('btnEditarProveedor');


const saveEditProv = async(e) => {

    let idProveedor = Number(e.target.dataset.idproveedor);

    const camposEdit = {
        nameProveedor: false,
        DVisita: false,
        Tdventa: false
    }

    const  inputsFormEditProveedor = formEditProveedor.querySelectorAll('input');

    inputsFormEditProveedor.forEach(input => {
        switch (input.type) {
            case 'text':
                if (input.value.trim() !== '') camposEdit['nameProveedor'] = true;
                break;

            case 'checkbox':
                if (input.checked) camposEdit['DVisita'] = true;
                break;

            case 'radio':
                if (input.checked) camposEdit['Tdventa'] = true;
                break;
        
            default:
                break;
        }
    })

    if (camposEdit.nameProveedor && camposEdit.DVisita && camposEdit.Tdventa) {
            
        const formDataUpdateProveedor = new FormData(formEditProveedor);
        formDataUpdateProveedor.append('proveedor_id', idProveedor);
            
        const responseEditProv = await fetch('back/update_proveedor.php', {
            method: 'POST',
            body: formDataUpdateProveedor
        });
            
        const responseDataJsonUpdateProv = await responseEditProv.json();

        if (!responseDataJsonUpdateProv.error) {
            
            mostrar_notificacion({tipo_n: 1, titulo: 'Actualizacion exitosa', mensaje: 'proveedor actualizado exitosamente'});

            closeModal(e.target.dataset.modal);
            mostrarTablaProveedores(paginaActual);
        }else{
            mostrar_notificacion({tipo_n: 2, titulo: 'Error', mensaje: 'Ocurrio un error al actualizar el proveedor'});
        }

    }else{
        mostrar_notificacion({tipo_n: 3, titulo: 'Campo vacio', mensaje: 'completar todos los campos'});
    }

    
}

editarProveedor.addEventListener('click', saveEditProv);



async function modalShowEditProveedor(id_prove) {

    loader_show();

    let id_proveedor = Number(id_prove);
  
    editarProveedor.setAttribute('data-idProveedor', id_proveedor);

    await getDataProveedor(id_proveedor);

    loader_close();

    modalEditProveedor.classList.add('modal-show');
    
}

/* ------------------------------------------------ */


/* FUNCION CONFIRMACION ELIMINAR PROVEEDOR */

async function confirmar_eliminacion_proveedor(idProveedor, nombreProveedor){

    let idproveedor = Number(idProveedor);
    let nombreproveedor = nombreProveedor;
    let resConfirm = confirm("Desea eliminar el proveedor: " + nombreproveedor);

    if (!resConfirm) return;

    const formIdDeleteProveedor = new FormData();
    formIdDeleteProveedor.append("id_proveedor", idproveedor);

    const responseFetchDeleteProveedor = await fetch('back/delete_proveedor.php', {
        method: 'POST',
        body: formIdDeleteProveedor 
    });

    const responseDataJsonDeleteProveedor = await responseFetchDeleteProveedor.json();

    if (!responseDataJsonDeleteProveedor.error) {
        mostrar_notificacion({tipo_n: 1, titulo: 'Eliminacion exitosa', mensaje: 'proveedor eliminado correctamente'});
        mostrarTablaProveedores(paginaActual);
    }else{
        mostrar_notificacion({tipo_n: 2, titulo: 'Error', mensaje: 'Ocurrio un error al intentar eliminar el proveedor'});
    }

}




















const mostrarTablaProveedores = async(pagina) => {

    loader_show();

    const inputSearch = d.getElementById('inputSearch');
    const numRegistros = d.getElementById('numRegistros').value;

    const formDataProv = new FormData();
    formDataProv.append("busquedaProveedor", inputSearch.value);
    formDataProv.append("pagina", pagina);
    formDataProv.append("registros", numRegistros);

    const responseTableProv = await fetch("back/get_proveedores.php", { method: 'POST', body: formDataProv });
    
    if (responseTableProv.status === 200) {
        
        const resultTableProv = await responseTableProv.json();

        tableBody.innerHTML = "";
        mostrar.innerText = "";
        paginador.innerHTML = "";

        if (resultTableProv['datos'].length > 0) {

            resultTableProv['datos'].forEach((proveedor, index) => {
                
                const cloneTemplateRow = templateRow.content.cloneNode(true);
    
                cloneTemplateRow.querySelectorAll('td')[0].textContent = proveedor.proveedor;
                cloneTemplateRow.querySelectorAll('td')[1].textContent = proveedor.d_visita;
                cloneTemplateRow.querySelectorAll('td')[2].textContent = proveedor.tipo_venta;
                cloneTemplateRow.querySelectorAll('td')[3].textContent = proveedor.fecha_registro;
                cloneTemplateRow.querySelector("td .editar").addEventListener('click', function () {
                    modalShowEditProveedor(proveedor.id);
                });
                cloneTemplateRow.querySelector("td .eliminar").addEventListener('click', function () {
                    confirmar_eliminacion_proveedor(proveedor.id, proveedor.proveedor);
                });
    
                fragmentRow.appendChild(cloneTemplateRow);
                
            });
            
            tableBody.appendChild(fragmentRow);



            /* ------------- FUNCION IR A LA PRIMERA PAGINA---------- */

            const cloneInicio = templatePaginacion.content.cloneNode(true); 
            cloneInicio.querySelector('a li').textContent = "|<";
            cloneInicio.querySelector('a li').addEventListener('click', function () {
                mostrarTablaProveedores(resultTableProv['pagInicio']);
            });
            cloneInicio.querySelector('a li').classList.add('arrow');
            fragmentPaginacion.appendChild(cloneInicio);

            /* ------------- FUNCION IR A LA PAGINA ANTERIOR ----------- */
            
            const cloneAnterior = templatePaginacion.content.cloneNode(true); 
            cloneAnterior.querySelector('a li').innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i>`;
            if ((resultTableProv['pagina'] - 1) >= 1) {
                cloneAnterior.querySelector('a li').addEventListener('click', function () {
                    mostrarTablaProveedores(resultTableProv['pagina'] - 1);
                });
            }
            cloneAnterior.querySelector('a li').classList.add('ant');
            fragmentPaginacion.appendChild(cloneAnterior);

            /* --------------- FUNCION MOSTRAR PAGINACION ------------- */
            
            function mostrarPaginas(paginacion, index){
                
                const cloneTemplatePaginacion = templatePaginacion.content.cloneNode(true);

                if (paginacion == resultTableProv['pagina']) {
                    cloneTemplatePaginacion.querySelector('a li').textContent = paginacion;
                    cloneTemplatePaginacion.querySelector('a li').classList.add('pagActive');
                }else{
                    cloneTemplatePaginacion.querySelector('a li').textContent = paginacion;
                    cloneTemplatePaginacion.querySelector('a li').addEventListener('click', function(){
                        mostrarTablaProveedores(paginacion);
                    })
                }

                fragmentPaginacion.appendChild(cloneTemplatePaginacion);

            }
            
            resultTableProv['paginacion'].forEach(mostrarPaginas);

            /* ------------- FUNCION IR A LA PAGINA SIGUIENTE ----------- */

            const cloneSig = templatePaginacion.content.cloneNode(true); 
            cloneSig.querySelector('a li').innerHTML = `<i class="fa-solid fa-circle-arrow-right"></i>`;
            if ((Number(resultTableProv['pagina']) + 1) <= Number(resultTableProv['pagFin'])) {
                cloneSig.querySelector('a li').addEventListener('click', function () {
                    mostrarTablaProveedores(Number(resultTableProv['pagina']) + 1);
                });
            }
            cloneSig.querySelector('a li').classList.add('sig');
            fragmentPaginacion.appendChild(cloneSig);

            /* ------------- FUNCION IR A LA ULTIMA PAGINA---------- */

            const cloneFin = templatePaginacion.content.cloneNode(true); 
            cloneFin.querySelector('a li').textContent = ">|";
            cloneFin.querySelector('a li').addEventListener('click', function () {
                mostrarTablaProveedores(resultTableProv['pagFin']);
            })
            cloneFin.querySelector('a li').classList.add('arrow');
            fragmentPaginacion.appendChild(cloneFin);
            



            paginador.appendChild(fragmentPaginacion);
            
        }else{
            /* MOSTRAR MENSAJE AL USUARIO DE 'PROVEEDOR NO ENCONTRADO' */

            const cloneTRow = templateRow.content.cloneNode(true);

          cloneTRow.querySelector('.rowProveedor').innerHTML = '<td colspan="5">No se encontraron proveedores !</td>';
          fragmentRow.appendChild(cloneTRow);

          tableBody.appendChild(fragmentRow);
        
        }

        mostrar.innerHTML = `<strong> Mostrando ${resultTableProv.totalFiltros} de ${resultTableProv.totalRegistros} </strong>`;

    }

    inputSearch.focus();
    loader_close();
    
}

window.addEventListener('DOMContentLoaded', function () {
    mostrarTablaProveedores(paginaActual);       
});

inputSearch.addEventListener('keyup', function () {
    mostrarTablaProveedores(paginaActual);
});

numRegistros.addEventListener('change', function () {
    mostrarTablaProveedores(paginaActual);
});





/* ------- AGREGAR NUEVO PROVEEDOR -------- */

const formNewProveedor = d.getElementById('formNewProveedor');

formNewProveedor.addEventListener('submit', (e) => { e.preventDefault() });

const inputProveedor = formNewProveedor.querySelector('#inputProveedor');

const btnAddProveedor = document.querySelector('#btnAddProveedor');
const modalAddProveedor = document.querySelector('#modalAddProveedor');

btnAddProveedor.addEventListener('click', function (){
    formNewProveedor.querySelectorAll('input').forEach(input => {
        switch (input.name) {
            case 'nombreProveedor':
                    input.value = "";
                break;
            
            case 'diaVisita[]':
                    if (input.checked) input.click();
                break;
            
            case 'TVenta':
                    if (input.value == 'pedido') input.click();
                break;
        
            default:
                break;
        }
    });

    modalAddProveedor.classList.add('modal-show');

    inputProveedor.focus();

})



const GuardarNuevoProveedor = d.getElementById('GuardarNuevoProveedor');


async function saveNewProveedor(ev) {

    const campos = {
        nameProveedor: false,
        DVisita: false,
        Tdventa: false
    }

/*     const inputProveedor = formNewProveedor.querySelector('#inputProveedor');
    
    if (inputProveedor.value.trim() !== '') campos['nameProveedor'] = true;

    let checkedsDV = 0;
    const diaVisitaInput = formNewProveedor.querySelectorAll('.diaVisita');
    diaVisitaInput.forEach((diaV) => {
        if (diaV.checked) checkedsDV++
    })

    if (checkedsDV > 0) campos['DVisita'] = true;

    const tipoVentaInput = formNewProveedor.querySelectorAll('input[name = TVenta]');

    tipoVentaInput.forEach((inputRadio) => {
        if (inputRadio.checked) campos['Tdventa'] = true;
    })
 */

    const inputsFormAddProveedor = formNewProveedor.querySelectorAll('input');

    inputsFormAddProveedor.forEach(input => {
        switch (input.type) {
            case 'text':
                if (input.value.trim() !== '') campos['nameProveedor'] = true;
                break;

            case 'checkbox':
                if (input.checked) campos['DVisita'] = true;
                break;

            case 'radio':
                if (input.checked) campos['Tdventa'] = true;
                break;
        
            default:
                break;
        }
    })
    

    if (campos.nameProveedor && campos.DVisita && campos.Tdventa) {

        const formDataSaveProveedor = new FormData(formNewProveedor);

        const responseAddP = await fetch('back/addProveedor.php', { method: 'POST', body: formDataSaveProveedor});

        const respuestaAddProveedor = await responseAddP.json();

        if (!respuestaAddProveedor.error) {

            mostrar_notificacion({tipo_n: 1, titulo: 'Registro exitoso', mensaje: 'proveedor registrado exitosamente'});

            closeModal(ev.target.dataset.modal);
            mostrarTablaProveedores(paginaActual);
        }else{
            mostrar_notificacion({tipo_n: 2, titulo: 'Error', mensaje: 'Ocurrio un error al registrar el proveedor'});
        }

    }else{
        mostrar_notificacion({tipo_n: 3, titulo: 'Campo vacio', mensaje: 'completar todos los campos'});
    }

}

GuardarNuevoProveedor.addEventListener('click', saveNewProveedor);







/* --------- CERRAR MODALS ------- */

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
    inputSearch.focus();
    switch (modalNumber) {
        case '4':
            modalAddProveedor.classList.remove('modal-show');
            break;

        case '5':
            modalEditProveedor.classList.remove('modal-show');
            break;
    
        default:
            break;
    }
}