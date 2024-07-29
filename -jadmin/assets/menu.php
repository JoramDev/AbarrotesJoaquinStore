
<header class="header">
        <div class="header__container_logo">
            <a href="../-jadmin/dashboard.php" class="header__logo">
                <img src="../img/logo.jpg" alt="abarrotes joaquin" class="logoGS">
                <p>Ventanita Joaquin</P> 
                <img src="../img/zorritoabtsjq.png" alt="abarrotes joaquin"  class="container_zorrito">
            </a>
        </div>
        <div class="header__containerHamburger">   
            <input type="checkbox" id="checkMenu">
            <label for="checkMenu"><i class="fa-solid fa-bars"></i></label>
        </div>
        <nav class="header__container_menu">
            <ul>
                <li><a href="#" data-title="1">Inicio</a></li>
                <li><a href="categorias.php" data-title="2">Categorias</a></li>
                <li><a href="#" data-title="">Usuarios</a></li>
                <li><a href="proveedores.php" data-title="3">Proveedores</a></li>
                <li><a href="#" data-title="4">Productos</a></li>
                <li><a href="puntoVenta.php" data-title="5">P de venta</a></li>
                <li><a href="#" data-title="6">Ventas</a></li>
                <li><a href="#" data-title="7">A. Precio</a></li>
                <li><a href="#" data-title="8">A. Stock</a></li>
                <li><a href="#" data-title=""><i class="fa-solid fa-right-from-bracket"></i></a></li>
            </ul>
        </nav>
</header>

    <script type="text/javascript">

        const itemsMenu = document.querySelectorAll('.header__container_menu ul li a');

        itemsMenu.forEach(item => {
            if (item.getAttribute('data-title') == document.querySelector('title').getAttribute('data-title')) {
                item.classList.add('activeModule');
            }
        });

        
    </script>