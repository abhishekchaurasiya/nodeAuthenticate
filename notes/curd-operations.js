const express = require("express");
const port = 4000;
const mongoose = require("mongoose");
const coockies = require("cookie-parser")
const bcrypt = require("bcrypt")
const emailValidator = require("email-validator");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(coockies())

const db_url = "mongodb+srv://abhiproject:EgpKWMIXTI5YWdFr@cluster0.helxhqp.mongodb.net/testAPI";
mongoose.connect(db_url, { useNewUrlParser: true })
    .then(() => {
        console.log(`MongoDB is connnected.`)
    }).catch(error => {
        console.log(error)
    });


// Here create a User Schema 
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: function () {
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: function () {
            return this.confirmPassword == this.password
        }
    }
}, { timestamp: true });

// using here pre hooks for not save confirm password in database
userSchema.pre("save", function () {
    this.confirmPassword = undefined;
})

userSchema.pre("save", async function () {
    let salt = await bcrypt.genSalt(10);
    let hashingStringPassword = bcrypt.hash(this.password, salt);
    this.password = hashingStringPassword;
})

const userModel = mongoose.model("userDB", userSchema);

app.post("/register", async (req, res) => {
    try {
        const bodyData = req.body;
        const data = await userModel.create(bodyData);
        res.status(201).json(data)
    } catch (error) {
        res.status(401).json(error)
    }
})


app.listen(port, () => {
    console.log(`Server is running port at ${port}`)
});
