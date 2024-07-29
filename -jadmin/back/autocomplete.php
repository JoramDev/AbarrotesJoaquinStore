<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

if ($_POST){

$search = $conexion -> real_escape_string($_POST['search']);

$query = "SELECT * FROM `cocholo`.`productos` WHERE `producto` LIKE '%".$search."%' LIMIT 15 ";
$sentencia = mysqli_query($conexion, $query);

$resultRows = $sentencia -> num_rows;

$resArray = $sentencia -> fetch_all(MYSQLI_ASSOC);



echo json_encode($resArray);


}

?>