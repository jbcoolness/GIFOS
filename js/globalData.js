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
// div donde se crearan las cards con los gifs
const cardsContainer = document.getElementById('cardsContainer')
// const imgCard1 = document.getElementById('imgCard1');
// const imgCard2 = document.getElementById('imgCard2');
// const imgCard3 = document.getElementById('imgCard3');

const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');

function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);
        card1.style.backgroundImage = `url(${gifs[indexGif].images.fixed_height.url})`;
        card2.style.backgroundImage = `url(${gifs[indexGif+1].images.fixed_height.url})`;
        card3.style.backgroundImage = `url(${gifs[indexGif+2].images.fixed_height.url})`;
        
        // imgCard1.setAttribute('src', gifs[indexGif].images.fixed_height.url);
        // imgCard2.setAttribute('src', gifs[indexGif+1].images.fixed_height.url);
        // imgCard3.setAttribute('src', gifs[indexGif+2].images.fixed_height.url);
    })
};

// card1.addEventListener('mouseover', function() {
//     card1.style.backgroundColor = '#572EE5';
//     card1.style.opacity = '0.6';
// })

// card3.addEventListener('mouseover', function() {
//     card3.style.backgroundColor = '#572EE5';
//     card3.style.opacity = '0.6';
// })

// Funcion que recibe la variable con la respuesta de 12 gif y 
// los muestra en pantalla, creando los elementos necesarios
function printSearchGifs(searchGifs) {
    const divShowMore = document.getElementById('divShowMore');
    divShowMore.style.display=('none')
    divShowMore.classList.add('div-show-more');
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            // Crear div donde se muestra gif
            const divResult = document.createElement('div');

            // Agrega clase a div
            divResult.classList.add('searchResult__cards');
            
            // agrega background con gif
            divResult.style.backgroundImage= `url(${gif.images.fixed_height.url})`;
            
            // agrega div con gif en el div de resultado de busqueda
            searchResult.appendChild(divResult);
            
            // divResult.appendChild(imgResult);
            // imgResult.setAttribute('src', gif.images.fixed_height.url);
            
            console.log(gif.images.fixed_height.url)
        });
    });
    divShowMore.style.display=('block')
};

export {getApiTrendingTerms, getApiTrendingGifs, printCardsGif, printSearchGifs};