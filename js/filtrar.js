"use strict";

//rellenando los años del formulario
document.addEventListener('DOMContentLoaded',()=>{
    //VARIABLES
    const anioFormulario = document.querySelector('#anio');
    const cajaFiltrar = document.querySelector('#cajaFiltrar');
    const formularioSeleccion = document.querySelector('.formularioSeleccion');
    const genero = document.querySelector('#genero');
    const anio = document.querySelector('#anio');
    const valoracion = document.querySelector('#valoracion');
    const btnLimpiar = document.querySelector('#btnLimpiar');

    // EVENTOS
    cajaFiltrar.addEventListener('click',event=>{
        clickSobrePelicula(event);
    });

    //Desencadena un reseteo en los valores del formulario
    btnLimpiar.addEventListener('click',()=>{
        document.querySelector('form').reset()
        limpiarCajaFiltrar();
    });
    
    //Evento que realiza la búsqueda con el filtrado
    formularioSeleccion.addEventListener('click',(ev)=>{
        if(ev.target.matches('input')){
            ev.preventDefault();
            //preparando los valores a mayúsculas
            limpiarCajaFiltrar();
            filtrarDatosJSON();
            // filtrarPeliculas();
            //document.querySelector('form').reset();
        }
    });

    // FUNCIONES
    
    rellenarAnioFormularioFiltrar(anioFormulario);
    // generarMiniaturaPelicula();
    // generarMiniaturaPelicula();
    // generarMiniaturaPelicula();
    // console.log(fragment);

    //Al momento de cargar peliculas, se buscan todas las películas recientes en la base de datos
    //haciendo una paginación mostrando las 10 primeras películas




    
});//cierre del LOAD