<?php

require_once( "conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

$inputSearh = $_POST['search'];


$err = true;

$query = "SELECT * FROM `productos` WHERE `producto` LIKE '%".$inputSearh."%' LIMIT 10";
$busquedaProductos = $conexion -> query($query);
$resArrar = $busquedaProductos -> fetch_all(MYSQLI_ASSOC);
$resRows = mysqli_num_rows($busquedaProductos);

if ($busquedaProductos) {
   $err = false;
}else{
    $err = true;
}

echo json_encode(array('error' => $err, 'result' => $resArrar));

?>