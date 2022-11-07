require('dotenv').config()
const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static("src"));

app.set('views', path.join(__dirname, "src"));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended:true
}));





app.get("/", (req, res) => {
    res.render(__dirname + "/index.ejs");
});


app.post("/", (req, res) => {
    var city = req.body.cityName;
    const query = city;
    const unit = "metric";
    const apiKey = process.env.APIKEY;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&APPID=" + apiKey;

    https.get(url, (response) => {
        console.log(response.statusCode + " Request successfully excuted" );

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = Math.round(weatherData.main.temp);
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const fetchIcon = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

            res.render("index", {temp : temp, desc : desc, query : query, icon: fetchIcon})
        });
    });
});


app.listen(port, () => {
    console.log("Server is running on port 3000!")
});