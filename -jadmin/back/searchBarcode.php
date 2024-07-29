<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

$barcode = $conexion -> real_escape_string($_POST['barcode']);

$query = $conexion -> prepare("SELECT * FROM `productos` WHERE `codigobarras` = ? ");
$query -> bind_param('s', $barcode);

if ($query -> execute()){

    $result = $query -> get_result();
    $resultNumRows = $result -> num_rows;

    $resArray = $result -> fetch_array(MYSQLI_ASSOC);
}    

echo json_encode($resArray);



?>