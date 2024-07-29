/* const d = document;

const formularioSearch = d.getElementById('formularioSearch');
formularioSearch.addEventListener('submit', function(ev) {
    ev.preventDefault();
})


const list = d.getElementById("list");

const fragmentLi = d.createDocumentFragment();

const inputSearch = d.getElementById('containerAutocomplete__inputSearch');

let itemFocus = -1;


function closeAutocomplete() {
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        item.parentNode.removeChild(item);
    });

    itemFocus = -1;
}

function mostrarProducto (id, producto){
    inputSearch.value = '';
    console.log(`presionaste el id: ${id} asociado al producto: ${producto}`);
};


inputSearch.addEventListener('blur', closeAutocomplete);

inputSearch.addEventListener('input', async function (e) {

    list.innerHTML = '';
    
    itemFocus = -1;

    if (e.target.value.trim() == '')  return; 
    
    const formDataSearch = new FormData();
    formDataSearch.append('search', e.target.value.trim());

    const responseData = await fetch('searchAutocomplete.php', {method: 'POST', body: formDataSearch});
    const resuestaDataJson = await responseData.json();

    
    if (resuestaDataJson.result.length <= 0) return;


    if (!resuestaDataJson.error) {
        resuestaDataJson.result.forEach(item => {
            const li = d.createElement('li');
            const button = d.createElement('button');
            button.textContent = item.producto;
            button.addEventListener('click', function(event){
                event.preventDefault();
                closeAutocomplete();
                mostrarProducto(item.id, item.producto);
               });
            li.appendChild(button);
            fragmentLi.appendChild(li);
        });    
        list.appendChild(fragmentLi);
    }else{
        alert('ups no sabemos que paso, intentalo mastarde');
    }

})

inputSearch.addEventListener('keydown', function (e){

    if (list.querySelectorAll('#list li').length <= 0) return;

    let li_buttons = list.querySelectorAll('li button');

     
     if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (itemFocus < (li_buttons.length -1)) {
            if (itemFocus > -1) li_buttons[itemFocus].classList.remove('activeButton');
            ++itemFocus
            li_buttons[itemFocus].classList.add('activeButton');
        }
     }else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (itemFocus > 0) {
            li_buttons[itemFocus].classList.remove('activeButton');
            --itemFocus
            li_buttons[itemFocus].classList.add('activeButton');
        }
     } else if (e.key === 'Enter') {
        e.preventDefault();
        if (itemFocus !== -1) {
            li_buttons[itemFocus].click();
        }
     }
}) */












const d = document;

const formularioSearch = d.getElementById('formularioSearch');
formularioSearch.addEventListener('submit', function(ev) {
    ev.preventDefault();
})


const list = d.getElementById("list");

const fragmentLi = d.createDocumentFragment();

const inputSearch = d.getElementById('containerAutocomplete__inputSearch');

let itemFocus = -1;


function closeAutocomplete() {
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        item.parentNode.removeChild(item);
    });

    itemFocus = -1;
}

function mostrarProducto (id, producto){
    inputSearch.value = '';
    console.log(`presionaste el id: ${id} asociado al producto: ${producto}`);
};

const autocomplete = async(search) => {

    closeAutocomplete();
    
    itemFocus = -1;

    if (search == '')  return; 
    
    const formDataSearch = new FormData();
    formDataSearch.append('search', search);

    const responseData = await fetch('searchAutocomplete.php', {method: 'POST', body: formDataSearch});
    const resuestaDataJson = await responseData.json();

    
    if (resuestaDataJson.result.length <= 0) return;


    if (!resuestaDataJson.error) {
        resuestaDataJson.result.forEach(item => {
            const li = d.createElement('li');
            const button = d.createElement('button');
            button.textContent = item.producto;
            button.addEventListener('click', function(event){
                mostrarProducto(item.id, item.producto);
                closeAutocomplete();
               });
            li.appendChild(button);
            fragmentLi.appendChild(li); 
        });    
        list.appendChild(fragmentLi);
    }else{
        alert('ups no sabemos que paso, intentalo mastarde');
    }

}


inputSearch.addEventListener('click', function (e){
    autocomplete(e.target.value.trim());
})

inputSearch.addEventListener('input', function (e){
    autocomplete(e.target.value.trim());
})

inputSearch.addEventListener('keydown', function (e){

    if (list.querySelectorAll('#list li').length <= 0) return;

    let li_buttons = list.querySelectorAll('li button');

     
     if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (itemFocus < (li_buttons.length -1)) {
            if (itemFocus > -1) li_buttons[itemFocus].classList.remove('activeButton');
            ++itemFocus
            li_buttons[itemFocus].classList.add('activeButton');
        }
     }else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (itemFocus > 0) {
            li_buttons[itemFocus].classList.remove('activeButton');
            --itemFocus
            li_buttons[itemFocus].classList.add('activeButton');
        }
     } else if (e.key === 'Enter') {
        e.preventDefault();
        if (itemFocus !== -1) {
            li_buttons[itemFocus].click();
        }
     }
})


inputSearch.addEventListener('blur', function () {
    setTimeout(() => {
        closeAutocomplete();
    }, 200);
}); 