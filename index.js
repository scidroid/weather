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
      if (responseJSON.cod !== 200) {
        console.log("falló");
        const error = document.createElement("h4");
        error.textContent =
          "Sorry, a wild error has apared, check the spell and try again.";
        error.className = "error";
        container.append(error);
      } else {
        console.log("ta bien");
        const cityFromResponse = document.createElement("h4");
        cityFromResponse.textContent = `Found ${responseJSON.name}, ${responseJSON.sys.country}`;
        cityFromResponse.className = "found";
        //i need to fix this tomorrow.
        //const image = document.createElement("img");
        //image.src = `https://openweathermap.org/img/w/${responseJSON.weather[3]}.png`;
        //const description = document.createElement("h5");
        //console.log(responseJSON.weather[2]);
        //description.textContent = responseJSON.weather[2];
        const temp = document.createElement("p");
        temp.textContent = `Estimate Temperature ${
          responseJSON.main.temp_min + responseJSON.main.temp_max / 2}C°`;
        container.append(cityFromResponse, temp);
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