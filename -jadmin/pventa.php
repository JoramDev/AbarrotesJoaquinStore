<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/logo.jpg">
    <script src="https://kit.fontawesome.com/da829a2c90.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/stylePVenta.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="../css/loader.css">
    
    <title data-title="5">Punto de venta</title>
</head>
<body onload="mostrarCarrito()">

    <?php require_once( "assets/menu.php" ); ?>


    <section class="containerMain">
        
        <div class="containerMain__divContainerCarrito">
            
            <div class="containerMain__divContainerCarrito-containerBarCode">
                <div class="containerMain___inputBarcode">
                    <input type="text" placeholder="Ingrese codigo de barras" id="inputBarcode" autocomplete="off">
                    <i class="fa-solid fa-barcode"></i>
                </div>
                <div class="containerMain___inputSearch">
                    <input type="text" placeholder="Ingrese busqueda de producto" id="inputSearch">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>


            <div class="containerTablaCarrito">
                <ul class="carritoList" id="carritoList">

                </ul>
            </div>

            <div class="containerfooter">

                <div class="contentTipoCobro">
                    <input type="radio" name="tipoCobro" id="cobroEfectivo" checked>
                    <label for="cobroEfectivo"> <i class="fa-solid fa-money-bill-1"></i> &nbsp Efectivo</label>

                    <input type="radio" name="tipoCobro" id="cobroQR" >
                    <label for="cobroQR"> <i class="fa-solid fa-money-bill-1"></i> &nbsp Tarjeta</label>

                    <input type="radio" name="tipoCobro" id="cobroTarjeta" >
                    <label for="cobroTarjeta"> <i class="fa-solid fa-money-bill-1"></i> &nbsp QR</label>

                    <span class="comision"> Comision: <p>0.0311</p></span> <input type="text">
                </div> 

                <div class="contentButtonsVenderAndCambio">
                    <button class="cambio">Cambio</button>
                    <button class="totalVenta" id="totalVenta">Total: $ 145.50</button>
                </div>

            </div>

        </div>

        <div class="containerMain__divContainerCardsSearch">
            
            <div class="containerSelectProveedores">
                <select name="proveedores" id="idProveedores" class="selectProveedores">
                    <option value="1">Productos rapidos</option>
                </select>
            </div>

        </div>

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


</body>

<script src="js/appPVenta.js"></script>

</html>