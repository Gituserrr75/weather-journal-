// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=7964b729370350b34855426e49c140e7";
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
/* Global Variables */
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const zipCode = document.getElementById("zip");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", () => {
    if(!zipCode.value || !feelings.value){
        alert("please enter valid zipcode and feeling.");
    } else {
  console.log("click");}
});

/* Function to GET Web API Data*/
const apiData = async (url, zipCode, apiKey) => {
  const response = await fetch(url + zipCode + apiKey);
  try {
    const webData = await response.json();
    return webData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function called by event listener */
generate.addEventListener("click", getData);
function getData() {
  apiData(url, zipCode.value, apiKey).then((data) => {
    console.log(data);
    postData("/add", {
      date: newDate,
      temp: data.main.temp,
      content: feelings.value,
    }).then(() => {
      retriveData();
    });
  });

  /* Function to POST data */
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  /* Function to GET Project Data */
  async function retriveData() {
    const response = await fetch("/all");
    try {
      const data = await response.json();
      document.getElementById("temp").innerHTML = data.temp + " degrees.";
      document.getElementById("date").innerHTML = data.date;
      document.getElementById("content").innerHTML = `I'm feeling ${data.content}`;
    } catch (error) {
      console.log("error", error);
    }
  }
}