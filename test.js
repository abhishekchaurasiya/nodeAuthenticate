// const userModel = require("./src/models/userModel");
// const secretKey = "asdfghjklqwertyuiopasdfghjk"
// const login = async (req, res) => {
//     try {
//         let data = req.body;
//         if (data.email) {
//             let user = await userModel.findOne({ email: data.email })
//             if (user) {
//                 if (user.password === data.password) {
//                     let userId = user._id;
//                     let jwtToken = jwt.sign({ payload: userId }, secretKey)
//                     res.cookies("login", jwtToken, { httpOnly: true })
//                     return res.status(200).json({ msg: "user has been loggedin", userdetails: data })
//                 } else {
//                     return res.json("wrong credential")
//                 }
//             } else {
//                 return res.json({ msg: "User not found" })
//             }
//         } else {
//             return res.json({ msg: "Empty field found" })
//         }
//     } catch (error) {

//     }
// }