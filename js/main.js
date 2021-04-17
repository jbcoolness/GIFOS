
import {getApi} from './globalData.js'

let urlGifsTrneding = (`api.giphy.com/v1/gifs/trending?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&limit=30`)

// variable que recibe los 30 gifs que llegan de la API
let trendingGifs = getApi(urlGifsTrneding);

// div donde se crearan las cards con los gifs
const cardsContainer = document.getElementById('cardsContainer')
const imgCard1 = document.getElementById('imgCard1');
const imgCard2 = document.getElementById('imgCard2');
const imgCard3 = document.getElementById('imgCard3');

// flecha derecha e izquierda con el que pasaran las cards con los gifs
const rightRow = document.getElementById('imgRightRow');
const leftRow = document.getElementById('imgLeftRow');

import {printCardsGif} from './globalData.js';
// Variable para iterar e ir cambiando los gif del slide
let indexGif;
window.addEventListener('load', function () {
    indexGif = 0;
    printCardsGif(trendingGifs, indexGif)
});

// Efecto mouse hover y mouse out sobre flechas de trending
rightRow.addEventListener('mouseover', function () {
    rightRow.setAttribute('src', "/assets/img/Button-Slider-right-hover.svg")
});
rightRow.addEventListener('mouseout', function () {
    rightRow.setAttribute('src', "/assets/img/Button-Slider-right.svg")
});

leftRow.addEventListener('mouseover', function () {
    leftRow.setAttribute('src', "/assets/img/Button-Slider-left-hover.svg")
});
leftRow.addEventListener('mouseout', function () {
    leftRow.setAttribute('src', "/assets/img/Button-Slider-left.svg")
});

// mover las cards
rightRow.addEventListener('click', function () {
    if (indexGif < 30) {
        indexGif = indexGif + 1;
        printCardsGif(trendingGifs, indexGif);
        console.log(indexGif);
    }else {
        console.log('Limite gif trending');
    }    
});

leftRow.addEventListener('click', function () {
    if (indexGif > 0) {
        indexGif = indexGif - 1;
        printCardsGif(trendingGifs, indexGif);
        console.log(indexGif);
    }else {
        console.log('Limite gif trending');
    }    
});


import {printSearchGifs} from './globalData.js'
// Busqueda de gifs mediante Barra
const searchResult = document.getElementById('searchResult');
let imgShowMore;

searchBar.addEventListener('focus', function () {
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let word = searchBar.value;
            console.log(word);
            let offset = 12;
            let urlSearchGifs = (`api.giphy.com/v1/gifs/search?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${word}&limit=12&offset=${offset}`);
            
            // Variable que almacena el resultado de la API con la consulta
            let searchGifs = getApi(urlSearchGifs);

            // Recibe la respuesta con 12 gif y los muestra en el div
            printSearchGifs(searchGifs)
        }
    });
});

