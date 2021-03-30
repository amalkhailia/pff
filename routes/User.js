// express require
const express= require ('express');
const router = express.Router();
 const {signinCand, signupCand} = require ('../controllers/User');
const isAuthUser = require('../middleware/isAuthUser');
const { registerValidation, validation, signinValidation } = require('../middleware/User');


// sign un
router.post("/signupcand",registerValidation(),validation, signupCand)
// sign ip
router.post("/signincand",signinValidation(),validation,signinCand)

router.get("/currentUser",isAuthUser,(req,res)=>{
    res.send(req.user)
})
module.exports=router;