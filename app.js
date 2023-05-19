const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/");
})

app.post("/" , function(req,res) {
    const query = req.body.cityName;
    const apiKey = "6052dab62b4bb196712b9659e7a98efc";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units=" + unit + "&appid=" + apiKey + "";
    https.get(url, function(response){

        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            var weatherTemperature = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            var temperatureResult = "<h1>The temperature in " + query + " is: " + weatherTemperature + " degrees Celsius </h1>";
            var descriptionResult = "<p>The weather in " + query + " is: " + weatherDescription + "</p>";
            var icon = weatherData.weather[0].icon;
            var weatherIconSource = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write(descriptionResult);
            res.write(temperatureResult);            
            res.write("<img src="+ weatherIconSource + " alt='Weather Icon'></img>");
            

            console.log("The temperature is: " + weatherTemperature);
            console.log("The weather is: " + weatherDescription);
            // res.send(temperatureResult + descriptionResult);
            res.send();

            

        })
    })
    // res.send("Server is up and running.");
})


app.listen(3000, function() {
    console.log("Server for Weather App running on port 3000.");
})