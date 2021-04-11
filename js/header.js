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

// Funcion que me agrega la clase con una transicion para que
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

// API trending
const apiKey = 'api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC';
const urlTrending = 'api.giphy.com/v1/trending/searches';
const fetchTrending = fetch(`http://${urlTrending}?${apiKey}`).then(response => response.json());

// En el evento load de la app hacemos una promesa que se conecta a
// la api y recibe las trending y las imprime dentro de un div

window.addEventListener('load', function(){
    fetchTrending.then(trending =>{
        let [tren1, tren2, tren3, tren4, tren5] = trending.data;
        //console.log(tren1, tren2, tren3, tren4, tren5)
        let divTrending = document.getElementById('divTrending');
        let pTending = document.createElement('p');
        pTending.textContent = (`${tren1}, ${tren2}, ${tren3}, ${tren4}, ${tren5}`);
        divTrending.appendChild(pTending);
    }).catch(error => { 
        console.log(error);
        let divTrending = document.getElementById('divTrending');
        let pTending = document.createElement('p');
        pTending.textContent = (error);
        divTrending.appendChild(pTending);
    });
});


// Declaramos los elementos que vamos a usar y acceder en el HTML
const urlAutocolplete = 'api.giphy.com/v1/gifs/search/tags';
let searchBar = document.getElementById('searchBar');
let divAutocomplete = document.getElementById('divAutocomplete');
let ulAutocomplete = document.getElementById('ulAutocomplete')

// Funciones que escucharan los eventos focus sobre la barra de busqueda
// y cuando el ususario digite su busqueda para generar los cambios
// necesarios y autocompletar con las opciones
searchBar.addEventListener('focus', function () {    
    window.addEventListener('keyup', function (event) {
        divAutocomplete.classList.add('list-autocomplete-focus');
        ulAutocomplete.style.display='block';
        searchBar.classList.remove('searchBar');
        searchBar.classList.add('searchBar-focus');

        let word = searchBar.value;
        //console.log(word);
        getSearch(urlAutocolplete, apiKey, word);
        //ulAutocomplete.children[0].style.backgroundColor = "yellow";
    })
});

// cambio que suceden al quitar el focus de la barra de busqueda
searchBar.addEventListener('blur', function () {
    divAutocomplete.classList.remove('list-autocomplete-focus');
    divAutocomplete.classList.add('list-autocomplete');
    searchBar.classList.add('searchBar');
    ulAutocomplete.style.display='none';
})

// Funcion encargada de crear los elementos ul de la lista de
// opciones de autocomplete
function getSearch(url, key, word) {
    fetch(`http://${url}?${key}&q=${word}`)
        .then(json => json.json())
        .then(words => {
            ulAutocomplete.innerHTML = '';
            for (let word of words.data) {
                ulAutocomplete.innerHTML += `
                <li><i class="fas fa-search"></i> ${word['name']}</li>
                `
                console.log(word['name'])
                ulAutocomplete.children[0].classList.add('first-li');
            }
        })
        //.catch(console.log(error))
}
