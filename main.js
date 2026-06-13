//weathershowing main function
async function showWeather(latitude, longitude) {
        let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ae7de985bd75a4cdd8ff0065d6e24040&units=metric`);
        let weatherData = await weatherResponse.json();

        let temperature = document.querySelector('.temperature');
        let weatherCondition = document.querySelector('.weatherCondition');
        let place = document.querySelector('.place');
        let showDate = document.querySelector('.showDate'); 
        
        temperature.innerText = Math.round(weatherData.main.temp) + '\u00B0';
        weatherCondition.innerText = weatherData.weather[0].description;
        place.innerText = weatherData.name;
        const date = new Date(weatherData.dt * 1000);
        const formatted = date.getDate() + " " +
        date.toLocaleString("en-US", { month: "short" });
        showDate.innerText = formatted;
    }
//auto weather via gps location
    navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    showWeather(latitude, longitude);

});
//button is clicked
let button = document.querySelector('.btn');
button.addEventListener('click', async () => {
        let location = document.querySelector('#search').value;
        let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
        let geoData = await response.json();
        if(!geoData || geoData.length === 0){
            alert('Invalid Location');
            return;
        }
        let latitude = geoData[0].lat;
        let longitude = geoData[0].lon;
    showWeather(latitude, longitude);
})
//Enter key is pressed
document.querySelector('#search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        button.click();
    }
});

