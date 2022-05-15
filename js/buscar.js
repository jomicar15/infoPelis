'use strict';


document.addEventListener('DOMContentLoaded',()=>{
    const cajaPalabraBusqueda=document.querySelector('#cajaPalabraBusqueda');
    const buscarPalabra= capturarPalabraUrl();
    buscadorInputPelicula(buscarPalabra.trim());

    cajaPalabraBusqueda.addEventListener('click',(ev)=>{
        clickSobrePelicula(ev);
    });


});//cierre del LOAD