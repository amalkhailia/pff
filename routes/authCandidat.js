// express require
const express= require ('express')
const router = express.Router();
 const {signinCand, signupCand} = require ('../controllers/authCandidat')


// sign in
router.post("/signupcand", signupCand)
// sign up
router.post("/signincand", signinCand)


module.exports=router;