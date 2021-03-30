const express =require('express')

const offre = require ('../models/candidatProfile')
const controllers = require('../controllers/offre')
const router = express.Router()


// post ad
router.post('/', controllers.postOffre) 
router.get('/', controllers.getAllOffres) 



module.exports = router;