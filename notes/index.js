const express = require("express");
const _ = require("lodash");

const app = express();
// console.log(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send
app.get("/", (req, res) => {
  console.log("Hello my dear");
  res.send(" I am home page in this file.");
  // console.log(req.url);
  // console.log(req.urlencoded);
  // console.log(req.baseUrl);
});

app.get("/about", (req, res) => {
  // es type se root directry ko bata skte hai
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
  console.log(req.url);
});

// Middle ware and always use bottom side
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.listen(4000, () => {
  console.log("Server is connected.....");
});
