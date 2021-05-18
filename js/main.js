
// Importamos todas las variables y funciones del archivo global
// que vamos a necesitar en este script

import {getApiTrendingGifs, printSearchGifs, printCardsGif, card0, card1, card2} from './globalData.js';

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


let gifsTrendingContainer = document.getElementById('gifdTrendingContainer')

card0.addEventListener('mouseover', ()=> {
    hoverCardText0.style.visibility = "visible";
    hoverIconsCard0.style.visibility = "visible";
});
card0.addEventListener('mouseout', ()=> {
    hoverCardText0.style.visibility = "hidden";
    hoverIconsCard0.style.visibility = "hidden";
});

card1.addEventListener('mouseover', ()=> {
    hoverCardText1.style.visibility = "visible";
    hoverIconsCard1.style.visibility = "visible";
});
card1.addEventListener('mouseout', ()=> {
    hoverCardText1.style.visibility = "hidden";
    hoverIconsCard1.style.visibility = "hidden";
});

card2.addEventListener('mouseover', ()=> {
    hoverCardText2.style.visibility = "visible";
    hoverIconsCard2.style.visibility = "visible";
});
card2.addEventListener('mouseout', ()=> {
    hoverCardText2.style.visibility = "hidden";
    hoverIconsCard2.style.visibility = "hidden";
});


let favGifs = [];

gifsTrendingContainer.addEventListener('click', (event)=> {
    let elementMouseIsOver = document.elementFromPoint(X, Y);
    let iconId = elementMouseIsOver.id
    let iconIdNumber = elementMouseIsOver.id[elementMouseIsOver.id.length-1]
    if (iconId == `iconFav${iconIdNumber}`) {
        console.log('click sobre Icono fav')
        document.getElementById(`${iconId}`).classList.toggle('fas')
        favGifs.push(trendingGifs[iconIdNumber]);
        console.log(trendingGifs[parseInt(iconIdNumber)]);
        trendingGifs.then((gif)=> favGifs.push(gif[iconIdNumber]))
        console.log(favGifs)

    } else if (iconId == `iconDow${iconIdNumber}`) {
        console.log('click sobre Icono Download Gif')

    } else if (iconId == `iconMax${iconIdNumber}`) {
        console.log('click sobre Icono Maximizar gif')

    }
});

// Busqueda de gifs mediante Barra
let titleSearch;

searchBar.addEventListener('focus', function () {
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // Eliminamos la lista del autocomletar
            try {
                ulAutocomplete.remove();                
                searchBar.blur();

                titleSearch = document.getElementById('titleSearch');
            
                searchResult.innerHTML = '';
                let word = searchBar.value;

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

// searchResult.addEventListener('mouseover', (event)=> {
//     let x = event.clientX
//     let y = event.clientY
//     let elementMouseIsOver = document.elementFromPoint(x, y);
//     console.log(elementMouseIsOver);
// })
