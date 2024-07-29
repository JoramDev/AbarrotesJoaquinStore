<?php

require_once( "conexion/conexion.php" );
$con = new Conexion();
$conexion = $con->getConexion();
$conexion -> set_charset('utf8');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/logo.jpg">
    <link rel="stylesheet" href="css/stylei.css">
    <link rel="stylesheet" href="css/loader.css">
    <script src="https://kit.fontawesome.com/da829a2c90.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Abarrotes Sofia | LOGIN</title>
</head>
<body>
    
   <?php require_once( "conexion/conexion.php" ); ?>
   <?php require_once( "assets/loader.php" ); ?>

    <div class="fondo1"></div>
    <div class="gradiant"></div>
    <section class="main_container">
        <div class="div__container_information">
            <h4>
            Abarrotes Sofia es una Tienda de abarrotes que aun que es pequeña tratamos de tener de todo para darte un buen servicio.
            </h4> 
        </div>
        <div class="div__container_login">
            <div class="logo_gabystore"><img src="img/logo.jpg" alt="gabystore"></div>
            <h1>BIENVENIDO</h1>
            <div class="alert" id="alert"></div>
            <form action="#" id="form_login">

                <div class="container_input">
                    <input type="text" placeholder="Usuario" class="input_user" name="user" id="usuario">
                    <div class="user_invalid" id="user_empty">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p>campo vacio</p> 
                    </div>  
                </div>

                <div class="container_input">
                    <input type="password" placeholder="Contraseña" class="input_pass" name="pass" id="pass">
                    <div class="user_invalid" id="pass_empty">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p>campo vacio</p> 
                    </div>
                    <div class="user_invalid" id="input_error_pass">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p>Contraseña incorrecta</p> 
                    </div> 
                </div>
                <br>
                <div>
                    <input type="submit" value="Iniciar sesion" class="input_submit"> 
                </div>
                <h4><a href="">¿ Olvidaste tu contraseña ?</a></h4>
            </form>
        </div>
    </section>
</body>
<script src="js/login.js"></script>
</html>

