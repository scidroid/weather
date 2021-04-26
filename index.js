const fetchData = () => {
  window
    .fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${document
        .getElementById("city")
        .value.split(" ")
        .join("+")}&appid=6edcd89e1bf91ff50e8852c2a5b89a45&units=metric`
    )
    .then((response) => response.json())
    .then((responseJSON) => {
      const container = document.querySelector(".results");
      if (document.getElementById('exists')) {
        container.innerHTML = '';
      }
      if (responseJSON.cod !== 200) {
        console.log("falló");
        const error = document.createElement("h4");
        error.textContent =
          "Sorry the city doesn't, check the spell and try again, if persits try searching manhattan, if this return a error it's an API problem.";
        error.id = "exists";
        container.append(error);
      } else {
        console.log("ta bien");
        const cityFromResponse = document.createElement("h4");
        cityFromResponse.textContent = `Found ${responseJSON.name}, ${responseJSON.sys.country}`;
        cityFromResponse.id = "exists";
        const image = document.createElement("img");
        image.src = `https://openweathermap.org/img/wn/${responseJSON.weather[0].icon}@2x.png`;
        image.id = 'image'
        const description = document.createElement("p");
        console.log(responseJSON.weather[0].description);
        description.textContent = responseJSON.weather[0].description;
        description.id = 'desc'
        const temp = document.createElement("p");
        temp.id = 'temp'
        temp.textContent = `Estimate Temperature ${
          responseJSON.main.temp_min + responseJSON.main.temp_max / 2}C°`;
        container.append(cityFromResponse, image, description, temp);
      }
    })
    .catch((err) => {
      console.error(err);
      const container = document.querySelector(".results");
      const error = document.createElement("h4");
      error.textContent =
        "Sorry, we have a problem to connect you with the API, check your connecction and try again.";
      error.className = "errorAPI";
      container.append(error);
    });
};

document.getElementById("button").addEventListener("click", fetchData);

console.log("se ejecutó");

let inputText = document.getElementById("city");
inputText.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});