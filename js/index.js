"use strict";

document.addEventListener('DOMContentLoaded',()=>{

    const principal = document.querySelector('#principal');
    const estrenos = document.querySelector('#estrenos');
    const destacados = document.querySelector('#destacados');
    const premiadas = document.querySelector('#premiadas');
    const criticadas = document.querySelector('#criticadas');

    //EVENTO DE ESCUCHA DE 
    principal.addEventListener("click", event=>{
	    if(permitirAudio) audio.play();
        clickSobrePelicula(event);
    });

   
// ACÁ VOY A APLICAR UNA BÚSQUEDA INDIVIDUAL PARA CADA ELEMENTO DE LA PÁGINA PRINCIPAL
// AUNQUE NO ES LO MÁS ÓPTIMO EN ESTE CASO PORQUE LO MEJOR SERÍA BUSCAR EL JSON COMPLETO Y LUEGO PINTAR CADO UNO
// PERO TOMANDO EN CUENTA QUE SE VA A CONECTAR A DISTINTAS APIS PODRÍA APLICARSE

const capturarJSON=async()=>{
    const respuesta = await fetch("datos/datos.json");
    if(respuesta.ok){
        const respuestaJSON = await respuesta.json();
        return respuestaJSON;
    }else{
        throw {
            statusError:respuesta.status,
            mensajeError: "Lo Sentimos la página no se ha encontrado"
        };
    }
}

const pintarError = (error)=>{
    // principal.innerHTML="";
    principal.innerHTML=`<div class="mt-2 container"><h2>OOOPSSS HA OCURRIDO UN ERROR : ${error.statusError}</h2><h3 class="mt-1 mb-2">${error.mensajeError}</h3></div>`;
}

const pintarEstrenos = ()=>{
    capturarJSON()
    .then(json=>{
        json.sort((a, b)=>b.anio - a.anio);
        let condicionParada= json.length>=10 ? 10 : json.length;
        for(let i=0;i<condicionParada ;i++){
            generarMiniaturaPelicula(json[i]);
        }
        estrenos.append(fragment);
    })
    .catch(error=>{
        pintarError(error);
    });
};

const pintarDestacados = ()=>{
    capturarJSON()
    .then(json=>{
        json.sort((a, b)=>b.valoracion - a.valoracion);
        let condicionParada= json.length>=10 ? 10 : json.length;
        for(let i=0;i<condicionParada ;i++){
            generarMiniaturaPelicula(json[i]);
        }
        destacados.append(fragment);
    })
    .catch(error=>{
        pintarError(error);
    });
};

const pintarPremiadas = ()=>{
    capturarJSON()
    .then(json=>{
        json.sort((a, b)=>b.premios.length - a.premios.length);
        let condicionParada= json.length>=10 ? 10 : json.length;
        for(let i=0;i<condicionParada ;i++){
            generarMiniaturaPelicula(json[i]);
        }
        premiadas.append(fragment);
    })
    .catch(error=>{
        pintarError(error);
    });
};

const pintarCriticadas = ()=>{
    capturarJSON()
    .then(json=>{
        json.sort((a, b)=>b.premios.length - a.premios.length);
        let condicionParada= json.length>=10 ? 10 : json.length;
        for(let i=0;i<condicionParada ;i++){
            generarMiniaturaPelicula(json[i]);
        }
        criticadas.append(fragment);
    })
    .catch(error=>{
        pintarError(error);
    });
};


pintarEstrenos();
pintarDestacados();
pintarPremiadas();
pintarCriticadas();

});//cierre del LOAD
