const express= require ('express');

const router = express.Router();
const {signupRec, signinRec}= require('../controllers/Recruteur');
const isAuthRec = require('../middleware/isAuthRec');
const { registerValidation, validation, signinValidation } = require('../middleware/Recruteur');

// sign in
router.post("/signuprec",registerValidation(),validation,signupRec)
router.post("/signinrec",signinValidation(),validation,signinRec)
router.get("/currentRecruteur",isAuthRec,(req,res)=>{
    res.send(req.recruteur)
})

module.exports=router;