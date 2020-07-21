const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const { username, password } = req.body;
  const hashed = md5(md5(password + process.env.PASS_SALT));
  const userobj = await User.findOne({ username, password: hashed });
  if (!userobj) {
    return res.status(400).json({ msg: "Username or password is incorrect!" });
  }
  const token = await jwt.sign({ username }, process.env.PASS_SALT);
  userobj.token = token;
  userobj.save();
  return res.json({ username, token, name: userobj.name });
});

router.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const { username, password, name } = req.body;
  const userobj = await User.findOne({ username });
  if (userobj) {
    // user exists already
    return res.status(400).json({ msg: "This username is taken!" });
  }
  const hashed = md5(md5(password + process.env.PASS_SALT));
  const token = await jwt.sign({ username }, process.env.PASS_SALT);
  const newUser = new User({
    username,
    password: hashed,
    name,
    token,
  });
  newUser.save();
  return res.json({ username, name, token });
});

module.exports = router;
