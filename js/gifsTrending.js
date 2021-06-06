import {getApiTrendingGifs} from './globalData.js';
// import {getIdElement} from './mousePosition.js';

const card0 = document.getElementById('card0');
const trendingCardText0 = document.getElementById('trendingCardText0');
const trendingIconscard0 = document.getElementById('trendingIconsCard0');
const userName0 = document.getElementById('pUserName0');
const title0 = document.getElementById('pTitle0');

const card1 = document.getElementById('card1');
const trendingCardText1 = document.getElementById('trendingCardText1');
const trendingIconscard1 = document.getElementById('trendingIconsCard1');
const userName1 = document.getElementById('pUserName1');
const title1 = document.getElementById('pTitle1');

const card2 = document.getElementById('card2');
const trendingCardText2 = document.getElementById('trendingCardText2');
const trendingIconscard2 = document.getElementById('trendingIconsCard2');
const userName2 = document.getElementById('pUserName2');
const title2 = document.getElementById('pTitle2');

// ----------------------------------------

// variable que recibe los 30 gifs que llegan de la API
let trendingGifs = getApiTrendingGifs();

// flecha derecha e izquierda con el que pasaran las cards con los gifs
const rightRow = document.getElementById('imgRightRow');
const leftRow = document.getElementById('imgLeftRow');


