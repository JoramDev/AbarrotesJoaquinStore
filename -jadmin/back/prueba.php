<?php

$cadena = "coca cola";
$str = strtoupper($cadena[0]).substr($cadena, 1);
#$str .= substr($cadena, 1);

printf($str);

?>