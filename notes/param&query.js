const express = require("express");
const _ = require("lodash");

const app = express();
// console.log(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 1, name: "abhishek", address: "mahasaow" },
  { id: 2, name: "vikas", address: "mahasaow" },
  { id: 3, name: "akash", address: "mahasaow" },
  { id: 4, name: "dheera", address: "mahasaow" },
];

app.get("/user/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.params);
  res.json("user get");
});

app.listen(4000, () => {
  console.log("Server is connected.....");
});
