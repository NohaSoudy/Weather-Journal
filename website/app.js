/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=ff1e730ba6035dec458a697f17d4e187" + "&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", checkWeather);

function checkWeather() {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  if (zipCode != null && feelings != null) {
    getWeather(zipCode).then(function (data) {
      // Add data
      postData("/addNewWeather", { temperature: data?.main?.temp, date: newDate, feel: feelings, zip: zipCode }).then(updateUI());
    });
  }
}
//Get Weather Data
const getWeather = async (zipCode) => {
  const res = await fetch(baseURL + zipCode + apiKey);
  if (res.ok) {
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error", error);
      // appropriately handle the error
    }
  } else {
    resetUI();
    document.getElementById("temp").innerHTML = "Bad response from server";
    throw new Error("Bad response from server");
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

//To Empty the data in HTML
function resetUI() {
  document.getElementById("temp").innerHTML = "";
  document.getElementById("content").innerHTML = "";
  document.getElementById("date").innerHTML = "";
  document.getElementById("zipCode").innerHTML = "";
}
