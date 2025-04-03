'use strict';
let nroIntentos = 0;
let palabras;
let palabra
const MAX_ATTEMPTS= 7;
let exito = false;
let fin = false;
let posicion;
let palabraOculta;

const  drawLines = (palabra,num) =>{
    palabraOculta = Array.from(palabra);
    for (let i = 0; i < num; i++) {
      if(palabra[i] ==" ")
      {
        palabraOculta[i] = " ";
      }
      else
        palabraOculta[i] = "_";
    }
    document.querySelector('#output').innerHTML = palabraOculta.join("");
};

const loadPoliticalParties  =() =>{
    palabras = ['APRA','PPC','ACCION POPULAR','FREPAP','FUERZA POPULAR','PARTIDO MORADO'];
    palabra = palabras[Math.floor(Math.random()*palabras.length)]
    drawLines(palabra,palabra.length);
};

const changeImage =(id_foto)=>  
{
    if(id_foto<MAX_ATTEMPTS)
    {
        let char_raiz = "./imgs/Ahorcado-";
        let imagen = document.getElementById("foto");
        char_raiz = char_raiz.concat(id_foto);
        imagen.src = char_raiz.concat(".png");
    }
};

const protectButtons = () =>{
    let boton = document.querySelector('#calcular');
    boton.disabled = true;
};

document.querySelector("#clean").addEventListener('click', () => {
	document.querySelector('#letra').value = "";
	document.querySelector('#letra').focus();
 });
 
 document.querySelector("#restart").addEventListener('click', () => {
	document.querySelector('#letra').value = "";
	document.querySelector('#calcular').disabled = false;
	nroIntentos = 0;
	palabra = "";
	palabraOculta = "";
	exito = false;
	fin = false;
	changeImage(nroIntentos);
	loadPoliticalParties();
 });
 

document.querySelector('#calcular').addEventListener('click',()=>
{
    let ok = false;
    let letra = document.querySelector('#letra').value.toUpperCase();
	 if (letra.length !== 1 || !letra.match(/[A-ZÑ]/)) {
		alert("Por favor, ingresa solo una letra válida.");
		return;
 	 }
    if(palabra.indexOf(letra) != -1)
    {
		  for (let i = 0; i < palabra.length; i++) {
			if (palabra[i] === letra) {
			  palabraOculta[i] = letra;
			  ok = true;
			}
		 }
		 if (!palabraOculta.includes('_')) {
			fin = true;
		 }
    }

    if(!ok)
    {   nroIntentos++;
			changeImage(nroIntentos);
        if(nroIntentos >= MAX_ATTEMPTS)
        {
           document.querySelector('#output').innerHTML = palabra;
           alert("PERDISTE EL JUEGO");
           protectButtons();
        }
    }
    else
    {
        document.querySelector('#output').innerHTML = palabraOculta.join("");
        console.time(10);
        if (fin)
        {
            protectButtons();
            alert('GANASTE');
        }
    }
});
 
loadPoliticalParties();