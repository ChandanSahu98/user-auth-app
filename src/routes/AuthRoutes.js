const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const validate = require("../middlewares/Validate");
const { registerSchema, loginSchema } = require("../validations/AuthValidation");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout)

module.exports = router;
