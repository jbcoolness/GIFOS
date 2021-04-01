// $color-purple= #572EE5;
// $color-mint-green= #50E3C2;
// $color-gray= #9CAFC3 100%;
// $color-bg-header= rgba(255,255,255,0.50);
// $color-white= #FFFFFF 100%;

// Efecto de boton menu hamburguesa
const iconBurger = document.getElementById('iconBurger');
const menu = document.getElementById('menu');

// Arrow function que me cambia el icon Burger 
// de pendiendo si está abier o cerrado
const iconBurgerToggle= () =>{
    iconBurger.classList.toggle('burger-close');
}

iconBurger.addEventListener('click', function() {
    iconBurgerToggle();
})

// Efecto para boton crear del menu
const btnCreate = document.getElementById("btn-create");
btnCreate.addEventListener('mouseover', function () {
    btnCreate.src= "./assets/img/CTA-crear-gifo-hover.svg";
})

btnCreate.addEventListener('mouseout', function () {
    btnCreate.src= "./assets/img/button-crear-gifo.svg";
})

// Efecto de desplazamiento del menú
const items = document.getElementsByClassName('items')[0];
const menuBurger = document.getElementById('iconBurger');

const toggleMenu = ()=> {
    items.classList.toggle('items2')
    items.style.transition = "transform 0.3s ease-in-out";
}

menuBurger.addEventListener('click', function() {
    toggleMenu();    
});

window.addEventListener('resize', function(){
    if (screen.width > 769) {
        toggleMenu();
        items.style.transition = 'none';
    }
})

