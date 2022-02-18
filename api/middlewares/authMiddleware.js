const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mysecret", (err, decodedToken) => {
      if (err) res.send("/login");
      else next();
    });
  } else {
    res.redirect("/login");
  }
};
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mysecret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = { requireAuth, checkUser };
