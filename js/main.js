// IMPLEMENTACION EN EL CONSUMO DE LA API
// Gif tendencias en el slide de tres 

// async function getTrendingGif(limit_) {
//     try {
//         const urlGifsTrneding = 'api.giphy.com/v1/gifs/trending';
//         //let limit = limit_;
//         let fetchTrendingGifs = await fetch(`http://${urlGifsTrneding}?${apiKey}&limit=${limit_}`);
//         let trendingGifs = await fetchTrendingGifs.json();
//         console.log(trendingGifs.data);
//         return trendingGifs.data;

//     } catch (error) {
//         console.log(error);
//     }
// };

async function getApi(url) {
    try {        
        let fetchTrendingGifs = await fetch(`http://${url}`);
        let trendingGifs = await fetchTrendingGifs.json();
        console.log(trendingGifs.data);
        return trendingGifs.data;

    } catch (error) {
        console.log(error);
    }
};

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

// Funcion recibe la variable con gifs y muestra los 3 gifs en el slide
function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);
        imgCard1.setAttribute('src', gifs[indexGif].images.downsized_medium.url);
        imgCard2.setAttribute('src', gifs[indexGif+1].images.downsized_medium.url);
        imgCard3.setAttribute('src', gifs[indexGif+2].images.downsized_medium.url);
    })
};

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
            searchGifs.then( gifs => {
                gifs.forEach( gif => {
                    let divResult = document.createElement('div');
                    let imgResult =  document.createElement('img');
                    divResult.classList.add('div-result');
                    imgResult.classList.add('img-Result');
                    searchResult.appendChild(divResult);
                    divResult.appendChild(imgResult);
                    imgResult.setAttribute('src', gif.images.downsized_medium.url);
                    console.log(gif.images.downsized_medium.url)
                });
            });
            
        }
    });
});

// // Variable que almacena el resultado de la API con la consulta
// let searchGifs = getApi(urlSearchGifs);

// // Recibe la respuesta con 12 gif y los muestra en el div
// searchGifs.then( gifs => {
//     gifs.forEach( gif => {
//         let divResult = document.createElement('div');
//         let imgResult =  document.createElement('img');
//         divResult.classList.add('div-result');
//         imgResult.classList.add('img-Result');
//         searchResult.appendChild(divResult);
//         divResult.appendChild(imgResult);
//         imgResult.setAttribute('src', gif.images.downsized_medium.url);
//         console.log(gif.images.downsized_medium.url)
//     });
// });
