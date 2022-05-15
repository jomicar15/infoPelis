"use strict";

arrayPeliculas = [
    {
        titulo: "encanto",
        anio: 2017,
        genero: "ANIMACION",
        valoracion: 3
    },
    {
        titulo: "los 4 fantasticos",
        anio: 2016,
        genero: "ANIMACION",
        valoracion: 3
    },
    {
        titulo: "terror en la calle",
        anio: 2017,
        genero: "TERROR",
        valoracion: 4
    },
    {
        titulo: "high school musical",
        anio: 2013,
        genero: ["MUSICAL","ROMANCE"],
        valoracion: 5
    },
    {
        titulo: "duro de matar",
        anio: 2017,
        genero: "CIENCIAFICCION",
        valoracion: 2
    },
    {
        titulo: "hotel transilvania",
        anio: 2017,
        genero: "ANIMACION",
        valoracion: 1
    },
    {
        titulo: "invento",
        anio: 2016,
        genero: "ANIMACION",
        valoracion: 3
    }
];


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

    btnLimpiar.addEventListener('click',()=>{
        document.querySelector('form').reset();

    })
    //Evento que realiza la búsqueda con el filtrado
    formularioSeleccion.addEventListener('click',(ev)=>{
        if(ev.target.matches('input')){
            ev.preventDefault();
            //preparando los valores a mayúsculas
            filtrarPeliculas();
            //document.querySelector('form').reset();
        }
    });

    // FUNCIONES
    const filtrarPeliculas= ()=>{
        if(valoracion.value.toUpperCase()=="SELECCIONAR" && genero.value.toUpperCase()=="SELECCIONAR" && anio.value.toUpperCase()==="SELECCIONAR" ){
            //si ambas son seleccionar, entonces se hace una búsqueda completa de todas las peliculas
            console.log("mostrando todas las peliculas");
        }else{
            //Seleccionando y comparando si los botones son distintos a seleccionar entonces han seleccionado alguna de las opciones de búsqueda
            const objComparar={};
            if(genero.value.toUpperCase()!=="SELECCIONAR") objComparar.genero=genero.value.toUpperCase();
            if(anio.value.toUpperCase()!=="SELECCIONAR") objComparar.anio=Number(anio.value);
            if(valoracion.value.toUpperCase()!=="SELECCIONAR") objComparar.valoracion=Number(valoracion.value);

            const llavesAComparar = Object.keys(objComparar);
            const valoresAComparar = Object.values(objComparar);

            let encontrado = false;
            let arrayAux = [];                        
            let arrayValidar=[];
                arrayPeliculas.forEach(pelicula=>{
                    const llavePelicula = Object.keys(pelicula);
                    const valoresPelicula = Object.values(pelicula);

                    // aqui voy a hacer una búsqueda de las llaves del array para luego comparar y así buscar su valor

                    llavesAComparar.forEach((elemento,index)=>{
                        let indice = llavePelicula.findIndex(item => item == elemento);
                        if(indice){

                            if(typeof (valoresPelicula[indice])==="object"){
                                if(valoresPelicula[indice].includes(valoresAComparar[index])) arrayValidar[index]=true;
                                else arrayValidar[index]=false;
                            }else{
                                if(valoresPelicula[indice] === valoresAComparar[index]) arrayValidar[index]=true;
                                else arrayValidar[index]=false;
                            }
                        }else{ // en caso de que la llave no esté adaptada
                            console.log("no se encontró");
                        }
                    });

                    if(arrayValidar.length!==0){
                        if(arrayValidar.every(item => item===true)){
                            arrayAux.push(pelicula);
                            encontrado=true;
                        }
                    }
                });
               
                if(!encontrado){
                    console.log("No se encontraron peliculas para esta búsqueda")
                }else{
                    console.log(arrayAux);
                }
        }
    }

    rellenarAnioFormularioFiltrar(anioFormulario);
    
});//cierre del LOAD