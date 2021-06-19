// import {isMarch, acumularTime, start, cronometro, stop, resume, reset} from './chronometer.js';

const btncreateGif = document.getElementById('btnCreate');
const divHomeTitle = document.getElementById('homeTitle');
const sectionIndex = document.getElementById('index');
const sectionCreate = document.getElementById('sectionCreate');
const camText = document.getElementById('camText');
const btnSteps = document.getElementById('btnSteps');
const video = document.getElementById('videoSpace');
const btnText = document.getElementById('btnText');
const homeText = `
<p class="camTitle">Aquí podrás</p>
<p class="camTitle">crea tus propios <span class="title--color">GIFOS</span></p>
<p class="camText">¡Crea tu GIFO en sólo 3 pasos!</p>
<p class="camText">(sólo necesitas una camara para grabar un video)</p>
`;
const getCamText = `
<p class="camTitle">¿Nos das acceso</p>
<p class="camTitle">a tu cámara</p>
<p class="camText">El acceso a tu camara será válido sólo</p>
<p class="camText">por el tiempo en el que estés creando el GIFO</p>
`
btncreateGif.addEventListener('click', ()=> {
    divHomeTitle.style.display = 'none';
    sectionIndex.style.display = 'none';
    sectionCreate.style.display = 'block';
    camText.insertAdjacentHTML("afterbegin", homeText);
    btnText.textContent = 'COMENZAR';
});

btnSteps.addEventListener('click', ()=> {

    if (btnText.textContent == 'COMENZAR') {
        camText.innerHTML = '';
        camText.insertAdjacentHTML("afterbegin", getCamText)
        btnText.textContent = 'GRABAR';
        getCam();
    }else if (btnText.textContent == 'GRABAR') {
        start();
        btnText.textContent = 'FINALIZAR';
        rec(cam);
        

    }else if (btnText.textContent == 'FINALIZAR') {
        stop();
        btnText.textContent = 'SUBIR GIFO';
        stopRec(recorder);
        
    }
    

});

let cam;
let recorder;
const getCam = async ()=> {
    try {
        cam = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        camText.style.display = 'none';
        video.style.display = 'flex';
        video.srcObject = cam;
        video.onloadedmetadata = ()=> video.play();
    }catch(error) {
        console.log(error);
    }
};
        // Initialize the recorder
const rec = async (stream)=> {
    try {
        // let stream = await getCam();
        recorder = await RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 400,
            hidden: 200,
        });
        recorder.startRecording();
    }catch(error){
        console.log(error)
    }
}

const stopRec = (recorder)=> {

    let blob = null;
    recorder.stopRecording(()=> {
        blob = recorder.getBlob();
        // invokeSaveAsDialog(blob);
        console.log(blob)
    })
}

// chronometer
const timerDisplay = document.getElementById('timerDisplay');
let timeInicial;
let control;
let timeActual;
let acumularTime2;
let isMarch = false; 
let acumularTime = 0; 

const start = ()=> {
    if (isMarch == false) {
        timeInicial = new Date();
        control = setInterval(cronometro,10);
        isMarch = true;
    }
}

const cronometro = ()=> { 
    timeActual = new Date();
    acumularTime = timeActual - timeInicial;
    acumularTime2 = new Date();
    acumularTime2.setTime(acumularTime); 
    let cc = Math.round(acumularTime2.getMilliseconds()/10);
    let ss = acumularTime2.getSeconds();
    let mm = acumularTime2.getMinutes();
    let hh = acumularTime2.getHours()-18;
    if (cc < 10) {cc = "0"+cc;}
    if (ss < 10) {ss = "0"+ss;} 
    if (mm < 10) {mm = "0"+mm;}
    if (hh < 10) {hh = "0"+hh;}
    timerDisplay.innerHTML = `<p>${mm}:${ss}:${cc}</p>`
}

const stop = ()=> { 
    if (isMarch == true) {
        clearInterval(control);
            isMarch = false;
    }     
}      

const resume = ()=> {
    if (isMarch == false) {
        timeActu2 = new Date();
        timeActu2 = timeActu2.getTime();
        acumularResume = timeActu2-acumularTime;
        
        timeInicial.setTime(acumularResume);
        control = setInterval(cronometro,10);
        isMarch = true;
    }     
}

const reset = ()=> {
    if (isMarch == true) {
        clearInterval(control);
        isMarch = false;
    }
    acumularTime = 0;
    pantalla.innerHTML = "00 : 00 : 00 : 00";
}

export {isMarch, acumularTime, start, cronometro, stop, resume, reset}