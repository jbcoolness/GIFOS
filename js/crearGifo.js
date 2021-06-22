import { CONFIG_DEV } from './config.js';

let myGifs = [];
if (localStorage.getItem('myGifs')) {
    myGifs = JSON.parse(localStorage.getItem('myGifs'));
    console.log(myGifs)
}
const btncreateGif = document.getElementById('btnCreate');
const divHomeTitle = document.getElementById('homeTitle');
const sectionIndex = document.getElementById('index');
const createGifo = document.getElementById('createGifo');
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
    // btncreateGif.style.pointerEvents="none";
    divHomeTitle.style.display = 'none';
    sectionIndex.style.display = 'none';
    document.getElementById('page').style.display = 'none';
    createGifo.style.display = 'flex';
    camText.innerHTML = '';
    camText.insertAdjacentHTML("afterbegin", homeText);
    btnText.textContent = 'COMENZAR';
});

btnSteps.addEventListener('click', ()=> {

    if (btnText.textContent == 'COMENZAR') {
        document.getElementById('step1').classList.add('step-active')
        camText.innerHTML = '';
        camText.insertAdjacentHTML("afterbegin", getCamText)
        btnText.textContent = 'GRABAR';
        getCam();
    }else if (btnText.textContent == 'GRABAR') {
        document.getElementById('step1').classList.remove('step-active')
        document.getElementById('step2').classList.add('step-active')
        timerDisplay.style.visibility = 'visible';
        start();
        btnText.textContent = 'FINALIZAR';
        rec(stream);
        

    }else if (btnText.textContent == 'FINALIZAR') {
        stop();
        btnText.textContent = 'SUBIR GIFO';
        stopRec(recorder);
        
    }else if (btnText.textContent == 'SUBIR GIFO') {
        document.getElementById('gifUploadedText').style.visibility = 'visible'
        document.getElementById('step2').classList.remove('step-active');
        document.getElementById('step3').classList.add('step-active');
        timerDisplay.style.visibility = 'hidden';
        btnSteps.style.visibility = 'hidden';
        uploadGif(blobGif);
        video.pause();
        // release camera on stopRecording
        recorder.stream = stream;
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
            audio: false,
            video: {
                height: { max: 480 }
            }
        });
        camText.style.display = 'none';
        video.style.display = 'flex';
        video.srcObject = stream;
        video.play();
        document.getElementById('lightCam').classList.add('shine')
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
            width: 360,
            hidden: 240,
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
let dataGifJson;
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
        dataGifJson = await dataGif.json();
        myGifs.push(dataGifJson);
        localStorage.setItem('myGifs', JSON.stringify(myGifs))
        console.log(dataGifJson);
        document.getElementById('imgLoadDone').classList.remove('rotated');
        document.getElementById('imgLoadDone').src = "./assets/img/ok.svg"
    } catch (error) {
        console.log(error)
    }    
}

const copyGifToClipboard = (urlGif)=> {
    try {
        const input = document.body.appendChild(document.createElement("input"));
        input.value = urlGif;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);
        alert("¡Enlace del Gifo creado copiado en el porta papeles!");
    } catch (error) {
        console.log(error);    }
    
}

// Descargar Gif creado
document.getElementById('dowGifCreate').addEventListener('click', ()=> {
    invokeSaveAsDialog(blobGif);
});
// Copiar link de gif creado
document.getElementById('linkGifCreate').addEventListener('click', ()=> {
    copyGifToClipboard(`${CONFIG_DEV.URL_GIF_UPLOADED}${dataGifJson.data.id}/giphy.gif`)
})

// *** chronometer ****
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