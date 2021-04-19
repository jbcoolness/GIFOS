// Efecto de boton menu hamburguesa
const iconBurger = document.getElementById('iconBurger');
const menu = document.getElementById('menu');

// Arrow function que me cambia el icon Burger 
// de pendiendo si está abier o cerrado
const iconBurgerToggle= () =>{
    iconBurger.classList.toggle('burger-close');
}

// proceso que escucha el evento click sobre el icono burger para
// cambiarle el icono abierto o cerrado
iconBurger.addEventListener('click', function() {
    iconBurgerToggle();
})

// Efecto mouseover y mouseout para boton crear del menu
const btnCreate = document.getElementById("btn-create");
btnCreate.addEventListener('mouseover', function () {
    btnCreate.src= "./assets/img/CTA-crear-gifo-hover.svg";
})

btnCreate.addEventListener('mouseout', function () {
    btnCreate.src= "./assets/img/button-crear-gifo.svg";
})

// Efecto de desplazamiento del menú
const items = document.getElementsByClassName('items')[0];
const menuBurger = document.getElementById('iconBurger');

// Funcion que agrega la clase con una transicion para que
// aparezca el menú
const toggleMenu = ()=> {
    items.classList.toggle('items2')
    items.style.transition = "transform 0.3s ease-in-out";
}
// agregamos la clase con el eveto click
menuBurger.addEventListener('click', function() {
    toggleMenu();    
});

// window.addEventListener('resize', function(){
//     if (screen.width > 769) {
//         iconBurgerToggle();
//         toggleMenu();
//         items.style.transition = 'none';
//     }
// })

// <<------------------------ **** ------------------------>>
// API trending

import {urlTrneding, getApi, printSearchGifs} from './globalData.js';
const trending = getApi(urlTrneding);

// En el evento load de la app mediante la funcion getApi no conectamos
// a la api y recibimos las trending y mosytramos dentro de un div
let divTrending;
window.addEventListener('load', function(){
    trending.then(trending =>{        
        let [tren1, tren2, tren3, tren4, tren5] = trending;
        divTrending = document.getElementById('divTrending');
        let pTending = document.createElement('p');
        pTending.innerHTML = (`<span>${tren1}</span>, <span>${tren2}</span>, <span>${tren3}</span>, <span>${tren4}</span>, <span>${tren5}</span>`);
        divTrending.appendChild(pTending);
        
        pTending.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                text = target.textContent || target.innerText; 
                if (text.indexOf(',') == -1) {
                    searchResult.innerHTML = '';
                    console.log(text);
                    let word = text;
                    let offset = 12;
                    let urlSearchGifs = (`api.giphy.com/v1/gifs/search?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${word}&limit=12&offset=${offset}`);
                
                    console.log(word);            

                    // Variable que almacena el resultado de la API con la consulta
                    let searchGifs = getApi(urlSearchGifs);
                    titleSearch.innerHTML = `<h3>${word}</h3>`

                    // Recibe la respuesta con 12 gif y los muestra en el div
                    printSearchGifs(searchGifs);
                }
        }, false);
    }).catch(error => {
        console.log(error)
    });
});

// 

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

    window.addEventListener('keyup', function (event) {
        // Creamos la lista que nos mostrará las palabras de autocompletado
                
        divAutocomplete.classList.remove('list-autocomplete');
        divAutocomplete.classList.add('list-autocomplete-focus');
        ulAutocomplete.style.display='block';
        searchBar.classList.remove('searchBar');
        searchBar.classList.add('searchBar-focus');

        let letter = searchBar.value;        
        let urlAutocomplete = (`api.giphy.com/v1/gifs/search/tags?api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC&q=${letter}`)
        printWords(getApi(urlAutocomplete));
    })
});

// cambio que suceden al quitar el focus de la barra de busqueda
// let wordsLi = document.getElementsByClassName('first-li')[0];
searchBar.addEventListener('blur', function () {
    
    ulAutocomplete.remove();
    divAutocomplete.classList.remove('list-autocomplete-focus');
    divAutocomplete.classList.add('list-autocomplete');
    //divAutocomplete.classList.toggle('list-autocomplete');
    searchBar.classList.add('searchBar');
    //ulAutocomplete.style.display='none';
})

// Funcion encargada de crear los elementos ul de la lista de
// opciones de autocomplete
function printWords(getWords) {    
    getWords.then(words => {
        ulAutocomplete.innerHTML = '';
        words.forEach (word => {
            ulAutocomplete.innerHTML += `
            <li><i class="fas fa-search"></i> ${word['name']}</li>
            `
            console.log(word['name'])
            ulAutocomplete.children[0].classList.add('first-li');                        
        });
    });
};
