<div class="modalGradiant" id="modalCantidad" data-modal="1">
    <div class="modal">
        <section class="modal__header">
            <span>Modificar cantidad</span><button><i class="fa-regular fa-rectangle-xmark btnCloseModal" data-modal="1"></i></button>
        </section>
        <section class="modal__content">
            <div class="modal__content-containerInfo">
                <span id="valoresItem"></span>
                <div class="containerInputsCantidad">
                    <div class="containerButtonsCantidad" id="buttonsCantidad">
                        <button data-cantidad=".250">1/4</button>
                        <button data-cantidad=".500">1/2</button>
                        <button data-cantidad="1.000">1 Kg</button>
                        <button data-cantidad="1.500">1.500 Kg</button>
                        <button data-cantidad="2.000">2 Kg</button>
                    </div>
                    
                    <div class="containerInput">
                        <input type="number" class="inputLibre inputGramos" id="inputGramos">
                        <i class="fa-solid fa-scale-balanced"></i>
                        <label for="inputSearch" class="labelHolderLibre">Cantidad a Granel ej: .250</label>
                    </div>

                    <div class="containerInput">
                        <input type="number" class="inputLibre inputDinero" id="inputDinero">
                        <i class="fa-solid fa-circle-dollar-to-slot"></i>
                        <label for="inputSearch" class="labelHolderLibre">Cantidad en $ Dinero ej: 10</label>
                    </div>
                </div>
            </div>
        </section>
        <section class="modal__footer">
            <button class="btnCancelar" data-modal="1">cancelar</button>
            <button class="btnGuardar" id="GuardarCantidad" data-modal="1" data-idProduct="">Guardar cambios</button>
        </section>
    </div>
</div>