//referencia : https://www.youtube.com/watch?v=mn07nxUXoPA
'use strict';
let nro_intentos = 0;
let palabras;
let palabra
const MAX_ATTEMPTS= 7;
let exito = false;
let fin = false;
let posicion;
let palabraOculta;

String.prototype.replaceAt = function (index,character) 
{
    return this.substr(0,index) + character + this.substr(index+character.length);
}

const LoadPoliticalParties  =() =>{
    palabras = ['APRA','PPC','ACCION POPULAR','FREPAP','FUERZAPOPULAR','PARTIDO MORADO'];
    palabra = palabras[Math.floor(Math.random()*palabras.length)]
    posicion = 0;
    palabraOculta = palabra.replace(/./g,"_ ");
    document.querySelector('#output').innerHTML = palabraOculta;
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
}

const ProtectButtons = () =>{
    let boton = document.querySelector('#calcular');
    boton.disabled = true;
}

document.querySelector("#clean").addEventListener('click',()=>{
    document.querySelector('#letra').value = "";
    document.querySelector('#calcular').disabled  = false;
    LoadPoliticalParties();
});

document.querySelector('#calcular').addEventListener('click',()=>
{
    let ok = false;
    let letra = document.querySelector('#letra').value.toUpperCase();
    console.log(letra);


    for(const i in palabra)
    {
        if(letra==palabra[i])
        {
            palabraOculta = palabraOculta.replaceAt(i*2,letra);
            ok = true;
        }

        if(!palabraOculta.includes('_'))
        {
            fin = true;
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
            document.querySelector('#output').innerHTML = palabraOculta;
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
//main
LoadPoliticalParties();