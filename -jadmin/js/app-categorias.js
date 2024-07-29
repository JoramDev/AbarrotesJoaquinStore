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

var paginaActual = 1;


const getCategorias = async(pagina) => {

    const inputSearch = d.getElementById('inputSearch');
    const numberRegistros = d.getElementById('numRegistros');

    const formDataCategorias = new FormData();
    formDataCategorias.append('search', inputSearch.value.trim());
    formDataCategorias.append('registros', numberRegistros.value.trim());
    formDataCategorias.append('pagina', pagina);

    const responseTableCate = await fetch("back/get_categorias.php", { method: 'POST', body: formDataCategorias });

    if (responseTableCate.status === 200) {
        
        const resultTableCategorias = await responseTableCate.json();

       const reultPromise = new Promise((resolve, reject) => {
            if (resolve) {
                return resultTableCategorias;
            } else {
                return false;
            }
       })

       return reultPromise;
    }


}

const resultCategorias = await getCategorias();