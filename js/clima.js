document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const search = document.getElementById("search-button");
  const climaBox = document.querySelector(".clima-box");
  const climaDetalles = document.querySelector(".clima-detalles");
  const error404 = document.querySelector(".no-encontrado");

  search.addEventListener("click", () => {
    // Usa la clave desde config.js
    const APIKey = OPENWEATHERMAP_API_KEY;
    const ciudad = document.querySelector(".search-box input").value;

    if (ciudad == "") return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == "404") {
          container.style.height = "400px";
          climaBox.classList.remove("active");
          climaDetalles.classList.remove("active");
          error404.classList.add("active");
          return;
        }
        container.style.height = "555px";
        climaBox.classList.add("active");
        climaDetalles.classList.add("active");
        error404.classList.remove("active");

        const image = document.querySelector(".clima-box img");
        const temperatura = document.querySelector(".clima-box .temperatura");
        const descripcion = document.querySelector(".clima-box .descripcion");
        const humedad = document.querySelector(".clima-detalles .humedad span");
        const viento = document.querySelector(".clima-detalles .viento span");

        switch (json.weather[0].main) {
          case "Clear":
            image.src = `${window.location.origin}/img/sun.png`;
            break;
          case "Rain":
            image.src = `${window.location.origin}/img/rainy.png`;
            break;
          case "Snow":
            image.src = `${window.location.origin}/img/snow.png`;
            break;
          case "Clouds":
            image.src = `${window.location.origin}/img/partialy-cloud.png`;
            break;
          case "Mist":
            image.src = `${window.location.origin}/img/cloud.png`;
            break;
          case "Haze":
            image.src = `${window.location.origin}/img/cloud.png`;
            break;
          default:
            image.src = `${window.location.origin}/img/partialy-cloud.png`;
        }
        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descripcion.innerHTML = `${json.weather[0].description}`;
        humedad.innerHTML = `${json.main.humidity}%`;
        viento.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
      });
  });
});
