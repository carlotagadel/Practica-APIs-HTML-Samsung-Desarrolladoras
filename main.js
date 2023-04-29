//Primer paso: comprobar si el navegador soporta las API

if (window.File && window.FileReader && window.FileList) {
    console.log('Todas las APIs soportadas.');
}

else {
    alert('API no soportada en este navegador.');
}

//Segundo paso: subir archivo y comprobar que es de tipo vídeo

function handleFileSelect(e) {
    var file = e.target.files[0];

    if (!file.type.match('video.*')){
        return;
    }

//Tercer paso: FileReader para leer el fichero

    var reader = new FileReader();

    reader.onload = (function (theFile){
        return function (e) {

            var videoDiv = document.createElement('div');

            videoDiv.innerHTML = '<video controls id="video" src="' + e.target.result + '" title="'+ theFile.name + '"/>';

            document.getElementById('outputVideo').insertBefore(videoDiv, null);

//Cuarto paso: Añadimos el alert para indicar que está cargando el fichero

            alert('Cargando vídeo... este proceso puede durar unos segundos.');

//Quinto paso: Hacemos visible el vídeo y los botones para reproducir, pausar y cambiar el volumen

            document.getElementById('video').addEventListener('canplay', () => {

                play.style.visibility = 'visible';
                pause.style.visibility = 'visible';
                volumeUp.style.visibility = 'visible';
                volumeDown.style.visibility = 'visible';
            });
        }

    }) (file);

    reader.readAsDataURL(file);
}

document.getElementById('file').addEventListener('change', handleFileSelect, false);
