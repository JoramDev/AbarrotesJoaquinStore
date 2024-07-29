<?php

require_once( "../../conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');


$camposObtener = ['IdProveedor', 'NombreProveedor', 'DiaVisita', 'tipo_venta', 'fecha_registro'];

$camposBuscar = ['proveedor', 'd_visita', 'tipo_venta'];

$tabla = 'proveedores';

$busquedaCampo = isset($_POST['busquedaProveedor']) ? $conexion -> real_escape_string($_POST['busquedaProveedor']) : null;

$busquedaCampo = trim($busquedaCampo);

$where = "";

if (!empty($busquedaCampo)) {
    
    $where .= "WHERE (";

    $countCamposBuscar = count($camposBuscar);

    for ($i = 0; $i < $countCamposBuscar; $i++){
        $where.= $camposBuscar[$i]." LIKE '%".$busquedaCampo."%' OR ";
    }

    $where = substr_replace($where, "", -3);

    $where.= ")";
}

$pagina = isset($_POST['pagina']) ? $conexion -> real_escape_string($_POST['pagina']) : 1;

$registros = isset($_POST['registros']) ? $conexion -> real_escape_string($_POST['registros']) : 10;

$order = "ORDER BY `id` DESC";

$limit = "";

if (!$pagina) {
    $inicio = 0;
    $pagina = 1;
}else{
    $inicio = ($pagina - 1) * $registros;
}


$limit = " LIMIT $inicio , $registros";

$sql = "SELECT SQL_CALC_FOUND_ROWS ".implode(", ", $camposObtener)." FROM $tabla $where $order $limit";
$resultQuery = mysqli_query($conexion, $sql);
$resNumRows = $resultQuery -> num_rows;

$sql_filter_number = "SELECT FOUND_ROWS()";

$res_filter = $conexion ->query($sql_filter_number);
$number_filter = $res_filter -> fetch_array();
$total_filter = $number_filter[0];

$sql_register_total = "SELECT count('id') FROM $tabla ";

$res_register_total = $conexion ->query($sql_register_total);
$number_total = $res_register_total -> fetch_array();
$total_register = $number_total[0];

$paginacion = [];


if ($total_filter > 0) {
    
    $total_paginas = ceil($total_filter / $registros);
    
    $numeroInicio = 1;

    if (($pagina - 4) > 1) {
        $numeroInicio = $pagina - 4;
    }

    $numeroFin = $numeroInicio + 9;

    if ($numeroFin > $total_paginas) {
        $numeroFin = $total_paginas;
    }

        for ($i=$numeroInicio; $i <= $numeroFin; $i++) {
            array_push($paginacion, $i); 
        }

}else{
    $numeroInicio = 1;
    $numeroFin = 1;
}

$datos = [];


if ($resNumRows > 0) {
    while ($row = $resultQuery->fetch_array(MYSQLI_ASSOC)) {
       array_push($datos, array(
        'id' => $row['id'],
        'proveedor' => $row['proveedor'],
        'd_visita' => $row['d_visita'],
        'tipo_venta' => $row['tipo_venta'],
        'fecha_registro' => $row['fecha_registro']
       ));
    }
}

echo json_encode(array("pagina" => $pagina, "paginacion" => $paginacion, "totalFiltros" => $total_filter, "totalRegistros" => $total_register, "datos" => $datos, "pagInicio" => $numeroInicio, "pagFin" => $numeroFin), JSON_UNESCAPED_UNICODE);


?>