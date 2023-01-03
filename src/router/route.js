let express = require("express");
let router = express.Router();

let { createUser, login, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/userController");
let authRoute = require("../auth/auth")
// Create user
router.post("/user", createUser);

// Login user 
router.post("/login", login);

// Get all user data
router.get("/user", authRoute, getAllUser);

// Get user data by id
router.get("/user/:id",getUserById);

// Update user data by id
router.put("/user/:id", updateUser);

// Delete user data by id
router.delete("/user/:id", deleteUser);

module.exports = router;