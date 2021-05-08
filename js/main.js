
// Importamos todas las variables y funciones del archivo global
// que vamos a necesitar en este script

import {getApiTrendingGifs, printSearchGifs, printCardsGif} from './globalData.js';

// Funcion para pedir una busqueda validada por la variable 
// {word} y la cantidad de resultados por {limite}. La variable 
// offset es para interactuar y poder pedir mas imagenes
let offset = 0;
async function getApiSearchgGifs(word, offset) {
    try {        
        let requestGifs = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${word}&limit=12&offset=${offset}`);
        let response = await requestGifs.json();
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

// variable que recibe los 30 gifs que llegan de la API
let trendingGifs = getApiTrendingGifs();

// flecha derecha e izquierda con el que pasaran las cards con los gifs
const rightRow = document.getElementById('imgRightRow');
const leftRow = document.getElementById('imgLeftRow');


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

// const iconFav = document.getElementById('iconFav');
// const iconDow = document.getElementById('iconDow');
// const iconMax = document.getElementById('iconMax');

const card1 = document.getElementById('hoverCard1');
const card2 = document.getElementById('hoverCard2');
const card3 = document.getElementById('hoverCard2');
const hoverCard = document.getElementById('hoverCard');
const hoverIconsCard = document.getElementById('hoverIconsCard');

card1.addEventListener('mouseover', ()=> {
    hoverCard.style.display = "block";
    hoverIconsCard.display = "block";
    // iconDow.style.display = "block";
    // iconMax.style.display = "block";
});
card1.addEventListener('mouseout', ()=> {
    hoverCard.style.display = "none";
    hoverIconsCard.style.display = "none";
    // iconDow.style.display = "none";
    // iconMax.style.display = "none";
});
// card2.addEventListener('mouseover', ()=> {
//     hoverCard.style.display = "block";
//     iconFav.style.display = "block";
//     iconDow.style.display = "block";
//     iconMax.style.display = "block";
// });
// card2.addEventListener('mouseout', ()=> {
//     hoverCard.style.display = "none";
//     iconFav.style.display = "none";
//     iconDow.style.display = "none";
//     iconMax.style.display = "none";
// });
// card3.addEventListener('mouseover', ()=> {
//     hoverCard.style.display = "block";
//     iconFav.style.display = "block";
//     iconDow.style.display = "block";
//     iconMax.style.display = "block";
// });
// card3.addEventListener('mouseout', ()=> {
//     hoverCard.style.display = "none";
//     iconFav.style.display = "none";
//     iconDow.style.display = "none";
//     iconMax.style.display = "none";
// });

// Busqueda de gifs mediante Barra
// const searchResult = document.getElementById('searchResult');
let titleSearch;

searchBar.addEventListener('focus', function () {
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // Eliminamos la lista del autocomletar
            try {
                ulAutocomplete.remove();                
                searchBar.blur();

                titleSearch = document.getElementById('titleSearch');
                // let wordSearch = document.createElement('h3')
                // titleSearch.appendChild(wordSearch)
            
                let searchResult = document.getElementById('searchResult');
                searchResult.innerHTML = '';
                let word = searchBar.value;
                
                // let urlSearchGifs = (`api.giphy.com/v1/gifs/search?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${word}&limit=12&offset=${offset}`);
                
                console.log(word);          

                // Variable que almacena el resultado de la API con la consulta
                let searchGifs = getApiSearchgGifs(word, offset);
                titleSearch.innerHTML = `<h3 class="searchText__title" id="h3TitleSearch">${word}</h3>`

                // Recibe la respuesta con 12 gif y los muestra en el div
                printSearchGifs(searchGifs);
                offset = offset + 12;
                
            } catch (error) {
                console.log(error + ' porque ya fue eliminada pero hagale')
            };
        };
    });
});

let divShowMore = document.getElementById('divShowMore');
divShowMore.addEventListener('click', function () {
    const h3TitleSearch = document.getElementById('h3TitleSearch');
    let word = h3TitleSearch.textContent;
    offset = offset + 12;
    
    // Variable que almacena el resultado de la API con la consulta
    let searchGifs = getApiSearchgGifs(word, offset)

    // Recibe la respuesta con 12 gif y los muestra en el div
    printSearchGifs(searchGifs);
});

