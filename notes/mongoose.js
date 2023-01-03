const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db_url =
    "mongodb+srv://mongoabhishek:JGETcKMFq8k1RFrV@cluster0.nn6fz.mongodb.net/Project1blogs?retryWrites=true&w=majority";
mongoose
    .connect(db_url, { useNewUrlParser: true })
    .then((db) => {
        console.log("mongo is connected");
    })
    .catch((error) => {
        console.log("Error", error);
    });

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

// create model 
let userModel = mongoose.model("User", userSchema);

// create invoke function 
(async function createUser() {
    let user = {
        name: "Abhishek",
        password: "123456777",
        confirmPassword: "123456777",
        email: "abhi23@gmail.com"
    };

    let data = await userModel.create(user);
    console.log(data);
})();

app.listen(port, () => {
    console.log("Server is running.....");
});
