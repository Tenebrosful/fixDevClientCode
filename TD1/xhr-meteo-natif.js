//
// Affichage de la météo avec Openweathermap
//

/**
* envoie un requête XHR
*  @param {string} urlSend URL ou route de l'API
*  @param {function} success Fonction à appeler en cas de succès
*/
function sendXhr(urlSend, success) {

	let xhr = new XMLHttpRequest();
	xhr.open('GET', urlSend);
	xhr.responseType = 'json';
	xhr.send();
	xhr.addEventListener('load', function(reponse) { success(reponse.target.response)});
	xhr.addEventListener('error', function (reponse) {console.log('data transfert error : ' + reponse)});
}

/**
* Affiche les données météo d'une ville
* @param {any} data Contient la réponse de l'API au format json
*/
function showWeatherData (data) {

	console.log(data);
	let weatherData = "";
    weatherData += "<h3>Meteo a " + data.name + "</h3>";
    weatherData += "<p>Tendance : " + data.weather[0].description;
    weatherData += " - Temperature : " + data.main.temp + "°C</p>";
    weatherData += "<p>Pression : " + data.main.pressure + " hPa - Humidite : " + data.main.humidity + "%</p>";
    document.getElementById('meteo').innerHTML = weatherData;

}

// -------------------- main

document.addEventListener("DOMContentLoaded", function() {

	let apiKey ="45f5f752c0d9d62ff8054e3106fefe6d";

	let city = 'Paris, fr';

	let options = "&units=metric" + "&lang=fr" 

	let weatherUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID="+ apiKey + options;

	console.log('API URL : ' + weatherUrl1);

	sendXhr(weatherUrl1, showWeatherData);


})