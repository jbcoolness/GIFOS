// URL o endpoints de peticiones a Giphy

// Para pedir las palabras o tags tendencias
async function getApiTrendingTerms() {
    try {        
        let requestGifs = await fetch(`http://api.giphy.com/v1/trending/searches?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC`);
        let response = await requestGifs.json();
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

// Para pedir los gifs tendencias, limitados a 30
async function getApiTrendingGifs() {
    try {        
        let requestGifs = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&limit=30`);
        let response = await requestGifs.json();
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};


// <<------------------------*------------------------>>


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
    try {
        divShowMore.style.display=('none')
    } catch (error) {
        console.log('aun no existe' + error)
    }
    const divShowMore = document.getElementById('divShowMore');
    divShowMore.classList.add('div-show-more');
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            const divResult = document.createElement('div');
            const imgResult =  document.createElement('img');            
            divResult.classList.add('searchResult__cards');
            imgResult.classList.add('searchResult__img');
            searchResult.appendChild(divResult);
            divResult.appendChild(imgResult);
            imgResult.setAttribute('src', gif.images.fixed_height.url);
            console.log(gif.images.fixed_height.url)
        });
    });
    divShowMore.style.display=('block')
};

export {getApiTrendingTerms, getApiTrendingGifs, printCardsGif, printSearchGifs};