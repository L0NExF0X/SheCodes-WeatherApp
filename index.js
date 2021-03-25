// Time
function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let time = document.querySelector("#current-time");
time.innerHTML = formatDate(now);

// City & Temp
function search(city) {
  let apiKey = `321b4521c1f43612aed7e4d3fbabd5d7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function displayWeather(response) {
  document.querySelector(
    "#city-name"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `321b4521c1f43612aed7e4d3fbabd5d7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let cityForm = document.querySelector("#weather-form");
cityForm.addEventListener("submit", showCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentPosition);

search("Seattle");
// Fahrenheit/Celsius Conversion
// Change this to target units=metric to units=imperial in the apiUrl if no other solution
function toFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  let temperature = temp.innerHTML;
  temperature = Number(temperature);
  temp.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", toFahrenheit);

function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  let temperature = temp.innerHTML;
  temperature = Number(temperature);
  temp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", toCelsius);
