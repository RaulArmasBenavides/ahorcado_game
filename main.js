//referencia : https://www.youtube.com/watch?v=mn07nxUXoPA
let nro_intentos = 0;
const MAX_ATTEMPTS= 7;

String.prototype.replaceAt = function (index,character) 
{
    return this.substr(0,index) + character + this.substr(index+character.length);
}

//arreglos partidos políticos 
const palabras = ['APRA','PPC','ACCION POPULAR','FREPAP','FUERZAPOPULAR','PARTIDO MORADO']

const palabra = palabras[Math.floor(Math.random()*palabras.length)]
let exito = false;
let fin = false;
let posicion = 0;
let palabraOculta = palabra.replace(/./g,"_ ");
console.log(palabra + "  "+ palabraOculta);


document.querySelector('#output').innerHTML = palabraOculta;



//validación de mayusculas 
var lock = (e, max, arr = e.value.match(/[A-Z]/g) || []) => arr.length === max;

 
document.getElementById("calcular").onclick = () => { 
    if(lock(document.getElementById("letra"), 1)) console.log("Correcto");
    else alert("Debe ingresar una letra en mayúscula");
  };

document.querySelector('#calcular').addEventListener('click',()=>
{
    let ok = false;
    exito=false;
    
    let letra = document.querySelector('#letra').value;
    console.log(letra);
    for(const i in palabra)
    {
        console.log('evlauando ' + palabra[i]);
        if(letra==palabra[i])
        {
            palabraOculta = palabraOculta.replaceAt(i*2,letra);
            ok = true;

            if(!palabraOculta.includes('_'))
            {
                fin = true;
            }
        }
    }

    if(ok == false)
    {   nro_intentos++;
        console.log('error' + nro_intentos);
        CambiarImagen(nro_intentos);
        if(nro_intentos >= MAX_ATTEMPTS)
        {
           document.querySelector('#output').innerHTML = palabra;
           alert("PERDISTE EL JUEGO");
           ProtegerBotones();
        }
    }
    else
    {
            document.querySelector('#output').innerHTML = palabraOculta;
            if (fin ==true){
             ProtegerBotones();
            //alert('GANASTE');
            }
    }
    });



function CambiarImagen(id_foto)
{

    if(id_foto<MAX_ATTEMPTS)
    {
        let char_raiz = "./imgs/Ahorcado-";
        var imagen = document.getElementById("foto");
        char_raiz = char_raiz.concat(id_foto);
        imagen.src = char_raiz.concat(".png");
        //alert('la imagen sera' + imagen.src);
    }

}


const ProtegerBotones = () =>{
    let boton = document.querySelector('#calcular');
    boton.disabled = true;
}



