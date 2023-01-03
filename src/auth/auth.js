let jwt = require("jsonwebtoken");
require("dotenv").config();

let JWT_KEY = process.env.JWT_SECRET_KEY;

let authRoute = async (req, res, next) => {
    if (req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY)
        if (isVerified) {
            next();
        } else {
            return res.json({ msg: "user is not verified" })
        }
    } else {
        return res.json({ msg: "Operation is not allowed..." })
    }
};

module.exports = authRoute;