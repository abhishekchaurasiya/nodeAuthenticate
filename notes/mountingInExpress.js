const express = require("express");
const _ = require("lodash");

const app = express();
// console.log(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 1, name: "abhishek", address: "mahasaow" },
  { id: 2, name: "vikas", address: "rewa" },
  { id: 3, name: "akash", address: "bhiti" },
  { id: 4, name: "dheeraj", address: "indore" },
  { id: 5, name: "madhoo", address: "mahasaow" },

];

// using mounting or create mini app
const userRouter = express.Router();
app.use("/user", userRouter); // create base url or route and use miniapp

// here use our miniapp and write own route
userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

// miniapp use for params
userRouter.route("/:id").get(getUserById);


// create user
function createUser(req, res) {
  let createData = req.body;
  users = createData;
  res.json({ msg: "create user", user: createData });
}

// get user
function getUser(req, res) {
  res.send(users);
}


// update user
function updateUser(req, res) {
  let updateUser = req.body;
  for (key in updateUser) {
    users[key] = updateUser[key];
  }
  res.json({ msg: "Successfully Update data...", user: updateUser });
}

// Delete user
function deleteUser(req, res) {
  users = {};
  res.json({ msg: "Delete successfully user data.." });
}

// Get user by params
function getUserById(req, res) {
  let paramsId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramsId) {
      obj = users[i];
    }
  }
  res.json({ msg: "get data by id", user: obj });
}


app.listen(4000, () => {
  console.log("Server is connected.....");
});
