let X = 0;
let Y = 0;
function mousePosition(e) {
    X = e.clientX;
    Y = e.clientY;
}

let iconSelect;
const getIdElement = (ele)=> {
    iconSelect = ele.id 
    console.log(iconSelect)
}

// export {actionGif};