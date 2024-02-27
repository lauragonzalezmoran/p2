

//funcionalidad 1: quiero que al cargar la página te lleve directamente a la sección de Inicio
document.addEventListener("DOMContentLoaded", function(event) {
    // Espera a que el contenido de la página se haya cargado completamente
    // Luego, cambia la URL agregando '#inicio'
    window.location.hash = "#inicio";
});


const nasaApiKey = 'yqQO5C2Bal5AhiRx9Yp3nWa8ZMs9mAlS54icgRRL'; 
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`; 

const multimedia_APOD = document.getElementById('c_multimedia'); 
const titulo_APOD = document.getElementById('titulo_APOD'); 
const fecha_APOD = document.getElementById('fecha_APOD'); 
const descripcion_APOD = document.getElementById('descripcion_APOD'); 

const issApiUrl = `https://api.wheretheiss.at/v1/satellites/25544`; 
const latitude_iss = document.getElementById('latitude_iss'); 
const longitude_iss = document.getElementById('longitude_iss'); 
const altitude_iss = document.getElementById('altitude_iss'); 
const velocity_iss = document.getElementById('velocity_iss'); 
const visibility_iss =  document.getElementById('visibility_iss'); 
const iss_multimedia = document.getElementById('iss_multimedia'); 

mostrarTitulo = function(titulo)
{
    titulo_APOD.textContent = titulo || 'El título no ha sido encontrado'; 
}

mostrarFecha = function(fecha)
{
    fecha_APOD.textContent = fecha || 'La fecha no ha sido encontrada'; 
}
mostrarDescripcion = function(descripcion)
{
    descripcion_APOD.textContent = descripcion || 'La descripción no ha sido encontrada'; 
}

mostrarMultimedia = function({media_type,  url}) // function declarations are hoisted
{
    if (media_type == 'video')
    {
        multimedia_APOD.innerHTML =`<iframe class="embed-responsive-item" src="${url}"></iframe>`; 
      
    }
    else
    {
        multimedia_APOD.innerHTML = `<img src="${url}" class="img-fluid" alt="${url}"></img>`; 
    }
}
mostrarTodo = function(json)
{
    mostrarTitulo(json && json.title); 
    mostrarFecha(json && json.date); 
    mostrarDescripcion(json && json.explanation); 
    mostrarMultimedia(json); 
}

// a partir de aqui es lo del iss
const mostrarLatitud = function(latitude)
{
    latitude_iss.textContent =`Latitude: ${latitude}`;
}

const mostrarLongitud = function(longitude)
{
    longitude_iss.textContent = `Longitude: ${longitude}`;
}

const mostrarAltitud = function({altitude, units})
{
    altitude_iss.textContent =`Altitude: ${altitude} ${units}`;
}
const mostrarVelocidad = function({velocity, units})
{
    velocity_iss.textContent =`Current Velocity: ${velocity} ${units}`;
}

const mostrarVisibility = function(visibility)
{
    visibility_iss.textContent =`Visibility: ${visibility}`;
}
 /*const mostrarMapa = function({latitude, longitude})
 {
    //var linkMapa = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`; 
    iss_multimedia.innerHTML = `<iframe class="embed-responsive-item" src="${`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`}"></iframe>`; 
 }*/




const mostrarISS = function(json)
{
    mostrarLatitud( json && json.latitude); 
    mostrarLongitud(json && json.longitude); 
    mostrarAltitud(json );
    mostrarVelocidad(json); 
    mostrarVisibility(json && json.visibility); 

}

const getAPOD = function()
{
    fetch(nasaApiUrl)
    .then( respuesta =>
    {
        if (respuesta.ok)
        {
            console.log("todo ok en el paso 1", respuesta.ok); 
            return respuesta.json();   
        }
        else
        {
            console.log("todo NO ok en el paso 1", respuesta.ok); 
            throw respuesta.status; 
        }
    }).then(json =>
        {
            console.log("JSON elemento", json.hdurl); 
            //mostrarMultimedia(json && json.url); //verificamos que el json no sea nulo para que no nos de error
            mostrarTodo(json); 
            

        }).catch(error =>
            {
                console.error('Error Inesperado', error); //aqui podria ser una funcion que muestre que ha habido un error en la ui
            }); 
}

const getISS = function() //he intentado hacerlo por el otro método pero me salían errores que no he conseguido arreglar, dejo el código abajo: 
{
    fetch(issApiUrl)
    .then( respuesta =>
    {
        if (respuesta.ok)
        {
            console.log("todo ok en el paso 1 del iss", respuesta.ok); 
            return respuesta.json();   
        }
        else
        {
            console.log("todo NO ok en el paso 1 del iss", respuesta.ok); 
            throw respuesta.status; 
        }
    }).then(json =>
        {
            console.log("JSON elemento", json.hdurl); 
            //mostrarMultimedia(json && json.url); //verificamos que el json no sea nulo para que no nos de error
            mostrarISS(json); 
            

        }).catch(error =>
            {
                console.error('Error Inesperado', error); //aqui podria ser una funcion que muestre que ha habido un error en la ui
            }); 
}

/*
const getISS =  async function()
{
    try{
        const respuesta = await fetch(issApiUrl); 
        if (respuesta.ok)
        {
            const objeto = await respuesta.json(); 
            console.log('Por ahora OK', objeto); 
            mostrarISS(objeto); 
            return objeto; 
        }
        else
        {
            console.log('Respuesta fallida', respuesta.status); 
            throw respuesta; 
        }

    }
    catch (error){
        console.error('Ha habido un error', error); 
        throw error; 
    }

    
}

const jsonIss = await getISS(); 

*/

