<?php

require_once( "../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');


$usuario = $conexion -> real_escape_string($_POST['usuario']);
$contra = $conexion -> real_escape_string($_POST['contra']);

$buscar_usuario = $conexion -> query("SELECT * FROM `usuarios_joaquin` WHERE `usuario` = '$usuario'");
$res_busqueda = $buscar_usuario -> fetch_array(MYSQLI_ASSOC);

if ($res_busqueda !== null) {
    if ($res_busqueda['usuario'] == $usuario && $res_busqueda['pass'] == $contra) {

        session_start();
        $_SESSION['id_user'] = $res_busqueda['id'];
        $_SESSION['usuario'] = $res_busqueda['usuario'];
        $_SESSION['cargo'] = $res_busqueda['cargo'];

        echo json_encode(array('error' => false, 'msg' => 'Estas logueado correctamente', 'datos' => $_SESSION));
    }else{
        echo json_encode(array('error' => true, 'tipo' => 'password', 'msg' => 'La contraseña que ingresaste es incorrecta'));
    }
}else{
    echo json_encode(array('error' => true, 'tipo' => 'usuario', 'msg' => 'No estas autorizado para ingresar'));
}

?>