<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/logo.jpg">
    <script src="https://kit.fontawesome.com/da829a2c90.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/modals.css">
    <link rel="stylesheet" href="css/stylePuntoVenta.css">
    <title data-title="5">Punto de venta</title>
</head>
<body>
    <?php require_once( "modals/modalModifyGranel.php" ); ?>
    <?php require_once( "modals/modalModifyRecarga.php" ); ?>
    <?php require_once( "modals/modalModifyPS.php" ); ?>

    <?php require_once( "assets/menu.php" ); ?>

    
    <section class="contenedor0">
        <div class="contenedor0__contenedorTotalBotones">
            <span class="total" id="totalVenta">Total: $ 145.50</span>
            <button class="cambio"><!-- img src="img/cambio-removebg-preview.png" alt="cambio" title="Cambio"> --><i class="fa-solid fa-hand-holding-dollar"></i></button>
            <a href="#" class="cobrar"><span>Cobrar</span><i></i></a>
            <a href="#" class="vender"><span>Vender</span><i></i></a>
        </div>
        <div class="contenedor0__buscador">

            <div class="contenedor0__contenedorInputSearch">
                <input type="text" class="input inputSearch" id="inputSearch" autocomplete="off">
                <i class="fa-solid fa-magnifying-glass"></i>
                <label for="inputSearch" class="labelHolder">Busqueda de producto</label>
            </div>

            <ul id="containerAutocomplete">
                
            </ul>
        </div>
    </section>
    
    <section class="contenedorMain">

        <section class="contenedor1">
            <section class="contenedor1__busquedabarcode">
                <div class="contenedor1__contenedorInputBarcode">
                    <input type="text" class="input inputBarcode" id="inputBarcode" autocomplete="off">
                    <i class="fa-solid fa-barcode"></i>
                    <label for="inputBarcode" class="labelHolder">Codigo de barras</label>
                </div>
            </section>

            <div class="containerTablaCarrito">
                <ul class="carritoList" id="carritoList">
                </ul>
            </div>

        </section>
        
        <section class="contenedor2">
            <section class="contenedor2__contenedorProveedorCategoria">
                <div class="contentInputCategoria">
                    <input type="radio" class="inputRadio" id="inputRadioCategoria" name="cateandprovee" checked>
                    <label for="inputRadioCategoria">Categorias</label>
                </div>
                <div class="contentInputProveedor">
                    <input type="radio" class="inputRadio" id="inputRadioProveedor" name="cateandprovee">
                    <label for="inputRadioProveedor">Proveedores</label>
                </div>
            </section>
        </section>
    </section>





<!-- -------------------- TEMPLATE LISTA CARRITO ---------------------- -->
<template id="templateCarrito">
        
        <li class="liProductItem">
            <span class="number">1</span>
            <div class="imgProduct"><img src="../img/7500478019854_00.jpg"></div>
            <div class="containerInfoProduct">
                <div class="contentName-and-Delite">
                    <p class="producto">Sabritas flaming hypot de 40 g originalmente picositaas </p>
                    <span class="delete"><i class="fa-solid fa-trash-can"></i></span>
                </div>
                <span class="precio">$ 17.50</span>
                <div class="contentSubtotal-and-Cantidad">
                    <div class="cantidad">
                        <button class="minus">&minus;</button><input type="text" disabled><button class="plus">&plus;</button>
                    </div>
                </div>
                <span class="subtotal">💲179.50</span>
            </div>
        </li>
    
</template>

<!-- TEMPLATE LISTA AUTOCOMPLETE -->

<template id="templateAutocomplete">

    <li class="itemLiAutocomplete" data-code="">
        <figure class="containerImgAC">
            <img src="../img/coca-cola-600ml.png" alt="">
        </figure>
        <div class="containerDescriptionAC">
            <span class="descriptionProd">Coca cola 600ml</span>
            <span class="precioAC"><b>💲17.00</b></span>
        </div>
    </li>

</template>

</body>
<script src="js/app-PuntoVenta.js"></script>
</html>