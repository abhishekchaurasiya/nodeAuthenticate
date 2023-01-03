let mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

// Create schema for user
let userSchema = mongoose.Schema({
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
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
// pre hooks using before saving in database 
// after save event occurs in db
userSchema.pre("save", function () {
    this.confirmPassword = undefined;
})

// post hooks using after saving show data in database
// userSchema.post("save", function (doc) {
//     console.log("after save datat", doc)
// })

// hashing password 
// userSchema.pre("save", async function () {
//     let salt = await bcrypt.genSalt(10);
//     let hashingStirng = await bcrypt.hash(this.password, salt);
//     this.password = hashingStirng;
// });

module.exports = mongoose.model("Usercurd", userSchema);


