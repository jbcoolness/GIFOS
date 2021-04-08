// Efecto de boton menu hamburguesa
const iconBurger = document.getElementById('iconBurger');
const menu = document.getElementById('menu');

// Arrow function que me cambia el icon Burger 
// de pendiendo si está abier o cerrado
const iconBurgerToggle= () =>{
    iconBurger.classList.toggle('burger-close');
}

iconBurger.addEventListener('click', function() {
    iconBurgerToggle();
})

// Efecto para boton crear del menu
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

const toggleMenu = ()=> {
    items.classList.toggle('items2')
    items.style.transition = "transform 0.3s ease-in-out";
}

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
let apiKey = 'api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC';
let urlTrending = 'api.giphy.com/v1/trending/searches';
const divTrending = document.getElementById('trending');


function getTrending(url, key) {
    fetch(`http://${url}?${key}`)
        .then(json => json.json())
        .then(json => {
            let [tren1, tren2, tren3, tren4, tren5] = json.data;
            const pTending = document.createElement('p');
            pTending.textContent = (`${tren1}, ${tren2}, ${tren3}, ${tren4}, ${tren5}`);
            divTrending.appendChild(pTending);
            //console.log(json.data.length);
        })
}

window.addEventListener('load', function(){
    getTrending(urlTrending, apiKey);
})


const urlAutocolplete = 'api.giphy.com/v1/gifs/search/tags';
const searchBar = document.getElementById('searchBar')

function getSearch(url, key, word) {
    fetch(`http://${url}?${key}&q=${word}`)
        .then(json => json.json())
        .then(json => {
            for (let i = 0; i < 5; i++) {
                console.log(json.data[i]['name'])
            }
            // console.log(json.data[0]['name'])
            // console.log(json.pagination['count'])
        })
        //.catch(console.log(error))
}

searchBar.addEventListener('focus', function () {
    window.addEventListener('keyup', function(event){
        let word = searchBar.value;
        console.log(word);
        getSearch(urlAutocolplete, apiKey, word);
    })
})