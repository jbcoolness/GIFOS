// URL o endpoints de peticiones a Giphy
import { CONFIG_DEV } from './config.js';

const searchResult = document.getElementById('searchResult');

// Para pedir las palabras o tags tendencias
async function getApiTrendingTerms() {
    try {        
        let requestGifs = await fetch(`${CONFIG_DEV.URL_TRENDING_TERMS}?${CONFIG_DEV.API_KEY}`);
        let response = await requestGifs.json();
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
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

// <<------------------------*------------------------>>

// Funcion que recibe la variable con la respuesta de 12 gif y 
// los muestra en pantalla, creando los elementos necesarios
let countId = 0;
function printSearchGifs(searchGifs) {
    const divShowMore = document.getElementById('divShowMore');
    divShowMore.style.display=('none')
    divShowMore.classList.add('div-show-more');    
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            // Crear div donde se muestra gif
            const text = `
            <div class="elementText hoverCardText" id="hoverCardText${countId}">
                <p class="elementText">${gif.username}</p>
                <p class="elementText hoverCardText--title">${gif.title}</p>
            </div>
            <div class="elementIcon hoverIconsCard" id="hoverIconsCard${countId}">
                <i class="elementIcon far fa-heart hoverIcon" id="iconFav${countId}" onclick="getIdElement(this)"></i>
                <i class="elementIcon fas fa-download hoverIcon" id="iconDow${countId}" onclick="getIdElement(this)"></i>
                <i class="elementIcon fas fa-expand-alt hoverIcon" id="iconMax${countId}" onclick="getIdElement(this)"></i>
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
                if (e.target.id[11] == undefined) {
                    let numberCard = e.target.id.slice(10,11)
                    console.log(numberCard)
                    if ((e.target.id == `searchCard${numberCard}`) || (e.target.id == `hoverCardText${numberCard}`) || (e.target.id == `hoverIconsCard${numberCard}`)) {
                        var cardElement = document.getElementById(`searchCard${numberCard}`);
                        cardElement.children[0].style.visibility = "visible";
                        cardElement.children[1].style.visibility = "visible";
                        console.log('in')
                    }
                }else {
                    let numberCard = e.target.id.slice(10,13)
                    console.log(numberCard)
                    if ((e.target.id == `searchCard${numberCard}`) || (e.target.id == `hoverCardText${numberCard}`) || (e.target.id == `hoverIconsCard${numberCard}`)) {
                        var cardElement = document.getElementById(`searchCard${numberCard}`);
                        cardElement.children[0].style.visibility = "visible";
                        cardElement.children[1].style.visibility = "visible";
                        console.log('in')
                    }

                }
            }
            
            divResult.onmouseout = (e)=> {
                console.log(X, Y);
                let numberCard = e.target.id.slice(10,13)
                console.log(numberCard)
                let elementMouseIsOver = document.elementFromPoint(X, Y);
                console.log(elementMouseIsOver.className);
                if (e.target.id[11] == undefined) {
                    if (e.target.id == `searchCard${numberCard}`) {
                        if ( (elementMouseIsOver.classList[0] != 'elementText') && (elementMouseIsOver.classList[0] != 'elementIcon')){
                            var cardElement = document.getElementById(`searchCard${numberCard}`);
                            cardElement.children[0].style.visibility = "hidden";
                            cardElement.children[1].style.visibility = "hidden";
                            console.log('out')
                        }
                    }
                }else {
                    if (e.target.id == `searchCard${numberCard}`) {
                        if ( (elementMouseIsOver.classList[0] != 'elementText') && (elementMouseIsOver.classList[0] != 'elementIcon')){
                            var cardElement = document.getElementById(`searchCard${numberCard}`);
                            cardElement.children[0].style.visibility = "hidden";
                            cardElement.children[1].style.visibility = "hidden";
                            console.log('out')
                        }
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

export {getApiTrendingTerms, getApiTrendingGifs, printSearchGifs};