const express = require("express");
const db = require("./src/db/db")


const cookieParser = require("cookie-parser");
const route = require("./src/router/route");
const port = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/", route);

app.listen(port, () => {
    console.log("Server is running....");
});