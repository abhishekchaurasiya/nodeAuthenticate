const express = require("express");
const port = 4000;
const mongoose = require("mongoose");
const axios = require("axios");
const coockies = require("cookie-parser")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(coockies())

app.get("/data", async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=fd9e1efb21b074a56d9fcdb819c760ed',
        };

    
        const data = axios(options)
        console.log(data.json())
        res.status(200).json(data)
    } catch (error) {
        res.status(401).json(error)
    }
})




app.listen(port, () => {
    console.log(`Server is running port at ${port}`)
});

