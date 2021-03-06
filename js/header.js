// Importamos todas las variables y funciones del archivo global
// que vamos a necesitar en este script
import {getApiTrendingTerms, printSearchGifs} from './globalData.js';
import {darkModeCheck} from './darkMode.js';

// Funcion lanza la apli que autocompleta el texto 
// de busqueda de gif
async function getApiAutocomplete(letter) {
    try {        
        let requestGifs = await fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${letter}`);
        let response = await requestGifs.json();
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

// Funcion lanza la API de busqueda mediante una palabra
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



// Efecto de boton menu hamburguesa
const iconBurger = document.getElementById('iconBurger');
const menu = document.getElementById('menu');

// Arrow function que me cambia el icon Burger 
// de pendiendo si está abier o cerrado
const iconBurgerToggle= () =>{
    iconBurger.classList.toggle('menuburger__icon--x');
}

// proceso que escucha el evento click sobre el icono burger para
// cambiarle el icono abierto o cerrado
iconBurger.addEventListener('click', function() {
    iconBurgerToggle();
})

// Efecto mouseover y mouseout para boton crear del menu
const btnCreate = document.getElementById("btnCreate");
btnCreate.addEventListener('mouseover', function () {
    btnCreate.src= "./assets/img/CTA-crear-gifo-hover.svg";
})

btnCreate.addEventListener('mouseout', function () {
    btnCreate.src= "./assets/img/button-crear-gifo.svg";
})

// Efecto de desplazamiento del menú
const menulist = document.getElementsByClassName('menulist')[0];
const menuBurger = document.getElementById('iconBurger');

// Funcion que agrega la clase con una transicion para que
// aparezca el menú
const toggleMenu = ()=> {
    menulist.classList.toggle('menulist2')
    menulist.style.transition = "transform 0.3s ease-in-out";
}
// agregamos la clase con el eveto click
menuBurger.addEventListener('click', function() {
    toggleMenu();    
});


// <<------------------------ **** ------------------------>>
// API trending
const trendingTerms = getApiTrendingTerms();

// En el evento load de la app nos conectamos a la api y recibimos  
// las trending y mosytramos dentro de un div
let divTrending;
let offset = 0;
window.addEventListener('load', function(){
    trendingTerms.then(trendingTerms =>{        
        let [tren1, tren2, tren3, tren4, tren5] = trendingTerms;
        divTrending = document.getElementById('divTrending');
        let pTending = document.createElement('p');
        pTending.classList.add('trending__terms');
        pTending.innerHTML = (`<span>${tren1} </span>, <span>${tren2}</span>, <span>${tren3}</span>, <span>${tren4}</span>, <span>${tren5}</span>`);
        divTrending.appendChild(pTending);
        
        pTending.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                text = target.textContent || target.innerText; 
                if (text.indexOf(',') == -1) {
                    searchResult.innerHTML = '';
                    console.log(text);
                    let word = text;
                    console.log(word);

                    // Variable que almacena el resultado de la API con la consulta
                    let searchGifs = getApiSearchgGifs(word, offset);
                    titleSearch.innerHTML = `<h3 class="searchText__title" id="h3TitleSearch">${word}</h3>`

                    // Recibe la respuesta con 12 gif y los muestra en el div
                    printSearchGifs(searchGifs);
                    offset = offset + 12;
                }
        }, false);
    }).catch(error => {
        console.log(error)
    });
});

// Declaramos los elementos que vamos a usar y acceder en el HTML
// const urlAutocolplete = 'api.giphy.com/v1/gifs/search/tags';
let searchBar = document.getElementById('searchBar');
let divAutocomplete = document.getElementById('divAutocomplete');
let elementUlAutocomplete;
let ulAutocomplete;

// import {urlAutocomplete, letter} from './globalData.js' ;
// Funciones que escucharan los eventos focus sobre la barra de busqueda
// Cuando el ususario tipe su busqueda se irá llamando la API para
// mostar e ir autocompletando con las opciones respondidas

searchBar.addEventListener('focus', function () {    
    elementUlAutocomplete = document.createElement('ul');
    elementUlAutocomplete.setAttribute('id', 'ulAutocomplete');
    // luego de crearlo lo agregamos al HTML dentro del divAutocomplete
    divAutocomplete.appendChild(elementUlAutocomplete);
    // Lo seleccionamos mediante su ID
    ulAutocomplete = document.getElementById('ulAutocomplete');
    ulAutocomplete.classList.add('listAutocomplete__ul');
    const iconSearch = document.getElementById('iconSearch')

    window.addEventListener('keyup', function (event) {
        // Creamos la lista que nos mostrará las palabras de autocompletado

        divAutocomplete.classList.add('listAutocomplete--focus');
        ulAutocomplete.style.display='block';
        // searchBar.classList.remove('searchBar');
        searchBar.classList.add('listAutocomplete__searchBar--focus');

        let letter = searchBar.value;        
        printWords(getApiAutocomplete(letter));
        
        // Cambiamos el icono de busqueda por y validamos el click
        darkModeCheck == true ? iconSearch.src = "./assets/img/close-modo-noct.svg" : iconSearch.src = "./assets/img/close.svg"
        iconSearch.addEventListener('click', function () {
            ulAutocomplete.remove();
            document.getElementById('searchBar').value='';
            darkModeCheck == true ? iconSearch.src = "./assets/img/icon-search-mod-noc.svg" : iconSearch.src = "./assets/img/icon-search.svg";
        })
    });
    window.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.matches("#liIconSearch")) {
            searchResult.innerHTML = '';
            console.log(e.target.textContent);
            let word = e.target.textContent;
            console.log(word);

            // Variable que almacena el resultado de la API con la consulta
            let searchGifs = getApiSearchgGifs(word, offset);
            titleSearch.innerHTML = `<h3 class="searchText__title" id="h3TitleSearch">${word}</h3>`

            // Recibe la respuesta con 12 gif y los muestra en el div
            printSearchGifs(searchGifs);
            // offset = offset + 12;
            ulAutocomplete.remove();
            document.getElementById('searchBar').value= `${word}`;
            darkModeCheck == true ? iconSearch.src = "./assets/img/icon-search-mod-noc.svg" : iconSearch.src = "./assets/img/icon-search.svg";
            searchBar.blur();
        // }
        } else if ((!e.target.matches("#iconSearch")) && (!e.target.matches("#ulAutocomplete")) && (!e.target.matches("#searchBar"))) {
            ulAutocomplete.remove();
        }
    });
});

// cambios que suceden al quitar el focus de la barra de busqueda
// searchBar.addEventListener('blur', function () {    
//     ulAutocomplete.remove();
//     divAutocomplete.classList.remove('listAutocomplete--focus');
//     searchBar.classList.remove('listAutocomplete__searchBar--focus');
// });


// Funcion encargada de crear los elementos ul de la lista de
// opciones de autocomplete
function printWords(getWords) {    
    getWords.then(words => {
        ulAutocomplete.innerHTML = '';
        words.forEach (word => {
            ulAutocomplete.innerHTML += `
            <li class="li__wordSearch" id="liIconSearch"><i class="fas fa-search li__iconSearch"></i> ${word['name']}</li>
            `
            console.log(word['name'])
            ulAutocomplete.children[0].classList.add('listAutocomplete__ul--firstli');
        });
    });
};
