//By SciDroid

//This Promise sendapetition tothe API for infomration.
const fetchData = () => {
  window
    .fetch(
      //api fetch url
      `https://api.openweathermap.org/data/2.5/weather?q=${document
        //fetch value from the input
        .getElementById("city")
        //parse spaces for query the api
        .value.split(" ")
        .join("+")}&appid=6edcd89e1bf91ff50e8852c2a5b89a45&units=metric`
    )

    //parse response to json
    .then((response) => response.json())

    //procees the json to show in the web
    .then((responseJSON) => {
      //define the node for the content
      const container = document.querySelector(".results");
      //validate if exists content on the body
      if (document.getElementById('exists')) {
        //remove all elements from the container node
        container.innerHTML = '';
      }
      //verify the http code from the api
      if (responseJSON.cod !== 200) {

        //show error
        const error = document.createElement("h4");

        error.textContent =
          "Sorry the city doesn't, check the spell and try again, if persits try searching manhattan, if this return a error it's an API problem.";
        error.id = "exists";
        container.append(error);

      } else {
        //show reponse if the api successfully respond the  petition

        //show required infomration

        //city name
        const cityFromResponse = document.createElement("h4");

        cityFromResponse.textContent = `Found ${responseJSON.name}, ${responseJSON.sys.country}`;
        cityFromResponse.id = "exists";

        //image
        const image = document.createElement("img");

        image.src = `https://openweathermap.org/img/wn/${responseJSON.weather[0].icon}@2x.png`;
        image.id = 'image'

        //description
        const description = document.createElement("p");

        console.log(responseJSON.weather[0].description);
        description.textContent = responseJSON.weather[0].description;
        description.id = 'desc'

        //Temperature
        const temp = document.createElement("p");

        temp.id = 'temp'
        temp.textContent = `Estimate Temperature ${

          //procees the minumun and maximun temperature for a average and parse for a max of 2 decimals
          responseJSON.main.temp_min + responseJSON.main.temp_max / 2}C°`;

        //render the elements in the UI
        container.append(cityFromResponse, image, description, temp);
      }
    })

    //process the failed api connection
    .catch((err) => {
      console.error(err);

      //display a error in UI
      const container = document.querySelector(".results");
      const error = document.createElement("h4");

      error.textContent =
        "Sorry, we have a problem to connect you with the API, check your connecction and try again.";
      error.className = "errorAPI";
      container.append(error);
    });
};


//add event  for button press
document.getElementById("button").addEventListener("click", fetchData);

//process an enter like button press
let inputText = document.getElementById("city");
inputText.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});