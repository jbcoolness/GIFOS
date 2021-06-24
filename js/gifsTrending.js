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

// Efecto hover sobre los tres gifs mostrados
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
if (localStorage.getItem('favGifs')) {
    favGifs = JSON.parse(localStorage.getItem('favGifs'));
    console.log(favGifs)
};
let favorite;
// Funcion recibe la variable con gifs y muestra 
// los 3 gifs en el slide del trending
function printCardsGif(trendingGifs, indexGif) {
    trendingGifs.then(gifs => {
        console.log(indexGif);
        console.log(gifs.length);

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
        
    });
};

let iconNumber;
gifsTrendingContainer.addEventListener('click', ()=> {
    trendingGifs.then(gifs => {
        console.log(gifs)
        if (!iconSelect) {
            console.log('No ha clickeado incono');        
        }else {
            iconNumber = parseInt(iconSelect.slice(7, iconSelect.length))
            let icon = iconSelect.slice(0,-1)
            console.log(iconNumber)
            console.log(icon)
            if (icon == 'iconFav') {
                favoriteGif(gifs[indexGif+iconNumber], `${icon+iconNumber}`);

            }else if (icon == 'iconDow') {                
                console.log('click sobre iconDow');
                downloadGif(gifs[indexGif+iconNumber].images.fixed_height.url, gifs[indexGif+iconNumber].title);

            }else if (icon == 'iconMax') {
                console.log('click sobre iconMax');
                console.log(indexGif+iconNumber)
                maximizeGif(gifs[indexGif+iconNumber]);                
            };
        };
    });
    
});


// Funcion para marcar o desmarcar favoritos eliminandolos de Favoritos
const favoriteGif = (gif, iconFav)=> {
    let favorite = favGifs.findIndex(fav=> fav.id == gif.id);
    if ((favorite == -1) || (favorite == undefined)) {
        document.getElementById(`${iconFav}`).classList.add('fas');
        favGifs.push(gif);
        localStorage.setItem('favGifs', JSON.stringify(favGifs));
        console.log(gif);
    }else {
        document.getElementById(`${iconFav}`).classList.remove('fas');
        favGifs.splice(favorite, 1);
        localStorage.setItem('favGifs', JSON.stringify(favGifs))
    };
}

// Funcion para marcar o desmarcar icono de Favoritos sin eliminarlos
const checkFav = (gif, iconFav)=> {
    favorite = favGifs.findIndex(fav=> fav.id == gif.id);
    if ((favorite == -1) || (favorite == undefined)) {
        document.getElementById(`${iconFav}`).classList.remove('fas');
    }else {
        document.getElementById(`${iconFav}`).classList.add('fas');
    };
}




// Funcion para agragar gif en favoritos
// const favoriteGif = (gif, iconNumber) => {
//     favorite = favGifs.findIndex(fav=> fav.id == gif.id);
//     if ((favorite == -1) || (favorite == undefined)) {
//         document.getElementById(`iconFav${iconNumber}`).classList.add('fas');
//         favGifs.push(gif);
//         console.log(gif);
//     }else {
//         document.getElementById(`iconFav${iconNumber}`).classList.remove('fas');
//         favGifs.splice(favorite, 1);
//     };
// }

// Funcion para descargar gif slelecionado
const downloadGif = async (url, title) => {
    let a = document.createElement('a');
    let response = await fetch(url);
    let file = await response.blob();
    a.download = title;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
};

const maximizeGif = (gif)=> {
    document.getElementById('modal').style.display = 'flex';
    checkFav(gif, 'modalFavIcon');
    document.getElementById('imgGif').src = gif.images.fixed_height.url;
    document.getElementById('modalUser').textContent = gif.username;
    document.getElementById('modalTitle').textContent = gif.title;
};

// Acciones del modal
let countRow = 0;
document.getElementById('modalRightArrow').addEventListener('click', ()=> { 
    if(indexGif+(iconNumber+countRow) == 29) {
        return
    }
    countRow++;
    console.log(indexGif+(iconNumber+countRow));
    trendingGifs.then(gifs => {
        maximizeGif(gifs[indexGif+(iconNumber+countRow)])
    });
});

document.getElementById('modalLeftArrow').addEventListener('click', ()=> { 
    if(indexGif+(iconNumber+countRow) == 0) {
        return
    }
    countRow--;
    trendingGifs.then(gifs => {
        maximizeGif(gifs[indexGif+(iconNumber+countRow)])
    });
});

document.getElementById('modalFavIcon').addEventListener('click', ()=> { 
    trendingGifs.then(gifs => {
        favoriteGif(gifs[indexGif+(iconNumber+countRow)], 'modalFavIcon')
    });
});

document.getElementById('modalDowIcon').addEventListener('click', ()=> { 
    trendingGifs.then(gifs => {
        downloadGif(gifs[indexGif+(iconNumber+countRow)].images.original.url, gifs[indexGif+(iconNumber+countRow)].title)
    });
});

document.getElementById('modalSlideClose').addEventListener('click', ()=> { 
    document.getElementById('modal').style.display = "none";
});

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = "none";
    }
}

export {favGifs};