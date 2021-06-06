
// Importamos todas las variables y funciones del archivo global
// que vamos a necesitar en este script

import {printSearchGifs} from './globalData.js';

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
