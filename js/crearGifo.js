import { CONFIG_DEV } from './config.js';
let myGifs = [];
if (localStorage.getItem('myGifs')) {
    myGifs = JSON.parse(localStorage.getItem('myGifs'));
    console.log(myGifs)
}
const btncreateGif = document.getElementById('btnCreate');
const divHomeTitle = document.getElementById('homeTitle');
const sectionIndex = document.getElementById('index');
const sectionCreate = document.getElementById('sectionCreate');
const camText = document.getElementById('camText');
const btnSteps = document.getElementById('btnSteps');
const video = document.getElementById('videoSpace');
const timerDisplay = document.getElementById('timerDisplay');
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
        timerDisplay.style.visibility = 'visible';
        start();
        btnText.textContent = 'FINALIZAR';
        rec(stream);
        

    }else if (btnText.textContent == 'FINALIZAR') {
        stop();
        btnText.textContent = 'SUBIR GIFO';
        stopRec(recorder);
        
    }else if (btnText.textContent == 'SUBIR GIFO') {
        uploadGif(blobGif);
    }
});

timerDisplay.addEventListener('click', ()=> {
    try {
        if (document.getElementById('repeatRec')) {
            reset();
            start();
            btnText.textContent = 'FINALIZAR';
            rec(stream);
        }
    } catch (error) {
        console.log("Aún no ha grabado vdeo " + error)
    }
})

let stream;
let recorder;
let blobGif = null;

const getCam = async ()=> {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true, 
            audio: false
        });
        camText.style.display = 'none';
        video.style.display = 'flex';
        video.srcObject = stream;
        video.play();
    }catch(error) {
        console.log(error);
    }
};
        // Initialize the recorder
const rec = async (stream)=> {
    try {
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
    recorder.stopRecording(async()=> {
        blobGif = await recorder.getBlob();
        //invokeSaveAsDialog(blobGif);
        console.log(blobGif)
    })
};

const uploadGif = async (blob)=> {
    let formData = new FormData();
    formData.append('username', CONFIG_DEV.USERNAME);
    formData.append('file', blob, 'createdGif.gif');
    formData.append('tags', 'various');
    try {
        const dataGif = await fetch(`${CONFIG_DEV.URL_UPLOAD_GIF}?${CONFIG_DEV.API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const dataGifJson = await dataGif.json();
        myGifs.push(dataGifJson);
        localStorage.setItem('myGifs', JSON.stringify(myGifs))
        console.log(dataGifJson);
    } catch (error) {
        console.log(error)
    }    
}



// chronometer
let h = 0;
let m = 0;
let s = 0;
let control;

const start = ()=> {
    cronometro();
    control = setInterval(cronometro,1000);
}

const cronometro = ()=> { 
    let hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    timerDisplay.innerHTML = `${hAux}:${mAux}:${sAux}`;
}

const stop = ()=> { 
    clearInterval(control);
    timerDisplay.innerHTML = `<p class='repeatRec' id='repeatRec'>REPETIR CAPTURA</p>`;
}      

const reset = ()=> {
    clearInterval(control)
    h = 0;
    m = 0;
    s = 0;
    timerDisplay.innerHTML = "<p>00 : 00 : 00 : 00</p>";
};

export {myGifs};