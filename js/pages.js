import { favGifs } from './gifsTrending.js';
import { myGifs } from './crearGifo.js'

const homeTitle = document.getElementById('homeTitle');
const iconPage = document.getElementById('iconPage');
const pageTitle = document.getElementById('pageTitle');
const pageImage = document.getElementById('pageImage');
const imgPage = document.getElementById('imgPage');
const pageText = document.getElementById('pageText');
const divShowGifs = document.getElementById('divShowGifs');
const favPage = document.getElementById('favPage');
const myGifsPage = document.getElementById('myGifsPage');

const printFavGifs = (favGifs)=> {
    homeTitle.style.display = 'none';
    document.getElementById('page').style.display = 'flex';
    iconPage.src = "./assets/img/icon-favoritos.svg";
    pageTitle.textContent = 'Favoritos';
    imgPage.src = "./assets/img/icon-fav-sin-contenido.svg";
    pageText.textContent = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"'
    divShowGifs.innerHTML="";
    if (favGifs.length == 0) {
        pageImage.style.display= "flex";
        return
    }
    pageImage.style.display= "none";  
    favGifs.forEach( (gif, index) => {
        
        const text = `
            <div class="elementText hoverCardText" id="hoverCardText${index}">
                <p class="elementText">${gif.username}</p>
                <p class="elementText hoverCardText--title">${gif.title}</p>
            </div>
            <div class="elementIcon hoverIconsCard" id="hoverIconsCard${index}">
                <i class="elementIcon far fa-heart hoverIcon"></i>
                <i class="elementIcon fas fa-download hoverIcon"></i>
                <i class="elementIcon fas fa-expand-alt hoverIcon"></i>
            </div>
            `;

            const divResult = document.createElement('div');

            // Agrega clase a div
            divResult.classList.add('searchResult__cards');
            divResult.setAttribute('id', `searchCard${index}`);            
            
            // agrega background con gif
            divResult.style.backgroundImage= `url(${gif.images.fixed_height.url})`;
            divResult.insertAdjacentHTML('afterbegin', text);

            divShowGifs.appendChild(divResult);

    });
};

const printMyGifs = (myGifs)=> {
    homeTitle.style.display = 'none';
    document.getElementById('page').style.display = 'flex';
    iconPage.src = "./assets/img/icon-mis-gifos.svg";
    pageTitle.textContent = 'Mis GIFOS';
    imgPage.src = "./assets/img/icon-mis-gifos-sin-contenido.svg";
    pageText.textContent = '¡Anímate a crear tu primer GIFO!'
    divShowGifs.innerHTML="";
    if (myGifs.length == 0) {
        pageImage.style.display= "flex";
        return
    }
    pageImage.style.display= "none";  
    myGifs.forEach( (gif, index) => {
        
        const text = `
            <div class="elementText hoverCardText" id="hoverCardText${index}">
                <p class="elementText">jbcoolness</p>
                <p class="elementText hoverCardText--title">Mis Gifos</p>
            </div>
            <div class="elementIcon hoverIconsCard" id="hoverIconsCard${index}">
                <i class="elementIcon far fa-heart hoverIcon"></i>
                <i class="elementIcon fas fa-download hoverIcon"></i>
                <i class="elementIcon fas fa-expand-alt hoverIcon"></i>
            </div>
            `;

            const divResult = document.createElement('div');

            // Agrega clase a div
            divResult.classList.add('searchResult__cards');
            divResult.setAttribute('id', `searchCard${index}`);            
            
            // agrega background con gif
            divResult.style.backgroundImage= `url(https://media.giphy.com/media/${gif.data.id}/giphy.gif)`;
            divResult.insertAdjacentHTML('afterbegin', text);

            divShowGifs.appendChild(divResult);

    });
};


// const hiddeCreateGif = ()=> {
//     try {
//         if (document.getElementById('sectionCreate')){
//             document.getElementById('createGifo').style.display = 'none';
//         }    
//     } catch (error) {
//         console.log('aún no existe seccion crear gifo ' + error)
//     }
// }

favPage.addEventListener('click', ()=> {
    document.getElementById('createGifo').style.display = 'none';
    printFavGifs(favGifs);
});

myGifsPage.addEventListener('click', ()=> {
    document.getElementById('createGifo').style.display = 'none';
    printMyGifs(myGifs);
})

