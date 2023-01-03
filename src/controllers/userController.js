let userModel = require("../models/userModel");
let jwt = require("jsonwebtoken");
require("dotenv").config()
let JWT_KEY = process.env.JWT_SECRET_KEY;
let isValidObjectId = /^[0-9a-fA-F]{24}$/;
let bcrypt = require("bcrypt")

// Register user data
const createUser = async (req, res) => {
    try {
        let data = req.body;
        const { fname, lname, email, password, confirmPassword } = data;
        if (!fname || !lname || !email || !password || !confirmPassword) {
            return res.status(404).json("please fill the data.")
        }

        let preUser = await userModel.findOne({ email: email });
        if (preUser) {
            return res.status(422).json("This user is already present. ")
        }

        let createUser = await userModel.create(data);
        return res.status(201).json(createUser);

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
};

// Login user
const login = async (req, res) => {
    try {
        let data = req.body;

        if (data.email) { //  if email is not found in our db, then send error.....
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                // Here use brcypt function compare function
                // let decript = await bcrypt.compare(user.password, data.password)
                if (user.password === data.password) {
                    let uniqueId = user._id;
                    let jwtToken = jwt.sign({ payload: uniqueId }, JWT_KEY);
                    res.cookie("login", jwtToken, { httpOnly: true }) // Here store cookies in browser...
                    return res.json({ msg: "User has been loggedin", userdetails: data })
                } else {
                    return res.json({ msg: "Wrong credential" })
                }
            } else {
                return res.json({ msg: "User not found" })
            }
        } else {
            return res.json({ msg: "Empty field found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

// Get all user data
const getAllUser = async (req, res) => {
    try {
        let getUser = await userModel.find();
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

// Get user data by id
const getUserById = async (req, res) => {
    try {
        let paramsId = req.params.id;
        // validation
        if (!isValidObjectId.test(paramsId)) {
            return res.status(400).json({ status: false, message: "Please enter the valid user Id" })
        }

        let findUser = await userModel.findOne({ _id: paramsId }).select({ _id: 0 })
        res.status(200).json(findUser)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

// Update user data by id
const updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        // validation
        if (!isValidObjectId.test(userId)) {
            return res.status(400).json({ status: false, message: "Please enter the valid user Id" })
        }

        let { fname, lname, email, password } = req.body;
        let udateUserObj = {
            fname, lname, email, password
        };

        let updateUserById = await userModel.findByIdAndUpdate(userId, udateUserObj, { new: true });
        // validation
        if (!updateUserById) {
            return res.status(400).json({ status: false, message: "User is already delete." })
        }
        res.json({ msg: "user is updated", updateUserById })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

// Delete user data by id
const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        if (!isValidObjectId.test(userId)) {
            return res.status(400).json({ status: false, message: "Please enter the valid user Id" })
        }

        let findUserId = await userModel.findById({ _id: userId })
        // validation 
        if (!findUserId) {
            return res.status(400).send({ status: false, message: "This user is already deleted" })
        }

        let deleteUser = await userModel.findByIdAndDelete(userId, { new: true })
        res.json({ msg: "user id deleted", deleteUser })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};




module.exports = { createUser, login, getAllUser, getUserById, updateUser, deleteUser }