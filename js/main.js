//let apiKey = 'api_key=yFy6hNfjHa8UkN2lAHcIVF1PmSdcvQTC';

const urlGifsTrneding = 'api.giphy.com/v1/gifs/trending';
const fetchGifsTrneding = fetch(`http://${urlGifsTrneding}?${apiKey}`).then(response => response.json());
const imgCard1 = document.getElementById('imgCard1');
const imgCard2 = document.getElementById('imgCard2');
const imgCard3 = document.getElementById('imgCard3');
const leftRow = document.getElementById('leftRow');
const rightRow = document.getElementById('rightRow');
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