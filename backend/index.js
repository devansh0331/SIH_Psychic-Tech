const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const app = express();

app.use(cors());
app.use(express.json());
const mongoURL =
  "mongodb+srv://devansh0331_:JGeSJuQE0ua5L4a5@cluster0.eppfmtt.mongodb.net/sih?retryWrites=true&w=majority";

const runMongo = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
  var db = mongoose.connection;
};

runMongo();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("API working smoothly");
});

app.post("/signup", async (req, res) => {
  // const { email, password } = req.body;
  const email = "testuser@gmail.com";
  const password = "testing123";
  const isNewUser = await User.findOne({ email });
  if (isNewUser) {
    res.json("User already exists").status(400);
  } else {
    try {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, salt),
      });
      res.json(newUser).status(200);
    } catch (error) {
      res.json("Server Error : " + error).status(500);
    }
  }
});

app.get("/register", async (req, res) => {
  // const { name, email, age, gender, contact } = req.body;
  const email = "testuser@gmail.com";
  const name = "Test User";
  const age = "20";
  const gender = "Male";
  const contact = "9876543210";
  try {
    const userRegister = await User.updateOne(
      { email },
      { name, age, gender, contact }
    );
    res.json(userRegister).status(200);
  } catch (error) {
    res.json("Check your credentials or Login/SignUp and try again");
  }
});

app.listen(PORT, () => {
  console.log("Server is running!!");
});
