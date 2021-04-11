// express require
const express = require("express");
const router = express.Router();
const { signupAdmin, signinAdmin } = require("../controllers/admin");
const {
  registerValidation,
  validation,
  signinValidation,
} = require("../middleware/admin");
const isAuthAdmin = require("../middleware/isAuthAdmin");

const User = require("../models/User");
// sign up
router.post("/signupAdmin", registerValidation(), validation, signupAdmin);
// sign in
router.post("/signinAdmin", signinValidation(), validation, signinAdmin);

router.get("/currentAdmin", isAuthAdmin, async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.admin._id });
    res.send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
