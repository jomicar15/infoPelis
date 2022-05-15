"use strict";

/*VARIABLES Y CONSTANTES*/

const inconoBusqueda = document.querySelector("#inconoBusqueda");
const inputBuscador = document.querySelector("#inputBuscador");
const fragment = document.createDocumentFragment();
const audio = new Audio("img/audio-click.mp3");
let objPelicula={};
const permitirAudio = false; //Acá para permitir el efecto del sonido del click

/*EVENTOS*/

//evento de audio para el buscador de la cabecera y sobre el logo
document.addEventListener("click",(ev)=>{
	if(permitirAudio) audio.play();
	//click sobre el logo
	if(ev.target.matches('#imgLogo') || ev.target.matches('#tituloLogo')) document.location = 'index.html';
});

//evento del icono para buscar por nombre de película
inconoBusqueda.addEventListener("click", event=>{
	//Aqui se redirecciona a la página pelicula.html
	if(!buscadorVacio()){
			if(permitirAudio) audio.play();
			document.location= `buscar.html?buscar=${inputBuscador.value.trim()}`;
	}
	limpiarBuscador();
});

//evento de la caja de texto para buscar por nombre de película
inputBuscador.addEventListener("keyup", event=>{

	if(event.key === 'Enter'){
		if(!buscadorVacio()){
			if(permitirAudio) audio.play();
			document.location= `buscar.html?buscar=${inputBuscador.value.trim()}`;
		}
		limpiarBuscador();	
	}

});

//Evento para cada vez que se realiza click en una película
const clickSobrePelicula = (event)=>{
	let variable;
	if(event.target.matches("p")){	
		if(event.target.parentElement.classList.contains('titulo'))variable = Number(event.target.parentElement.parentElement.dataset.set);
		else variable = Number(event.target.parentElement.parentElement.parentElement.dataset.set);
	}

	if(event.target.matches("img")){
		if(event.target.parentElement.classList.contains('cajaEstrellas'))variable = Number(event.target.parentElement.parentElement.parentElement.dataset.set);
		else variable = Number(event.target.parentElement.parentElement.dataset.set)
	}
	//una vez encontrado el valor de la película, entonces comparamos
	if(!isNaN(variable)) document.location = `pelicula.html?id=${variable}`;

}



/*FUNCIONES*/
const limpiarBuscador = ()=>inputBuscador.value="";
const buscadorVacio = ()=> inputBuscador.value.trim()==='' ? true : false;

const buscadorInputPelicula = (inputBuscador)=>{
	const palabraBusqueda = document.querySelector('#palabraBusqueda');
	palabraBusqueda.textContent=inputBuscador;
	
	fetch("datos/datos.json")
							.then((respuesta)=>{
								return respuesta.ok ? respuesta.json() : Promise.reject(respuesta)
							})
							.then(json=>{
								pintarBusqueda(json,inputBuscador.toLowerCase());
							})
							.catch(error=>{
								console.log(error);
							});
}

const pintarBusqueda=(json,inputBuscador)=>{
	const cajaPalabraBusqueda = document.querySelector("#cajaPalabraBusqueda");
	cajaPalabraBusqueda.innerHTML="";
	let encontrado = false;
	json.forEach(pelicula=>{
		if(pelicula.titulo.toLowerCase().includes(inputBuscador)){
			generarMiniaturaPelicula(pelicula);
			encontrado=true;
		}
	});
	
	if(!encontrado){
		const mensajeNoEncontrado = document.createElement('P');
		mensajeNoEncontrado.textContent = "No se han encontrado coincidencias";
		fragment.append(mensajeNoEncontrado);
	}

	cajaPalabraBusqueda.append(fragment);
}




//rellenar los años en el formulario del filtrado
const rellenarAnioFormularioFiltrar = (anioFormulario) => {
	// const fragment = document.createDocumentFragment();
	const fechaActual = new Date().getFullYear();
	for(let i=fechaActual;i>=fechaActual-50;i--){
		const option = document.createElement('OPTION');
		option.value = i;
		option.textContent=`${i}`;
		fragment.append(option);
	}
	anioFormulario.append(fragment);
}

//Aplicando filtros por año, categoría, o valoracion
const filtrarPeliculas= (arrayPeliculas)=>{
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
				console.log("No se encontraron peliculas para esta búsqueda");
				limpiarCajaFiltrar();
				const noEncontrado=document.createElement("P");
				noEncontrado.textContent="No se encontraron peliculas con estos filtros";
				cajaFiltrar.append(noEncontrado);
			}else{
				for(let i=0;i<arrayAux.length;i++){
					generarMiniaturaPelicula(arrayAux[i]);
				}
				cajaFiltrar.append(fragment);
			}
	}
}

const filtrarDatosJSON = async ()=>{
	try{
		const respuesta = await fetch("datos/datos.json");
		if(respuesta.ok){
			const respuestaJSON = await respuesta.json();
			filtrarPeliculas(respuestaJSON);
		}else{
			throw ({
				status: 404,
				texto:"error"
			});
		}
	}catch (error) {
		console.log(`${error.status} : ${error.texto}`)
	}      
}

