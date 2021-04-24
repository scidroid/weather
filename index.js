const fetchData = () => {
  window
    .fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        document.getElementById("city").value.split(' ').join('+')
      }&appid=6edcd89e1bf91ff50e8852c2a5b89a45`
    )
    .then((response) => response.json())
    .then((responseJSON) => {
        const container = document.querySelector(".results");
      if (responseJSON.cod !== 200) {
        console.log("falló");
        const error = document.createElement("h4");
        error.textContent = "Sorry, a wild error has apared, Try Again.";
        error.className = "error";
        container.append(error);
      } else {
        console.log("ta bien");
        const cityFromResponse = document.createElement("h4");
        cityFromResponse.textContent = `Found ${responseJSON.name}, ${responseJSON.sys.country}`;
        cityFromResponse.className = "found";
        container.append(cityFromResponse);
      }
    });
};

document.getElementById("button").addEventListener("click", fetchData);

console.log("se ejecutó");
