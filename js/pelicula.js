"use strict";


document.addEventListener('DOMContentLoaded',()=>{
    //VARIABLES
    const especificaciones = document.querySelector('.especificaciones');

    // EVENTOS
    especificaciones.addEventListener("click",ev=>{
        if(ev.target.matches('p')){ 
            limpiarCajaEspecificaciones();
            pintarCajaEspecificaciones(ev.target.getAttribute("data-set"));
        }
    });

    // FUNCIONES
    const id = capturarIdUrl();
    buscarPeliculaEnJSON(id);

});//LOAD
