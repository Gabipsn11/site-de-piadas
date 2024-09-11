document.addEventListener('DOMContentLoaded', () => {
  const jokeElement = document.getElementById('joke');
  const fetchJokeButton = document.getElementById('fetch-joke');

  fetchJokeButton.addEventListener('click', () => {
      fetch('https://v2.jokeapi.dev/joke/Any?lang=pt')
          .then(response => response.json())
          .then(data => {
              if (data.joke) {
                  jokeElement.textContent = data.joke;
              } else if (data.setup && data.delivery) {
                  jokeElement.textContent = `${data.setup} - ${data.delivery}`;
              } else {
                  jokeElement.textContent = 'Não foi possível encontrar uma piada.';
              }
          })
          .catch(error => {
              console.error('Erro ao buscar piada:', error);
              jokeElement.textContent = 'Erro ao buscar piada. Tente novamente.';
          });
  });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registrado com sucesso:', registration);
            })
            .catch((error) => {
                console.log('Falha ao registrar o ServiceWorker:', error);
            });
    });
}
document.getElementById('capture').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    document.getElementById('photo').src = dataUrl;
});

function startCamera() {
    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log("Ocorreu um erro ao acessar a câmera: " + err);
        });
}

startCamera();

document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').innerHTML = "Geolocalização não é suportada neste navegador.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('location').innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerHTML = "Usuário negou a solicitação de Geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerHTML = "Informação de localização indisponível.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerHTML = "A solicitação de localização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerHTML = "Um erro desconhecido ocorreu.";
            break;
    }
}
