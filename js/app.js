//Variables
const marca = document.querySelector('#marca');
const modelo = document.querySelector('#modelo');
const year = document.querySelector('#year');
const precio = document.querySelector('#precio');
const puertas = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear(); //Obteniendo año actual
const min = max - 10;

const datosBusqueda = {
	marca: '',
	year: '',
	precio: '',
	minimo: '',
	maximo: '',
	puertas: '',
	transmision: '',
	color: '',
	
}

document.addEventListener('DOMContentLoaded', () => {
	mostrarAutos(autos);
	//LLenar años
	llenarSelect();
});



marca.addEventListener('change', e => {
	datosBusqueda.marca = e.target.value;

	filtrarAuto();
});
year.addEventListener('change', e => {
	datosBusqueda.year = parseInt(e.target.value);

	filtrarAuto();
});
minimo.addEventListener('change', e => {
	datosBusqueda.minimo = e.target.value;

	filtrarAuto();
});
maximo.addEventListener('change', e => {
	datosBusqueda.maximo = e.target.value;

	filtrarAuto();
});
puertas.addEventListener('change', e => {
	datosBusqueda.puertas = parseInt(e.target.value);

	filtrarAuto();
});
transmision.addEventListener('change', e => {
	datosBusqueda.transmision = e.target.value;

	filtrarAuto();
});
color.addEventListener('change', e => {
	datosBusqueda.color = e.target.value;
	
	filtrarAuto();
});




function mostrarAutos(autos){
	limpiarHTML();//Eliminar HTML previo
	autos.forEach(auto => {
		const {marca, modelo, year, puertas, transmision, 
			precio, color} = auto;
		const autoHTML = document.createElement('p');
		
		autoHTML.textContent = `
			${marca}, - ${modelo}, - ${year}, - ${puertas}, 
			- ${transmision}, - $${precio}, - ${color}
		`;

		resultado.appendChild(autoHTML);	
	} );
}

//Limpiar HTML
function limpiarHTML(){
	while(resultado.firstChild){
		resultado.removeChild(resultado.firstChild);
	}
}

function llenarSelect(){
	
	for(let i = max; i >= min; i--){
		const opcion = document.createElement('option');
		opcion.value = i;
		opcion.textContent = i;
		year.appendChild(opcion);
	}
}

function filtrarAuto(){
	const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).
	filter(filtrarTransmicion).filter(filtrarColor);
	if (resultado.length) {
		mostrarAutos(resultado);
	}else{
		error();
	}

}

function error(){
	limpiarHTML();

	console.log('si entra');
	const error = document.createElement('div');
	error.classList.add('alerta', 'error');
	error.textContent = 'No se encontro tu busqueda, intenta nuevamente';
	resultado.appendChild(error);
}

function filtrarMarca(auto){
	const{marca} = datosBusqueda;
	if (marca) {
		return auto.marca === marca;
	}else{
		return auto;
	}

}

function filtrarYear(auto){
	const{year} = datosBusqueda;
	if (year) {
		return auto.year === year;
	}else{
		return auto;
	}
}

function filtrarMinimo(auto){
	const {minimo} =  datosBusqueda;
	if (minimo) {
		return auto.precio >= minimo; 
	}else{
		return auto;
	}
}

function filtrarMaximo(auto){
	const {maximo} = datosBusqueda;
	if (maximo) {
		return auto.precio <= maximo;
	}else{
		return auto;
	}
}
function filtrarPuertas(auto){
	const {puertas} = datosBusqueda;
	if (puertas) {
		console.log('entra');
		return auto.puertas === puertas
	}else{
		return auto;
	}

}
function filtrarTransmicion(auto){
	const{transmision} = datosBusqueda;
	if (transmision) {
		return auto.transmision === transmision
	}else{
		return auto;
	}
}
function filtrarColor(auto){
	const{color} = datosBusqueda;
	if (color) {
		return auto.color === color;
	}else {
		return auto;
	}
}