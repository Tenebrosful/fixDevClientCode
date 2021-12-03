//
// Affichage de la météo avec Openweathermap
//

/**
* Ajouter le code HTML à la fin d'un DIV
* @param {string} htmlString Code HTML à ajouter
* @param {string} divId ID du div
*/
let addToEndfDiv = (htmlString, divId) => {
    document.getElementById(divId).insertAdjacentHTML('beforeend', htmlString)

}

/**
* envoie un requête XHR avec une Promise
* @param {string} urlSend URL ou route de l'API
*/
function sendXhrPromise(urlSend) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlSend);
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', function (reponse) { resolve(reponse.target.response) });
        xhr.addEventListener('error', function (reponse) { reject(reponse) });
    });
}

/**
* envoie un requête XHR
* @param {string} urlSend URL ou route de l'API
* @param {function} success Fonction à appeler en cas de succès
*/
function sendXhr(urlSend, success) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlSend);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', function (reponse) { success(reponse.target.response) });
    xhr.addEventListener('error', function (reponse) { console.log('data transfert error : ' + reponse) });
}

/**
* Affiche les données météo d'une ville
* @param {Object} data : contient la réponse de l'API au format json
*/
function showWeatherData(data) {
    console.log(data);
    let weatherData = "";
    weatherData += "<h3>Meteo a " + data.name + "</h3>";
    weatherData += "<p>Tendance : " + data.weather[0].description;
    weatherData += " - Temperature : " + data.main.temp + "°C</p>";
    weatherData += "<p>Pression : " + data.main.pressure + " hPa - Humidite : " + data.main.humidity + "%</p>";
    document.getElementById('meteo').innerHTML = weatherData;

}

let apiKey = "45f5f752c0d9d62ff8054e3106fefe6d";

let city = 'Paris, fr';

let options = "&units=metric" + "&lang=fr"

let weatherUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + options;

console.log('API URL : ' + weatherUrl1);

// sendXhr(weatherUrl1, showWeatherData);

sendXhrPromise(weatherUrl1)
    .then(data => showWeatherData(data))
    .catch(error => {
        let errorMessage = "<p>Le serveur de données météo n'est pas disponible</p>";
        console.log(errorMessage);
        addToEndfDiv(errorMessage, 'meteo');
    });