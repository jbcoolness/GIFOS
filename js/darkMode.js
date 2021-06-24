let darkModeCheck;
window.addEventListener('load', ()=> {
    darkModeCheck = localStorage.getItem('darkModeCheck', darkModeCheck);
    if ((darkModeCheck == 'true') || (darkModeCheck == 'false')) {
        darkModeCheck == 'true' ? darkModeOn() : darkModeOff();
    }else {        
        return;
    }
});

document.getElementById('darkMode').addEventListener('click', ()=> {
    darkModeCheck ? darkModeOff() : darkModeOn();
});

const darkModeOn = ()=> {
    document.getElementById('darkMode').textContent = 'Modo Diurno';
    document.getElementById('menu').classList.add('dark-mode-light');
    document.getElementById('header').classList.add('dark-mode-light');
    document.getElementById('sectionSearch').classList.add('dark-mode-light');
    document.getElementById('trendingGifos').classList.add('dark-mode-black');
    document.getElementById('sectionCreate').classList.add('dark-mode-light');
    document.getElementById('footer').classList.add('dark-mode-light');
    document.getElementById('btnCreate').classList.add('btnCreate-noc');
    document.getElementById('divAutocomplete').classList.add('divAutocomplete-focus-noc');
    document.getElementById('iconSearch').src = "/assets/img/icon-search-mod-noc.svg";
    document.getElementById('cam').classList.add('cam-noc');
    document.getElementById('pelicula').classList.add('pelicula-noc');
    document.getElementById('step1').classList.add('steps-noc')
    document.getElementById('step2').classList.add('steps-noc')
    document.getElementById('step3').classList.add('steps-noc')
    document.getElementById('btnSteps').classList.add('btnSteps-noc')
    document.getElementById('timerDisplay').style.color = 'white';

    darkModeCheck = true;
    localStorage.setItem('darkModeCheck', darkModeCheck);
};

const darkModeOff = ()=> {
    document.getElementById('darkMode').textContent = 'Modo Nocturno';
    document.getElementById('menu').classList.remove('dark-mode-light');
    document.getElementById('header').classList.remove('dark-mode-light');
    document.getElementById('sectionSearch').classList.remove('dark-mode-light');
    document.getElementById('trendingGifos').classList.remove('dark-mode-black');
    document.getElementById('sectionCreate').classList.remove('dark-mode-light');
    document.getElementById('footer').classList.remove('dark-mode-light');
    document.getElementById('btnCreate').classList.remove('btnCreate-noc');
    document.getElementById('divAutocomplete').classList.remove('divAutocomplete-focus-noc');
    document.getElementById('cam').classList.remove('cam-noc');
    document.getElementById('pelicula').classList.remove('pelicula-noc');
    document.getElementById('step1').classList.remove('steps-noc')
    document.getElementById('step2').classList.remove('steps-noc')
    document.getElementById('step3').classList.remove('steps-noc')
    document.getElementById('btnSteps').classList.remove('btnSteps-noc')
    document.getElementById('timerDisplay').style.color = "#572EE5";
    
    darkModeCheck = false;
    localStorage.setItem('darkModeCheck', darkModeCheck);
};

export{darkModeCheck}