const generarEstrellas= (iterador)=>{
	//Función para generar la cantidad de estrellas de la miniaura de la película
		const fragmento = document.createDocumentFragment();
	
		for(let i=0;i<iterador;i++){
			const img=document.createElement('IMG');
			img.src="img/iconos/star.png";
			img.alt="Estrella";
			img.setAttribute("width","20px");
			img.setAttribute("height","20px");
			fragmento.append(img);
		}
		return fragmento;
}

const limpiarCajaFiltrar=()=>cajaFiltrar.innerHTML="";

//voy a generar una miniatura que se va a almacenar en el fragment
const generarMiniaturaPelicula=(pelicula)=>{
	//Creando todos los elementos que va a tener la card de una película
	const card=document.createElement("DIV");
	const position = document.createElement("DIV");
	const imgPelicula = document.createElement("IMG");
	const cajaEstrellas = document.createElement("DIV");
	const cajaFecha = document.createElement("DIV");
	const pCajaFecha = document.createElement("P");
	const titulo = document.createElement("DIV");
	const ptitulo = document.createElement("P");
	card.classList.add("card");
	card.setAttribute("data-set",pelicula.id);
	position.classList.add("position-rel");
	imgPelicula.src=`${pelicula.imagen}`;
	imgPelicula.alt=`${pelicula.titulo}`;
	imgPelicula.classList.add("miniatura","mt-1");
	cajaEstrellas.classList.add("cajaEstrellas","position-absol");
	//falta por hacer el ciclo para generar la cantidad de estrellas relativa a su valoración
	// cajaEstrellas.innerHTML=`
	// 						<img src="img/iconos/star.png" alt="" width="20px" height="20px">
	// 						<img src="img/iconos/star.png" alt="" width="20px" height="20px">
	// 						`;
	cajaEstrellas.append(generarEstrellas(pelicula.valoracion));
	pCajaFecha.textContent=`${pelicula.anio}`;
	cajaFecha.classList.add("cajaFecha","position-absol");
	cajaFecha.append(pCajaFecha);
	position.append(imgPelicula);
	position.append(cajaEstrellas);
	position.append(cajaFecha);
	titulo.classList.add("titulo","mt-1","mb-1");
	ptitulo.textContent=`${pelicula.titulo}`;
	titulo.append(ptitulo);
	card.append(position);
	card.append(titulo);
	fragment.append(card);
}

const capturarPalabraUrl=()=>{
	const urlParams = new URLSearchParams(window.location.search);
	let palabra = urlParams.get('buscar');
	//previniendo inyección de código en la url
	if(!palabra.length<=0){
		return palabra;
	}
}

const capturarIdUrl=()=>{
	const urlParams = new URLSearchParams(window.location.search);
	let idPelicula = urlParams.get('id');
	idPelicula= Number(idPelicula);
	//previniendo inyección de código en la url
	if(!isNaN(idPelicula)){
		return idPelicula;
	}else{
		console.log("no es un número");
	}

}

const generoInfoPelicula = (arrayGenero)=>{
	let stringGenero='';
	arrayGenero.forEach((genero,index)=>{
		genero = genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase(); 
		stringGenero+=genero;		
		if(index<arrayGenero.length-1) stringGenero+=', ';
	});
	return stringGenero;
}

const pintarEncabezadoPelicula = (pelicula)=>{
	const encabezado = document.querySelector('.encabezado');
	encabezado.innerHTML = `
	<img src="${pelicula.imagen}" alt="${pelicula.titulo}" width="200px" height="200px" class="miniatura">
	<div>
		<h2>${pelicula.titulo}</h2>
		<p class="c1 mt-1">${pelicula.sinopsis}</p>
		<p class="c2 mt-2"><strong>Categoría: </strong>${generoInfoPelicula(pelicula.genero)} </p>
		<p class="c3 mt-1"><strong>Año: </strong>${pelicula.anio} </p>
		<p class="c3 mt-1"><strong>Duración: </strong>${pelicula.duracion} </p>
	</div>`;
}

const pintarImagenesPelicula=(pelicula)=>{
	const fotografias = document.querySelector('.fotografias');
	
	if(pelicula.fotos.length>0){
		pelicula.fotos.forEach(foto =>{
			const img = document.createElement("IMG");
			img.alt = pelicula.titulo;
			img.src = foto;
			fragment.append(img);
			// <img src="img/Encanto.jpg" alt="" class="miniatura"></img>
		});
	}else{
		const mensaje = document.createElement("P");
		mensaje.textContent = "No se han encontrado imágenes";
		fragment.append(mensaje);
	}
	fotografias.append(fragment);
}
//se almacena todas las especificaciones en un objeto para posteriormente pintarlo
const guardarCajaEspecificaciones=(pelicula)=>{
	const cajaEspecificaciones = document.querySelector('.cajaEspecificaciones');
	const {trailer,sinopsis,fichaTecnica,fichaArtistica,premios,prensa,criticas} = pelicula;
	objPelicula.trailer=trailer;
	objPelicula.sinopsis=sinopsis;
	objPelicula.fichaTecnica=fichaTecnica;
	objPelicula.fichaArtistica=fichaArtistica;
	objPelicula.premios=premios;
	objPelicula.prensa=prensa;
	objPelicula.criticas=criticas;
}

