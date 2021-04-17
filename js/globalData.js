// Funcion general que recibe una url o end point de la API giphy
// configurado para esta aplicacion, trayendo el json y retornandolo
// como dato para su tratamiento
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

// Funcion recibe la variable con gifs y muestra 
// los 3 gifs en el slide del trending
function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);
        imgCard1.setAttribute('src', gifs[indexGif].images.fixed_height.url);
        imgCard2.setAttribute('src', gifs[indexGif+1].images.fixed_height.url);
        imgCard3.setAttribute('src', gifs[indexGif+2].images.fixed_height.url);
    })
};

// Funcion que recibe la variable con la respuesta de 12 gif y 
// los muestra en pantalla, creando los elementos necesarios
function printSearchGifs(searchGifs) {
    searchGifs.then( gifs => {
        gifs.forEach( gif => {
            let divResult = document.createElement('div');
            let imgResult =  document.createElement('img');
            divResult.classList.add('div-result');
            imgResult.classList.add('img-Result');
            searchResult.appendChild(divResult);
            divResult.appendChild(imgResult);
            imgResult.setAttribute('src', gif.images.fixed_height_small.url);
            console.log(gif.images.fixed_height_small.url)
        });
    });    
};

export {getApi, printCardsGif, printSearchGifs};