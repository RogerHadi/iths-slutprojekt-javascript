
let appId = '71f6779186cc32448b4c412eea65b982';
let units = 'metric'; 
let searchMethod; // q means searching as a string.

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}

function init(resultFromServer) {
    let body = document.querySelector("body");
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            body.style.backgroundImage = "url('images/clearPicture.jpg')";
            break;
        
        case 'Clouds':
            body.style.backgroundImage ="url('images/cloudy.jpg')";
            break;

        case 'light rain':
            body.style.backgroundImage = "url('images/lightrain.jpg')";
            break;    

        case 'Rain':
        case 'Drizzle':
            body.style.backgroundImage = "url('images/rainPicture.jpg')";
            break;

        case 'Mist':
            body.style.backgroundImage = "url('images/mistPicture.jpg')";
            break;    
        
        case 'Thunderstorm':
            body.style.backgroundImage = "url('images/stormPicture.jpg')";
            break;
        
        case 'Snow':
            body.style.backgroundImage = "url('images/snowPicture.jpg')";
            break;
        case 'broken cloud':
            body.style.backgroundImage = "url('images/broken cloud.jpg')";
            break;  
  

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});