const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Select the searchbox
// Searchbox add event listener ... event is keypress... setQuery

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    console.log('Keypress event', event)
    if (event.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {    
    const url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;

    fetch(url)
        .then(response => response.json())
        .then(weather => {
            console.log('Weather', weather)

            if (weather.cod === 200) {
                displayWeather(weather);
            } else {
                throw weather.message;
            }
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
}

function displayWeather(weatherResponse) {
    const city = document.querySelector('.city');
    city.innerText = `${weatherResponse.name}, ${weatherResponse.sys.country}`;

    const dateElement = document.querySelector('.date');
    const today = new Date();
    dateElement.innerText = dateBuilder(today);

    const temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(weatherResponse.main.temp)}°c`;

    const weather = document.querySelector('.weather');
    weather.innerText = weatherResponse.weather[0].main;

    const hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `${Math.round(weatherResponse.main.temp_min)}°c / ${Math.round(weatherResponse.main.temp_max)}°c`;
}

function dateBuilder(dateObj) {
    // Manual way of Data building
    /* const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[dateObj.getDay()];
    let date = dateObj.getDate();
    let month = months[dateObj.getMonth()];
    let year = dateObj.getFullYear();

    return `${day}, ${date} / ${month} / ${year}`; */
    
    const DATE_FORMAT_OPTIONS = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long',
    }

    return dateObj.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);

}
  