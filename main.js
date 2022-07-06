'use strict';
let nro_intentos = 0;
let palabras;
let palabra
const MAX_ATTEMPTS= 7;
let exito = false;
let fin = false;
let posicion;
let palabraOculta;

const  drawLines = (palabra,num) =>{
    palabraOculta = Array.from(palabra);
    for (var i = 0; i < num; i++) {
      if(palabra[i] ==" ")
      {
        palabraOculta[i] = " ";
      }
      else
        palabraOculta[i] = "_";
    }
    document.querySelector('#output').innerHTML = palabraOculta.join("");
};

const LoadPoliticalParties  =() =>{
    palabras = ['APRA','PPC','ACCION POPULAR','FREPAP','FUERZA POPULAR','PARTIDO MORADO'];
    palabra = palabras[Math.floor(Math.random()*palabras.length)]
    drawLines(palabra,palabra.length);
};

//validación de mayusculas 
var lock = (e, max, arr = e.value.match(/[A-Z]/g) || []) => arr.length === max;

const ChangeImage =(id_foto)=>  
{
    if(id_foto<MAX_ATTEMPTS)
    {
        let char_raiz = "./imgs/Ahorcado-";
        var imagen = document.getElementById("foto");
        char_raiz = char_raiz.concat(id_foto);
        imagen.src = char_raiz.concat(".png");
    }
};

const ProtectButtons = () =>{
    let boton = document.querySelector('#calcular');
    boton.disabled = true;
};

document.querySelector("#clean").addEventListener('click',()=>{
    document.querySelector('#letra').value = "";
    document.querySelector('#calcular').disabled  = false;
    palabra ="";
    palabraOculta = "";
        fin = false; 
    LoadPoliticalParties();
});

document.querySelector('#calcular').addEventListener('click',()=>
{
    let ok = false;
    let letra = document.querySelector('#letra').value.toUpperCase();
    console.log(letra);
    let J =0;
    if(palabra.indexOf(letra) != -1)
    {
        console.log("la palabra sí contiene la letra " + letra + " ESTA EN EL INDIDCE " + palabra.indexOf(letra));
        for(var i=0; i<palabra.length; i++) {
            if(palabra[i]==letra) palabraOculta[i] = letra;
            ok =true;

               if(!palabraOculta.includes('_'))
                {
                        fin = true;
                }
          }
    }

    if(ok == false)
    {   nro_intentos++;
        ChangeImage(nro_intentos);
        if(nro_intentos >= MAX_ATTEMPTS)
        {
           document.querySelector('#output').innerHTML = palabra;
           alert("PERDISTE EL JUEGO");
           ProtectButtons();
        }
    }
    else
    {
        document.querySelector('#output').innerHTML = palabraOculta.join("");
        console.time(10);
        if (fin ==true)
        {
            ProtectButtons();
            alert('GANASTE');
        }
    }
});
//old form
// document.getElementById("calcular").onclick = () => { 
//     if(lock(document.getElementById("letra"), 1)) 
//     console.log("Correcto");
//     else 
//     alert("Debe ingresar una letra en mayúscula");
// };

// String.prototype.replaceAt = function (index,character) 
// {
//     return this.substr(0,index) + character + this.substr(index+character.length);
// }


//main
LoadPoliticalParties();