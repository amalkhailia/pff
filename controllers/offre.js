const Offre = require('../models/offre')


exports.postOffre = async (req,res) => {
    try { 
        const newOffre = new Offre({...req.body})
        
  
   const responce = await newOffre.save()
    res.status(200).send({msg:' added successfully...',responce:responce})
    
    } catch (error) {

            res.status(400).send({msg:`failed to add ${error}`})

    }
   
}
exports.getAllOffres = async (req,res) => {
    try { 
        const listOffres = await Offre.find()
        res.status(200).send({msg:'ad list...',listOffres})

        }
    
     catch (error) {

            res.status(400).send({msg:`can not find list of ads ${error}`})

    }
   
}
