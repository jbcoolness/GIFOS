// URL o ends points de peticiones a Giphy

// Para pedir las palabras o tags tendencias
const urlTrneding = (`api.giphy.com/v1/trending/searches?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC`);

// Para pedir los gifs tendencias, limitados a 30
const urlGifsTrneding = (`api.giphy.com/v1/gifs/trending?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&limit=30`)

// Para pedir una busqueda validada por la variable 
// {word} y la cantidas por {limite}
// let word;
// let offset;
// let urlSearchGifs = (`api.giphy.com/v1/gifs/search?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${word}&limit=12&offset=${offset}`);

// Para pedir el autocompletado de la busqueda mediante la variable
// word que se le vaya tipeando
// let letter;
// let urlAutocomplete = (`api.giphy.com/v1/gifs/search/tags?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${letter}`)

export {urlTrneding, urlGifsTrneding};

// <<------------------------*------------------------>>

// Funcion general que recibe una url o end point de la API giphy
// configurado para esta aplicacion, trayendo el json y retornandolo
// como dato para su tratamiento
async function getApi(url) {
    try {        
        let requestGifs = await fetch(`http://${url}`);
        let response = await requestGifs.json();
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

// Funcion recibe la variable con gifs y muestra 
// los 3 gifs en el slide del trending
function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);
        imgCard1.setAttribute('src', gifs[indexGif].images.fixed_height.url);
        imgCard2.setAttribute('src', gifs[indexGif+1].images.fixed_height.url);
        imgCard3.setAttribute('src', gifs[indexGif+2].images.fixed_height.url);
    })
};

// Funcion que recibe la variable con la respuesta de 12 gif y 
// los muestra en pantalla, creando los elementos necesarios
function printSearchGifs(searchGifs) {
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            let divResult = document.createElement('div');
            let imgResult =  document.createElement('img');
            divResult.classList.add('div-result');
            imgResult.classList.add('img-Result');
            searchResult.appendChild(divResult);
            divResult.appendChild(imgResult);
            imgResult.setAttribute('src', gif.images.fixed_height.url);
            console.log(gif.images.fixed_height.url)
        });
    });    
};

export {getApi, printCardsGif, printSearchGifs};