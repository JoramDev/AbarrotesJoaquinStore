<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');


if($_POST){


    $sentencia = $conexion -> query("SELECT * FROM `proveedores`"); 
    $sentencia_result = $sentencia -> fetch_all(MYSQLI_ASSOC);


    echo json_encode($sentencia_result);


}


?>