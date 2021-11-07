const express = require("express");

const offre = require("../models/offre");
const controllers = require("../controllers/offre");
const isAuthRec = require("../middleware/isAuthRec");
const { offreValidation, validation } = require("../middleware/offre");
const isAuthUser = require("../middleware/isAuthUser");
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
/*
router.put("/postuler/:id", isAuthUser, async (req, res) => {
  try {
    const offrechoisi = await offre.findByIdAndUpdate(
      { _id: req.params },
      { $push: { candidats: req.user._id } }
    );
    res.status(200).send({ msg: "offre is updated ...", offrechoisi });
  } catch (error) {
    res.status(500).send(error);
  }
});
*/
module.exports = router;
