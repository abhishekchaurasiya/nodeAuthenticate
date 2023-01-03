const mongoose = require("mongoose")
require("dotenv").config();

const db_url = process.env.DB_STRING;

mongoose.connect(db_url, { useNewUrlParser: true })
    .then((db) => {
        console.log("mongo is connected");
    })
    .catch((error) => {
        console.log("Error", error);
    });

