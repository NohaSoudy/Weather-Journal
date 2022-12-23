// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
var async = require("async");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
app.use(express.static("website"));
const port = 5000;

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost:${port}`);
}

// Callback function to complete GET '/all'
app.get("/all", getData);

function getData(req, res) {
  res.send(projectData);
}

// POST method route
app.post("/addNewWeather", addNewWeather);

function addNewWeather(req, res) {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    feel: req.body.feel,
    zip: req.body.zip,
  };
  res.send(projectData);
}
