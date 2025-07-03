function getWeather(city) {
  var link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4ee793dc1bbfa35cd0db9e274e21c46`;
  var request = new XMLHttpRequest();
  request.open('GET', link, true);

  // Set button to loading state
  const refreshBtn = document.querySelector('.refresh-button');
  refreshBtn.classList.add('loading');

  request.onload = function() {
    refreshBtn.classList.remove('loading');
    
    if (request.status >= 200 && request.status < 400) {
      var obj = JSON.parse(this.response);
      document.getElementById("weather").innerHTML = obj.weather[0].description;
      document.getElementById("location").innerHTML = obj.name;
      document.getElementById("temp").innerHTML = (obj.main.temp - 273.15).toFixed(2) + " °C";
      document.getElementById("icon").src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
    } else {
      alert("Weather details for this city are not available");
    }
  };

  request.onerror = function() {
    refreshBtn.classList.remove('loading');
    alert("Error fetching weather data");
  };

  request.send();
}

// Get city from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city') || 'mangalore';
getWeather(city);

