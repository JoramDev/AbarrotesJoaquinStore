
function loader_show() {
    document.getElementById('loader').classList.add('active_loader');
}

function loader_close() {
    document.getElementById('loader').classList.remove('active_loader');
}

const form_login = document.getElementById("form_login");
const inputs = document.querySelectorAll("#form_login input");

const campos = {
    usuario: false,
    contra: false
}

const txt_user = document.querySelector("#usuario")
txt_user.focus();
const txt_pass = document.querySelector('#pass');

const user_empty = document.getElementById('user_empty');
const pass_empty = document.getElementById('pass_empty');
const input_error_pass = document.getElementById('input_error_pass');

/* --------------- FUNCION VALIDAR INFORMACION LOGEO --------------- */

async function validar(){
    
    inputs.forEach(input => {
        switch (input.name) {
            case 'pass':
                    if (txt_pass.value.trim() !== '') {
                        pass_empty.classList.remove('active');
                        campos['contra'] = true;
                    }else{
                        pass_empty.classList.add('active');
                        txt_pass.focus();
                        campos['contra'] = false;
                    }
                break;
            case 'user':
                    if (txt_user.value.trim() !== '') {
                        user_empty.classList.remove('active');
                        campos['usuario'] = true;
                    }else{
                        user_empty.classList.add('active');
                        txt_user.focus();
                        campos['usuario'] = false;
                    }
                break;
        }
    });

}


form_login.addEventListener('submit', async(e) => {
    e.preventDefault();

        await validar();

        if (campos.usuario && campos.contra) {

            loader_show();

            // LIMPIA LAS ALERTAS
            document.getElementById('alert').classList.remove('activealert');   

            let formdata_log = new FormData();
            formdata_log.append("usuario", txt_user.value.trim());
            formdata_log.append("contra", txt_pass.value.trim());
            
            const response_usuario = await fetch('back/validar_logueo.php', {
                method: 'POST',
                body: formdata_log
            });

            if (response_usuario.status === 200) {
                const respuesta_usuarios = await response_usuario.json();
                if (!respuesta_usuarios.error) {
                    localStorage.setItem('datosUsuario', JSON.stringify(respuesta_usuarios['datos']));
                    setTimeout(() => {
                        loader_close();
                        location.href = "-jadmin/dashboard.php";
                    }, 2500);
                }else{

                    loader_close();

                    if (response_usuario.tipo = 'password') {
                        document.getElementById('alert').innerText = `${respuesta_usuarios.msg}`;
                        document.getElementById('alert').style.borderColor = 'rgb(255, 145, 0)';
                        document.getElementById('alert').style.backgroundColor = 'rgba(255, 145, 0, 0.274)';
                        document.getElementById('alert').classList.add('activealert');
                        txt_pass.focus();   
                        campos['contra'] = false;
                    }else if (response_usuario.tipo = 'usuario'){
                        document.getElementById('alert').innerText = `${respuesta_usuarios.msg}`;
                        document.getElementById('alert').style.borderColor = 'rgba(202, 2, 2, 0.993)';
                        document.getElementById('alert').style.backgroundColor = 'rgba(255, 0, 0, 0.226)';
                        document.getElementById('alert').classList.add('activealert');  
                        txt_user.focus();
                        campos['usuario'] = false; 
                    }
                }
            }

            
        }
})