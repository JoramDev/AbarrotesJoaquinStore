<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

if ($_POST){

    $id_proveedor = $conexion -> real_escape_string($_POST['id_proveedor']);

    $response = [];
    
    $query = "DELETE FROM `proveedores` WHERE `id` = ?";
    $sentencia = $conexion -> prepare($query); 
    $sentencia -> bind_param('i', $id_proveedor);
    
    if ($sentencia -> execute()){
        $response['error'] = false;
        $response['mensaje'] = "Provedor eliminado exitosamente";
    }else{
        $response['error'] = true;
        $response['mensaje'] = "Ocurrio un error al eliminar el proveedor";
    }
    
    echo json_encode($response);        
    

}

?>