// Variable para iterar e ir cambiando los gif del slide
let indexGif;
window.addEventListener('load', function () {
    indexGif = 0;
    printCardsGif(trendingGifs, indexGif);
    console.log(indexGif);
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
    if (indexGif < 27) {
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


card0.addEventListener('mouseover', ()=> {
    trendingCardText0.style.visibility = "visible";
    trendingIconsCard0.style.visibility = "visible";
});
card0.addEventListener('mouseout', ()=> {
    trendingCardText0.style.visibility = "hidden";
    trendingIconsCard0.style.visibility = "hidden";
});

card1.addEventListener('mouseover', ()=> {
    trendingCardText1.style.visibility = "visible";
    trendingIconsCard1.style.visibility = "visible";
});
card1.addEventListener('mouseout', ()=> {
    trendingCardText1.style.visibility = "hidden";
    trendingIconsCard1.style.visibility = "hidden";
});

card2.addEventListener('mouseover', ()=> {
    trendingCardText2.style.visibility = "visible";
    trendingIconsCard2.style.visibility = "visible";
});
card2.addEventListener('mouseout', ()=> {
    trendingCardText2.style.visibility = "hidden";
    trendingIconsCard2.style.visibility = "hidden";
});


// Acciones sobre los iconos de los gifs
let gifsTrendingContainer = document.getElementById('gifsTrendingContainer')
let favGifs = [];
let gifsDisplay = [];
let favorite;
// Funcion recibe la variable con gifs y muestra 
// los 3 gifs en el slide del trending
function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);
        // Guardo un vector de objetos con los tres gifs actuales que se van 
        // a mostrar en la seccion de trending
        let display = [
            {
                'id':`${gifs[indexGif].id}`,
                'img':`${gifs[indexGif].images.fixed_height.url}`,
                'username':`${gifs[indexGif].username}`,
                'title':`${gifs[indexGif].title}`
            },
            {
                'id':`${gifs[indexGif+1].id}`,
                'img':`${gifs[indexGif+1].images.fixed_height.url}`,
                'username':`${gifs[indexGif+1].username}`,
                'title':`${gifs[indexGif+1].title}`
            },
            {
                'id':`${gifs[indexGif+2].id}`,
                'img':`${gifs[indexGif+2].images.fixed_height.url}`,
                'username':`${gifs[indexGif+2].username}`,
                'title':`${gifs[indexGif+2].title}`
            }
        ];

        // Muestros los tres gif en la seccion
        card0.style.backgroundImage = `url(${gifs[indexGif].images.fixed_height.url})`;
        userName0.textContent = `${gifs[indexGif].username}`;
        title0.textContent = `${gifs[indexGif].title}`;
        favorite = favGifs.findIndex(fav=> fav.id == gifs[indexGif].id);
        if ((favorite != -1) && (favorite != undefined)) {
            document.getElementById('iconFav0').classList.add('fas');
        }else {
            document.getElementById('iconFav0').classList.remove('fas');
        };

        card1.style.backgroundImage = `url(${gifs[indexGif+1].images.fixed_height.url})`;
        userName1.textContent = `${gifs[indexGif+1].username}`;
        title1.textContent = `${gifs[indexGif+1].title}`;
        favorite = favGifs.findIndex(fav=> fav.id == gifs[indexGif+1].id);
        if ((favorite != -1) && (favorite != undefined)) {
            document.getElementById('iconFav1').classList.add('fas');
        }else {
            document.getElementById('iconFav1').classList.remove('fas');
        };

        card2.style.backgroundImage = `url(${gifs[indexGif+2].images.fixed_height.url})`;
        userName2.textContent = `${gifs[indexGif+2].username}`;
        title2.textContent = `${gifs[indexGif+2].title}`;
        favorite = favGifs.findIndex(fav=> fav.id == gifs[indexGif+2].id);
        if ((favorite != -1) && (favorite != undefined)) {
            document.getElementById('iconFav2').classList.add('fas');
        }else {
            document.getElementById('iconFav2').classList.remove('fas');
        };

        // gifsDisplay[indexGif] = display[0];
        // gifsDisplay[indexGif+1] = display[1];
        // gifsDisplay[indexGif+2] = display[2];
        // console.log(gifsDisplay);
    

        // gifsTrendingContainer.addEventListener('click', (event)=> {
        //     let elementMouseIsOver = document.elementFromPoint(X, Y);
        //     let iconId = elementMouseIsOver.id
        //     let iconIdNumber = elementMouseIsOver.id[elementMouseIsOver.id.length-1]
            
        //     if (iconId == `iconFav${iconIdNumber}`) {
        //         console.log('click sobre Icono fav');                
        //         console.log(iconIdNumber)
        //         if (iconIdNumber === '0') {
        //             fav0 = favGifs.findIndex(fav=> fav.id == display[0].id);
        //             if ((fav0 === -1) || (fav0 === undefined)) {
        //                 document.getElementById(`${iconId}`).classList.add('fas');
        //                 favGifs.push(gifsDisplay[indexGif]);
        //                 console.log(gifsDisplay[indexGif]);
        //             }else {
        //                 document.getElementById(`${iconId}`).classList.remove('fas');
        //                 favGifs.splice(fav0, 1);
        //             };
                
        //         }else if (iconIdNumber === '1'){
        //             fav1 = favGifs.findIndex(fav=> fav.id == display[1].id);
        //             if ((fav1 == -1) || (fav1 == undefined)) {
        //                 document.getElementById(`${iconId}`).classList.add('fas');
        //                 favGifs.push(gifsDisplay[indexGif+1]);
        //                 console.log(gifsDisplay[indexGif+1]);
        //             }else {
        //                 document.getElementById(`${iconId}`).classList.remove('fas');
        //                 favGifs.splice(fav1, 1);
        //             };
                    
        //         }else if (iconIdNumber === '2'){
        //             fav2 = favGifs.findIndex(fav=> fav.id == display[2].id);
        //             if ((fav2 == -1) || (fav2 == undefined)) {
        //                 document.getElementById(`${iconId}`).classList.add('fas');
        //                 favGifs.push(gifsDisplay[indexGif+2]);
        //                 console.log(gifsDisplay[indexGif+2]);
        //             }else {
        //                 document.getElementById(`${iconId}`).classList.remove('fas');
        //                 favGifs.splice(fav2, 1);
        //             };
                    
        //         }
            
        //     } else if (iconId == `iconDow${iconIdNumber}`) {
        //         console.log('click sobre Icono Download Gif')
        
        //     } else if (iconId == `iconMax${iconIdNumber}`) {
        //         console.log('click sobre Icono Maximizar gif')
        
        //     }

        //     console.log(favGifs)
        // });
    });
};

gifsTrendingContainer.addEventListener('click', ()=> {
    trendingGifs.then(gifs => {
        if (!iconSelect) {
            console.log('No ha clickeado incono');        
        }else {
            let iconNumber = parseInt(iconSelect.slice(7, iconSelect.length))
            let icon = iconSelect.slice(0,-1)
            console.log(iconNumber)
            console.log(icon)
            if (icon == 'iconFav') {
                favorite = favGifs.findIndex(fav=> fav.id == gifs[indexGif+iconNumber].id);
                if ((favorite == -1) || (favorite == undefined)) {
                    document.getElementById(`iconFav${iconNumber}`).classList.add('fas');
                    favGifs.push(gifs[indexGif+iconNumber]);
                }else {
                    document.getElementById(`iconFav${iconNumber}`).classList.remove('fas');
                    favGifs.splice(favorite, 1);
                }

            }else if (icon == 'iconMax') {
                console.log('click sobre iconMax');

            }else if (icon == 'iconDow') {
                console.log('click sobre iconDow');
            };
        };
    });
    
})

export {favGifs};