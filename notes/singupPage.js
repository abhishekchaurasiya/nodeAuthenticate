
let express = require("express");
let port = process.env.PORT || 4000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = express.Router();
app.use("/auth", authRouter); // global middleware

authRouter
  .route("/signup")
  .get(middleware1, getSignUP, middleware2)  // path specific middleware 
  .post(postSignUp);

function middleware1(req, res, next) {
  console.log("middleware is called");
  next();
}

function middleware2(req, res) {
  console.log("middleware2 encounted");
  console.log("middleware 2 ended req/res cycle..");

  res.sendFile("/public/signupPage.html", { root: __dirname });
}

function getSignUP(req, res, next) {
  console.log("getsignup is called...");
  next();
}

function postSignUp(req, res) {
  let data = req.body;
  res.json({ message: "user signedup", user: data });
  console.log(data);
}

app.listen(port, () => {
  console.log("Server is running...");
});