const limpiarCajaEspecificaciones=()=>{
	const cajaEspecificaciones = document.querySelector('.cajaEspecificaciones');
	cajaEspecificaciones.innerHTML="";
}

const pintarSinopsisCajaEspecificaciones=()=>{
	const sinopsis = document.createElement("P");
	sinopsis.textContent = objPelicula.sinopsis;
	fragment.append(sinopsis);
}

const pintarFichaTecnicaCajaEspecificaciones=()=>{
	const fichaTecnica = document.createElement('P');
	fichaTecnica.innerHTML = `<br>
							<strong>Dirección:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.direccion)}<br><br>
							<strong>Guión:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.guion)}<br><br>
							<strong>Dirección de Fotografía:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.direccionDeFotografia)}<br><br>
							<strong>Montaje:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.montaje)}<br><br>
							<strong>Ayudante de dirección:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.ayteDireccion)}<br><br>
							<strong>Productor:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.productor)}<br><br>
							<strong>Sonido:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.sonido)}<br><br>
							<strong>Operador de cámara:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.operadorDeCamara)}<br><br>
							<strong>Dirección de arte:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.direccionDeArte)}<br><br>
							<strong>Vestuario:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.vestuario)}<br><br>
							<strong>Maquillaje:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.maquillaje)}<br><br>
							<strong>Peluqueria:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.peluqueria)}<br><br>
							<strong>Casting:</strong> ${generoInfoPelicula(objPelicula.fichaTecnica.casting)}<br><br>
							<br>`;
	fragment.append(fichaTecnica);
}

const pintarFichaArtisticaCajaEspecificaciones=()=>{
	const fichaArtistica = document.createElement('P');
	objPelicula.fichaArtistica.forEach((personaje)=>{
		fichaArtistica.innerHTML += `<br><strong>Personaje:</strong> ${personaje.nombrePersonaje}<br>
									<strong>Actor:</strong> ${personaje.actor}<br>`
	});
	fragment.append(fichaArtistica);
}

const pintarPremiosCajaEspecificaciones = ()=>{
	const premios = document.createElement('P');
	premios.innerHTML = `<br><strong>Premios:</strong> ${generoInfoPelicula(objPelicula.premios)}<br><br>`;
	fragment.append(premios);
}

const pintarPrensaCajaEspecificaciones = ()=>{
	const prensa = document.createElement('P');
	prensa.innerHTML = `<br><strong>Prensa:</strong> ${generoInfoPelicula(objPelicula.prensa)}<br><br>`;
	fragment.append(prensa);
}

const pintarCriticasCajaEspecificaciones = ()=>{
	const criticas = document.createElement('P');
	criticas.innerHTML = `<br><strong>Críticas:</strong> ${generoInfoPelicula(objPelicula.criticas)}<br><br>`;
	fragment.append(criticas);
}

const pintarCajaEspecificaciones = (propiedad)=>{
	const cajaEspecificaciones = document.querySelector('.cajaEspecificaciones');
	if(propiedad === "sinopsis") pintarSinopsisCajaEspecificaciones();
	if(propiedad === "fichaTecnica") pintarFichaTecnicaCajaEspecificaciones();
	if(propiedad === "fichaArtistica") pintarFichaArtisticaCajaEspecificaciones();
	if(propiedad === "premios") pintarPremiosCajaEspecificaciones();
	if(propiedad === "prensa") pintarPrensaCajaEspecificaciones();
	if(propiedad === "criticas") pintarCriticasCajaEspecificaciones();
	cajaEspecificaciones.append(fragment);
}

//se recibe una película dada y se pinta la información de la película original
const pintarInfoPelicula=(pelicula)=>{
	pintarEncabezadoPelicula(pelicula);
	guardarCajaEspecificaciones(pelicula);
	pintarImagenesPelicula(pelicula);
}

const buscarPorId=(arrayPeliculas,id)=>{
	arrayPeliculas.forEach(pelicula => {
		if(pelicula.id===id)pintarInfoPelicula(pelicula);
	});
}

//Realizar búsqueda en el json para encontrar la película con su respectivo id
const buscarPeliculaEnJSON=async (id)=>{
	const respuesta = await fetch("datos/datos.json");
	try{
		if(respuesta.ok){
			const respuestaJSON = await respuesta.json();
			buscarPorId(respuestaJSON,id);
		}else{
			throw ("error")
		}
	}catch(error){
		console.log(error);
	}
}


