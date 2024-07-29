<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

if ($_POST){

$idProveedor = $conexion -> real_escape_string($_POST['idProveedor']);

$query = "SELECT * FROM `cocholo`.`proveedores` WHERE `id`= ?";
$sentencia = $conexion -> prepare($query);
$sentencia -> bind_param('i', $idProveedor);

$execute = $sentencia-> execute();

$response_data_json = [];

if ($execute) {
    
    $result_sql = $sentencia -> get_result();
    $res_num_rows = $result_sql-> num_rows; 

    $response_data_json['error'] = $res_num_rows > 0 ? false : true;

    $response_data_json['array_data_proveedor'] = $res_num_rows > 0 ? $result_sql->fetch_assoc() : [];

    if (!$response_data_json['error']) {
       $dias_visita = $response_data_json['array_data_proveedor']["d_visita"]; 

       $response_data_json['array_data_proveedor']["d_visita"] = explode(", ", $dias_visita);

    }

}else{
    $response_data_json['error'] = true;
}



echo json_encode($response_data_json);


}

?>