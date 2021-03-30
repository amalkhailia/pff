// express
const express =require('express')
const candidat = require ('../models/candidatProfile')
const controllers = require('../controllers/candidatProfile')
const { profileValidation, validation } = require('../middleware/candidatProfile')

const router = express.Router()


// post candidat
router.post('/',profileValidation(),validation, controllers.postCandidat) 
//get  all candidats
router.get('/', controllers.getAllCandidats) 
// get one candidat
router.get('/:id', controllers.getOneCandidat) 

//delete candidat
router.delete('/:id', controllers.DeleteOneCandidat) 


//edit candidat
router.put('/:id', controllers.UpdateOneCandidat)



module.exports = router;