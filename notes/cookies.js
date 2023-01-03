const express = require("express");
const cookieParser = require("cookie-parser");
const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Set cookies
app.get("/setcookies", (req, res) => {
    res.cookie("isLoggedIn", true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
    res.cookie("isPrimeVideo", false)
    res.send("cookie has been send")
})

app.get("/getcookies", async (req, res) => {
    let cookie = req.cookies;
    // console.log(cookie);
    console.log(cookie.isLoggedIn);
    console.log(cookie.isPrimeVideo);
    res.send("cookies recieved")

})


app.listen(port, () => {
    console.log("Server is running....");
})





 