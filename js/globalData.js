// URL o endpoints de peticiones a Giphy
import { CONFIG_DEV } from './config.js';

const searchResult = document.getElementById('searchResult');

const card1 = document.getElementById('card1');
const hoverCardText1 = document.getElementById('hoverCardText1');
const hoverIconsCard1 = document.getElementById('hoverIconsCard1');
const userName1 = document.getElementById('pUserName1');
const title1 = document.getElementById('pTitle1');

const card2 = document.getElementById('card2');
const hoverCardText2 = document.getElementById('hoverCardText2');
const hoverIconsCard2 = document.getElementById('hoverIconsCard2');
const userName2 = document.getElementById('pUserName2');
const title2 = document.getElementById('pTitle2');

const card3 = document.getElementById('card3');
const hoverCardText3 = document.getElementById('hoverCardText3');
const hoverIconsCard3 = document.getElementById('hoverIconsCard3');
const userName3 = document.getElementById('pUserName3');
const title3 = document.getElementById('pTitle3');

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
function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);

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
    let countId = 0;
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            // Crear div donde se muestra gif
            const text = `
            <div class="elementText hoverCardText" id="hoverCardText${countId}">
                <p class="elementText">${gif.username}</p>
                <p class="elementText hoverCardText--title">${gif.title}</p>
            </div>
            <div class="elementIcon hoverIconsCard" id="hoverIconsCard${countId}">
                <i class="elementIcon far fa-heart hoverIcon"></i>
                <i class="elementIcon fas fa-download hoverIcon"></i>
                <i class="elementIcon fas fa-expand-alt hoverIcon"></i>
            </div>
            `;
            const divResult = document.createElement('div');

            // Agrega clase a div
            divResult.classList.add('searchResult__cards');
            divResult.setAttribute('id', `searchCard${countId}`);            
            
            // agrega background con gif
            divResult.style.backgroundImage= `url(${gif.images.fixed_height.url})`;
            divResult.insertAdjacentHTML('afterbegin', text);

            
            
            divResult.onmouseover = (e)=> {
                // console.log(e)
                // debugger;
                if ((e.target.id == `searchCard${e.target.id[e.target.id.length-1]}`) || (e.target.id == `hoverCardText${e.target.id[e.target.id.length-1]}`) || (e.target.id == `hoverIconsCard${e.target.id[e.target.id.length-1]}`)) {
                    var cardElement = document.getElementById(`searchCard${e.target.id[e.target.id.length-1]}`);
                    cardElement.children[0].style.visibility = "visible";
                    cardElement.children[1].style.visibility = "visible";
                    console.log('in')
                }
                
            }
            
            divResult.onmouseout = (e)=> {
                console.log(X, Y);
                let elementMouseIsOver = document.elementFromPoint(X, Y);
                console.log(elementMouseIsOver.className);
                // if ((e.target.id == `searchCard${e.target.id[e.target.id.length-1]}`) && (e.target.id != `hoverCardText${e.target.id[e.target.id.length-1]}`) && (e.target.id != `hoverIconsCard${e.target.id[e.target.id.length-1]}`)) {
                if (e.target.id == `searchCard${e.target.id[e.target.id.length-1]}`) {
                    // debugger;
                    if ( (elementMouseIsOver.classList[0] != 'elementText') && (elementMouseIsOver.classList[0] != 'elementIcon')){
                        var cardElement = document.getElementById(`searchCard${e.target.id[e.target.id.length-1]}`);
                        cardElement.children[0].style.visibility = "hidden";
                        cardElement.children[1].style.visibility = "hidden";
                        console.log('out')
                    }
                }
            }

            // agrega div con gif en el div de resultado de busqueda
            searchResult.appendChild(divResult);
            
            console.log(gif.images.fixed_height.url)
            countId++;
        });
    });
    divShowMore.style.display=('block')
};

export {getApiTrendingTerms, getApiTrendingGifs, printCardsGif, printSearchGifs, card1, card2, card3};