<div class="modalGradiant" id="modalEditProveedor" data-modal="5">
    <div class="modal">
        <section class="modal__header">
            <span>Editar proveedor</span><button><i class="fa-regular fa-rectangle-xmark btnCloseModal" data-modal="5"></i></button>
        </section>
        <section class="modal__content">
           <form action="#" method="" id="formEditProveedor">
                <div class="containerInputLibre">
                    <input type="text" class="input" name="nombreProveedor">
                    <i class="fa-solid fa-scale-balanced"></i>
                    <label class="labelHolder">Nombre proveedor</label>
                </div>
                
                <fieldset class="containerFieldset">

                    <legend>Dia de visita</legend>

                    <input type="checkbox" name="diaVisita[]" value="lunes" id="lunes" class="diaVisita">
                    <label for="lunes">Lunes</label>
    
                    <input type="checkbox" name="diaVisita[]" value="martes" id="martes" class="diaVisita">
                    <label for="martes">Martes</label>
    
                    <input type="checkbox" name="diaVisita[]" value="miercoles" id="miercoles" class="diaVisita">
                    <label for="miercoles">Miercoles</label>
    
                    <input type="checkbox" name="diaVisita[]" value="jueves" id="jueves" class="diaVisita">
                    <label for="jueves">Jueves</label>
    
                    <input type="checkbox" name="diaVisita[]" value="viernes" id="viernes" class="diaVisita">
                    <label for="viernes">Viernes</label>
    
                    <input type="checkbox" name="diaVisita[]" value="sabado" id="sabado" class="diaVisita">
                    <label for="sabado">Sabado</label>
    
                    <input type="checkbox" name="diaVisita[]" value="domingo" id="domingo" class="diaVisita">
                    <label for="domingo">Domingo</label>
                </fieldset>

                <fieldset class="containerFieldset">
                    <legend>Tipo de venta</legend>
                    
                    <input type="radio" name="TVenta" value="pedido" id="pedido_edita">
                    <label for="pedido_edita">Pedido</label>
                    
                    <input type="radio" name="TVenta" value="directa" id="directa_editar">
                    <label for="directa_editar">Directa</label>
                </fieldset>

           </form>
        </section>
        <section class="modal__footer">
            <button class="btnCancelar" data-modal="5">cancelar</button>
            <button class="btnGuardar" id="btnEditarProveedor" data-modal="5">Guardar cambios</button>
        </section>
    </div>
</div>