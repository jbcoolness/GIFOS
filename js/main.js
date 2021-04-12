//let apiKey = 'api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC';

const urlGifsTrneding = 'api.giphy.com/v1/gifs/trending';
const fetchGifsTrneding = fetch(`http://${urlGifsTrneding}?${apiKey}`).then(response => response.json());
const imgCard1 = document.getElementById('imgCard1');
const imgCard2 = document.getElementById('imgCard2');
const imgCard3 = document.getElementById('imgCard3');
const rightRow = document.getElementById('imgRightRow');
const leftRow = document.getElementById('imgLeftRow');
let indexJson = 0;

console.log(fetchGifsTrneding)
fetchGifsTrneding.then(json => {
    console.log(indexJson);
    console.log(json.data.length);
    imgCard1.setAttribute('src', json.data[indexJson].images.downsized_medium.url);
    imgCard2.setAttribute('src', json.data[indexJson+1].images.downsized_medium.url);
    imgCard3.setAttribute('src', json.data[indexJson+2].images.downsized_medium.url);
    console.log(json.data[0].images.original.mp4);

}).catch(error => {
    console.log(error);
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

// en esta funcion vamos corriendo las imagenes para ir avanzando
// y mostrando las 50 que trae el json
rightRow.addEventListener('click', function() {
    if ((indexJson + 2) < 50){
        indexJson = indexJson+1;
        fetchGifsTrneding.then(json => {
            //let indexJson = 0;
            console.log(indexJson);
            console.log(json.data.length);
            imgCard1.setAttribute('src', json.data[indexJson].images.downsized_medium.url);
            imgCard2.setAttribute('src', json.data[indexJson+1].images.downsized_medium.url);
            imgCard3.setAttribute('src', json.data[indexJson+2].images.downsized_medium.url);
            //console.log(json.data[0].images.original.mp4);
        
        })
        
    }
});

// Esta es la flecha de la izquierda hay que arreglarlo (esta en proceso)
leftRow.addEventListener('click', function() {
    if ((indexJson + 2) > 2){
        indexJson = indexJson-1;
        fetchGifsTrneding.then(json => {
            //let indexJson = 0;
            console.log(indexJson);
            console.log(json.data.length);
            imgCard1.setAttribute('src', json.data[indexJson].images.downsized_medium.url);
            imgCard2.setAttribute('src', json.data[indexJson-1].images.downsized_medium.url);
            imgCard3.setAttribute('src', json.data[indexJson-2].images.downsized_medium.url);
            //console.log(json.data[0].images.original.mp4);
        
        })
        
    }else {
        console.log('no hay mas gifs')
    }
});