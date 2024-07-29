<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

if ($_POST){

    $proveedor = $conexion -> real_escape_string(trim($_POST['nombreProveedor']));
    $nombre_Proveedor = strtoupper($proveedor[0]).substr($proveedor, 1);


    $d_visita = $_POST['diaVisita'];

    for ($i = 0; $i < count($d_visita); $i++) { 
        $d_visita[$i] = strtoupper($d_visita[$i][0]).substr($d_visita[$i], 1);
    } 
    
    $dia_visita = implode(", ", $d_visita);


    $tipoV = $conexion -> real_escape_string($_POST['TVenta']);
    $tipo_venta = strtoupper($tipoV[0]).substr($tipoV, 1);



    $id_proveedor = $_POST['proveedor_id'];

    $response = [];
    
    $query = "UPDATE `proveedores` SET `proveedor` = ?, `d_visita` = ?, `tipo_venta` = ? WHERE `id` = ?";
    $sentencia = $conexion -> prepare($query); 
    $sentencia -> bind_param('sssi', $nombre_Proveedor, $dia_visita, $tipo_venta, $id_proveedor);
    
    if ($sentencia -> execute()){
        $response['error'] = false;
        $response['mensaje'] = "Provedor actualizado exitosamente";
    }else{
        $response['error'] = true;
        $response['mensaje'] = "Ocurrio un error en la actualizacion del Proveedor";
    }
    
    echo json_encode($response);        
    

}

?>