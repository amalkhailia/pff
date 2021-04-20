const express = require("express");

const router = express.Router();
const {
  signupRec,
  signinRec,
  getOneRec,
  getAllRec,
  DeleteOneRec,
} = require("../controllers/Recruteur");
const isAuthRec = require("../middleware/isAuthRec");

const {
  registerValidation,
  validation,
  signinValidation,
} = require("../middleware/Recruteur");
const Offre = require("../models/offre");
const Recruteur = require("../models/Recruteur");

// sign in
router.post("/signuprec", registerValidation(), validation, signupRec);
router.post("/signinrec", signinValidation(), validation, signinRec);
router.get("/", getAllRec);

router.get("/currentRecruteur", isAuthRec, getOneRec);
router.delete("/:id", DeleteOneRec);

module.exports = router;
