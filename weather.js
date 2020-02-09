const weather = document.querySelector(".js-weather");

//https://home.openweathermap.org/api_keys 에서 가져온 api key
//API : 특정 웹사이트에서 데이터를 얻거나 컴퓨터끼리 소통하기 위한 것
const API_KEY = "2fa60c382b2703b462f20599ecf6e6ae";
const COORDS = 'coords';

function getWeather(lat, lon) {
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
    // then() : 데이터가 완전히 들어온 후에 데이터 호출
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json){
        // console.log(json);
        const now_weather = json.weather[0].main;
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${now_weather} 🔥 ${temperature} 🏠 ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 이름과 값을 똑같이 저장할 때는 아래와 같이 가능
    const coordsObj = {
        latitude, 
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
