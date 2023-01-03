let express = require("express");
let port = process.env.PORT || 4000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/users", (req, res) => {
  console.log(req.body);
  users = req.body;
  res.json({ message: "users is create", user: req.body });
});

let users = {};
app.get("/users", (req, res) => {
  res.json(users);
});

// patch or put use for updating data
app.put("/update", (req, res) => {
  let updateData = req.body;
  for (key in updateData) {
    users[key] = updateData[key];
  }
  res.json({ message: "update user data", user: updateData });
});

// Delete method
app.delete("/delete", (req, res) => {
  users = {};
  res.json({ message: "Delete data" });
});

app.listen(port, () => {
  console.log("Server is running...");
});
