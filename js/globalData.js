// URL o endpoints de peticiones a Giphy
import { CONFIG_DEV } from './config.js';

// Para pedir las palabras o tags tendencias
async function getApiTrendingTerms() {
    try {        
        let requestGifs = await fetch(`${CONFIG_DEV.URL_TRENDING_TERMS}?${CONFIG_DEV.API_KEY}`);
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
        let requestGifs = await fetch(`${CONFIG_DEV.URL_TRENDING_GIFS}?${CONFIG_DEV.API_KEY}&limit=30`);
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
const userName1 = document.getElementById('pUserName1')
const title1 = document.getElementById('pTitle1')

const card2 = document.getElementById('card2');
const userName2 = document.getElementById('pUserName2')
const title2 = document.getElementById('pTitle2')

const card3 = document.getElementById('card3');
const userName3 = document.getElementById('pUserName3')
const title3 = document.getElementById('pTitle3')

function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);
        // Crear div donde se muestra gif

        card1.style.backgroundImage = `url(${gifs[indexGif].images.fixed_height.url})`;
        userName1.textContent = `${gifs[indexGif].username}`;
        title1.textContent = `${gifs[indexGif].title}`;

        card2.style.backgroundImage = `url(${gifs[indexGif+1].images.fixed_height.url})`;
        userName2.textContent = `${gifs[indexGif+1].username}`;
        title2.textContent = `${gifs[indexGif+1].title}`;

        card3.style.backgroundImage = `url(${gifs[indexGif+2].images.fixed_height.url})`;
        userName3.textContent = `${gifs[indexGif+2].username}`;
        title3.textContent = `${gifs[indexGif+2].title}`;
    })
};


// Funcion que recibe la variable con la respuesta de 12 gif y 
// los muestra en pantalla, creando los elementos necesarios
function printSearchGifs(searchGifs) {
    const divShowMore = document.getElementById('divShowMore');
    divShowMore.style.display=('none')
    divShowMore.classList.add('div-show-more');
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            // Crear div donde se muestra gif
            const text = `
            <div class="hoverCardText" id="hoverCard">
                <p>${gif.username}</p>
                <p class="hoverCardText--title">${gif.title}</p>
            </div>
            <div class= "hoverIconsCard" id="hoverIconsCard">
                <img class="hoverCardIconFav" src="/assets/img/icon-fav.svg" id="iconFav" alt="Icono de favoritos">
                <img class="hoverCardIconDow" src="/assets/img/icon-download.svg" id="iconDow" alt="Icono de descarga">
                <img class="hoverCardIconMax" src="/assets/img/icon-max-normal.svg" id="iconMax" alt="Icono de descarga">
            </div>
            `;
            const divResult = document.createElement('div');

            // Agrega clase a div
            divResult.classList.add('searchResult__cards');
            divResult.setAttribute('id', 'searchCard');
            
            // agrega background con gif
            divResult.style.backgroundImage= `url(${gif.images.fixed_height.url})`;
            divResult.insertAdjacentHTML('afterbegin', text);
            
            // agrega div con gif en el div de resultado de busqueda
            searchResult.appendChild(divResult);
            
            console.log(gif.images.fixed_height.url)
        });
    });
    divShowMore.style.display=('block')
};

export {getApiTrendingTerms, getApiTrendingGifs, printCardsGif, printSearchGifs};