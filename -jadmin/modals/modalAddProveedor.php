<div class="modalGradiant" id="modalAddProveedor" data-modal="4">
    <div class="modal">
        <section class="modal__header">
            <span>Agregar proveedor</span><button><i class="fa-regular fa-rectangle-xmark btnCloseModal" data-modal="4"></i></button>
        </section>
        <section class="modal__content">
           <form action="#" method="" id="formNewProveedor">
                <div class="containerInputLibre">
                    <input type="text" class="input" name="nombreProveedor" id="inputProveedor">
                    <i class="fa-solid fa-scale-balanced"></i>
                    <label for="inputProveedorName" class="labelHolder">Nombre proveedor</label>
                </div>
                
                <fieldset class="containerFieldset">

                    <legend>Dia de visita</legend>

                    <input type="checkbox" name="diaVisita[]" value="lunes" id="lun" class="diaVisita">
                    <label for="lun">Lunes</label>
    
                    <input type="checkbox" name="diaVisita[]" value="martes" id="mar" class="diaVisita">
                    <label for="mar">Martes</label>
    
                    <input type="checkbox" name="diaVisita[]" value="miercoles" id="mier" class="diaVisita">
                    <label for="mier">Miercoles</label>
    
                    <input type="checkbox" name="diaVisita[]" value="jueves" id="jue" class="diaVisita">
                    <label for="jue">Jueves</label>
    
                    <input type="checkbox" name="diaVisita[]" value="viernes" id="vier" class="diaVisita">
                    <label for="vier">Viernes</label>
    
                    <input type="checkbox" name="diaVisita[]" value="sabado" id="sab" class="diaVisita">
                    <label for="sab">Sabado</label>
    
                    <input type="checkbox" name="diaVisita[]" value="domingo" id="dom" class="diaVisita">
                    <label for="dom">Domingo</label>
                </fieldset>

                <fieldset class="containerFieldset">
                    <legend>Tipo de venta</legend>
                    
                    <input type="radio" name="TVenta" value="pedido" id="pedido" checked>
                    <label for="pedido">Pedido</label>
                    
                    <input type="radio" name="TVenta" value="directa" id="directa">
                    <label for="directa">Directa</label>
                </fieldset>

           </form>
        </section>
        <section class="modal__footer">
            <button class="btnCancelar" data-modal="4">cancelar</button>
            <button class="btnGuardar" id="GuardarNuevoProveedor" data-modal="4">Guardar cambios</button>
        </section>
    </div>
</div>