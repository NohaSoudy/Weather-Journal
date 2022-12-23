/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=Alexandria,egypt";
const apiKey = "&appid=ff1e730ba6035dec458a697f17d4e187" + "&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", checkWeather);

function checkWeather() {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  if (zipCode != null && feelings != null) {
    getWeather().then(function (data) {
      // Add data
      postData("/addNewWeather", { temperature: data.main.temp, date: newDate, feel: feelings, zip: zipCode }).then(updateUI());
    });
  }
}
//Get Weather Data
const getWeather = async () => {
  const res = await fetch(baseURL + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//Post New Data
const postData = async (url, dataWeather) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWeather),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();

    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = "Temperature is: " + Math.round(allData.temperature) + " degrees";
    document.getElementById("content").innerHTML = "Feeling today: " + allData.feel;
    document.getElementById("date").innerHTML = "Date: " + allData.date;
    document.getElementById("zipCode").innerHTML = "Zipcode: " + allData.zip;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
