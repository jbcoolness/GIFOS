// $color-purple= #572EE5;
// $color-mint-green= #50E3C2;
// $color-gray= #9CAFC3 100%;
// $color-bg-header= rgba(255,255,255,0.50);
// $color-white= #FFFFFF 100%;


let btnCreate = document.getElementById("btn-create");

btnCreate.addEventListener('mouseover', function () {
    btnCreate.src= "./assets/img/CTA-crear-gifo-hover.svg";
})

btnCreate.addEventListener('mouseout', function () {
    btnCreate.src= "./assets/img/button-crear-gifo.svg";
})