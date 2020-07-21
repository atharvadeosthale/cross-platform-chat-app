const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  token: String,
});

const User = mongoose.model("users", UserSchema, "users");

module.exports = User;
