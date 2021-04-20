// express
const express = require("express");
const controllers = require("../controllers/Cv");
const {
  profileValidation,
  validation,
} = require("../middleware/candidatProfile");
const isAuthUser = require("../middleware/isAuthUser");
const router = express.Router();

// post Cv
router.post(
  "/",
  profileValidation(),
  validation,
  isAuthUser,
  controllers.postCv
);
//get  all Cvs
router.get("/", controllers.getAllCv);
// get one Cv
router.get("/:id", controllers.getOneCv);

//delete Cv
router.delete("/:id", controllers.DeleteOneCv);

//edit Cv
router.put("/:id", controllers.UpdateOneCv);

//router.put("/:id", controllers.addOffreToCv);

module.exports = router;
