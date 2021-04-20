// express require
const express = require("express");
const router = express.Router();
const {
  signinCand,
  signupCand,
  getAllUsers,
  DeleteOneUser,
} = require("../controllers/User");
const isAuthUser = require("../middleware/isAuthUser");
const {
  registerValidation,
  validation,
  signinValidation,
} = require("../middleware/User");
const User = require("../models/User");
// sign un
router.post("/signupcand", registerValidation(), validation, signupCand);
// sign ip
router.post("/signincand", signinValidation(), validation, signinCand);

router.get("/currentUser", isAuthUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate("cv");
    res.send(user);
    const cv = await Cv.find({ id_user: user._id });
    user.cv = cv;
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", getAllUsers);
router.delete("/:id", DeleteOneUser);

module.exports = router;
