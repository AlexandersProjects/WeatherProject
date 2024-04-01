require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const apiKey = process.env.API_KEY;

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "6052dab62b4bb196712b9659e7a98efc";
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const weatherTemperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherIconSource = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            const htmlResponse = `
                <div style="text-align: center; background-color: #f0f0f0;">
                    <h1>The temperature in ${query} is: ${weatherTemperature} degrees Celsius </h1>
                    <p>The weather in ${query} is: ${weatherDescription}</p>
                    <img src="${weatherIconSource}" alt="Weather Icon">
                </div>`;

            res.send(htmlResponse);

            console.log("The temperature is: " + weatherTemperature);
            console.log("The weather is: " + weatherDescription);
        })
    })
})

app.listen(3000, function () {
    console.log("Server for Weather App running on port 3000.");
})
