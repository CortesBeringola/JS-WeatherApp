function getIcon(icon, iconID) {
  var skycons = new Skycons({
    color: "white",
  });
  if (icon === "01d") {
    skycons.play();
    return skycons.set(iconID, "clear-day");
  } else if (icon === "01n") {
    skycons.play();
    return skycons.set(iconID, "clear-night");
  } else if (icon === "02d") {
    skycons.play();
    return skycons.set(iconID, "partly-cloudy-day");
  } else if (icon === "02n") {
    skycons.play();
    return skycons.set(iconID, "partly-cloudy-night");
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    skycons.play();
    return skycons.set(iconID, "cloudy");
  } else if (icon === "09d" || icon === "09n") {
    skycons.play();
    return skycons.set(iconID, "rain");
  } else if (
    icon === "10d" ||
    icon === "10n" ||
    icon === "11d" ||
    icon === "11n"
  ) {
    skycons.play();
    return skycons.set(iconID, "sleet");
  } else if (icon === "13d" || icon === "13n") {
    skycons.play();
    return skycons.set(iconID, "snow");
  } else {
    skycons.play();
    return skycons.set(iconID, "fog");
  }
}

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e7f96b150a823abf7388fa6fcbb867b6`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const { main, icon } = data.weather[0];
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = main;
          locationTimezone.textContent = data.name;
          getIcon(icon, document.querySelector(".icon1"));
        });
    });
  }
});
