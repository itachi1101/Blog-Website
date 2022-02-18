const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "myscrect", {
    expiresIn: maxAge,
  });
};

/// SIGNUP REQUESTS
module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username + " " + email + " " + password);
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {  maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._doc, dataCreated: true });
  } catch (err) {
    res.status(400).json({ error: err, loginSuccessful: false });
  }
};

/// LOGIN REQUEST
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpsOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._doc, loginSuccessful: true });
  } catch (err) {
    res.status(400).json({ errors: err, loginSuccessful: false });
  }
};
