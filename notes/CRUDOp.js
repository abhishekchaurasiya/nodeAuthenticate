const express = require("express");
const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// db string
const db_url =
    "mongodb+srv://abhiproject:EgpKWMIXTI5YWdFr@cluster0.helxhqp.mongodb.net/curd-operation";
mongoose
    .connect(db_url, { useNewUrlParser: true })
    .then((db) => {
        console.log("mongo is connected");
    })
    .catch((error) => {
        console.log("Error", error);
    });

// Create schema for user
let userSchema = mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () { // here use normal funcation because I want to use this keyword
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: function () {  // here use normal funcation because I want to use this keyword
            return this.confirmPassword == this.password;
        }
    },
});

// using here pre hooks for not save confirm password in database
userSchema.pre("save", function () {
    this.confirmPassword = undefined;
})

// hashing password 
userSchema.pre("save", async function () {
    let salt = await bcrypt.genSalt(10);
    let hashingStirng = bcrypt.hash(this.password, salt);
    this.password = hashingStirng;
    
});

// create user model
let userModel = mongoose.model("Usercurd", userSchema);

// Create user data
app.post("/user", async (req, res) => {
    let data = req.body;
    let createUser = await userModel.create(data);
    res.status(201).json(createUser)
})

// Get all user data
app.get("/users", async (req, res) => {
    let getUser = await userModel.find();
    res.status(200).json(getUser)
})

// Get single user data
app.get("/user", async (req, res) => {
    let getUser = await userModel.findOne();
    res.status(200).json(getUser)
})

// Get user data by id
app.get("/user/:id", async (req, res) => {
    let paramsId = req.params.id;
    let findUser = await userModel.findOne({ _id: paramsId }).select({ _id: 0 })
    res.status(200).json(findUser)
})

// Update user data by id
app.put("/user/:id", async (req, res) => {
    let userId = req.params.id;
    let { fname, lname, email, password } = req.body;

    let udateUserObj = {
        fname, lname, email, password
    };

    let deleteUser = await userModel.findByIdAndUpdate(userId, udateUserObj, { new: true });
    if (!deleteUser) {
        return res.status(400).send({ status: false, message: "User is already delete." })
    }
    res.json(findUser)
});

// Delete user data by id
app.delete("/user/:id", async (req, res) => {
    let userId = req.params.id;
    let deleteUser = await userModel.findByIdAndDelete(userId, { new: true })
    res.json({ msg: "user id deleted", deleteUser })
});


app.listen(port, () => {
    console.log("Server is running....");
})