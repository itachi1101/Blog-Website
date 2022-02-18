const { Router } = require("express");
const authController = require("../controller/authcontroller");
const router = Router();

//SIGNUP REQUESTS
// router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

// LOGIN RESQUEST
// router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;
