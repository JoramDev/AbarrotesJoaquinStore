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
    <link rel="stylesheet" href="css/notifications.css">
    <link rel="stylesheet" href="../css/loader.css">
    <link rel="stylesheet" href="css/styleProveedores.css">

    <title data-title="2">Categorias</title>
</head>
<body>

    <?php /* require_once('modals/modalAddProveedor.php') */ ?>
    <?php /* require_once('modals/modalEditProveedor.php')  */?>
    <?php require_once('notifications/notification.php') ?>
    <?php require_once( "../assets/loader_dashboard.php" ); ?>
    <?php require_once( "assets/menu.php" ); ?>


    <main class="containerMain">

        <section class="containerHeader">
            
            <button id="btnAddProveedor">+ nuevo</button>
                
                <select name="numRegistros" id="numRegistros" class="inputRegistros">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>

                <div class="containerInputSearch">
                    <input type="text" class="input" id="inputSearch" autocomplete="off">
                    <i class="fa-solid fa-truck-field-un"></i>
                    <label for="inputSearch" class="labelHolder">Buscar categoria</label>
                </div>

        </section>
        
        <section class="containerTable">
            <table>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>ACCION</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                   
                </tbody>
            </table>
        </section>

        <section class="containerPagination">
            <p id="mostrando"></p>
            <ul class="paginador" id="paginador">
               
            </ul>
        </section>

    </main>

    <!-- -------------- TEMPLATES ------------- -->

    <!-- ------- TEMPLATE PAGINACION ------ -->

    <template id="templatePaginacion">
        <a href="#"><li></li></a>
    </template>

    <!-- -------- TEMPLATE TR FILA TABLA CATEGORIAS ---------- -->

    <template id="templateRow">
        <tr class="rowCategoria">
            <td></td>
            <td><button class="btn editar">Editar</button>&nbsp;&nbsp;<button class="btn eliminar">Eliminar</button></td>
        </tr>
    </template>

</body>

<script src="js/app-categorias.js"></script>

<script>
    const inputs = document.querySelectorAll('.input');

    inputs.forEach(input => {

    if (input.value !== ''){
        input.parentNode.querySelector('.labelHolder').classList.add('focusTop');
        input.classList.add('focus');
    }


    input.onfocus = (e) => {
        e.target.parentNode.querySelector('.labelHolder').classList.add('focusTop');
        e.target.classList.add('focus');
    }
    input.onblur = (e) => {
        if (e.target.value.trim() !== '') return
        e.target.parentNode.querySelector('.labelHolder').classList.remove('focusTop');
        e.target.classList.remove('focus');
        e.target.value = '';
    }
     
    });
</script>

</html>