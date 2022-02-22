const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

/// SIGNUP REQUESTS

//create a user
module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = await user.generateAuthToken();
    res.status(201).json({ user: user._doc, token, dataCreated: true });
  } catch (err) {
    res.status(400).json({ error: err, loginSuccessful: false });
  }
};

/// LOGIN REQUEST
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user: user._doc, token, loginSuccessful: true });
  } catch (err) {
    res.status(400).json({ errors: err, loginSuccessful: false });
  }
};
