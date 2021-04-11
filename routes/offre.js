const express = require("express");

const offre = require("../models/candidatProfile");
const controllers = require("../controllers/offre");
const isAuthRec = require("../middleware/isAuthRec");
const { offreValidation, validation } = require("../middleware/offre");
const router = express.Router();

// post ad
router.post(
  "/",
  offreValidation(),
  validation,
  isAuthRec,
  controllers.postOffre
);
router.get("/", controllers.getAllOffres);
router.get("/:id", controllers.getOneOffre);
router.delete("/:id", controllers.DeleteOneOffre);
router.put("/:id", controllers.UpdateOneOffre);

module.exports = router;
