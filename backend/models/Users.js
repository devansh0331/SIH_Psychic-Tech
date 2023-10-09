const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    // require: true,
    default: null,
  },
  age: {
    type: String,
    // require: true,
    default: null,
  },
  gender: {
    type: String,
    // require: true,
    default: null,
  },
  contact: {
    type: String,
    // require: true,
    default: null,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
