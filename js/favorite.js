import { favGifs } from './globalData.js';

const homeTitle = document.getElementById('homeTitle');
const pageTitleFav = document.getElementById('pageTitleFav');
const pageImage = document.getElementById('pageImage');
const divFavGifs = document.getElementById('divFavGifs');
const favPage = document.getElementById('favPage');

const printFavGifs = (favGifs)=> {
    debugger;
    homeTitle.style.display = 'none';
    document.getElementById('page').style.display = 'flex';
    if (favGifs.length == 0) {
        return
    }
    pageImage.style.display= "none";
    divFavGifs.innerHTML="";
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
            divResult.style.backgroundImage= `url(${gif.img})`;
            divResult.insertAdjacentHTML('afterbegin', text);

            divFavGifs.appendChild(divResult);

    });
};

favPage.addEventListener('click', ()=> {
    console.log(favGifs);
    printFavGifs(favGifs);
});

// export {favGifs};