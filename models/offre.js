//require mongoose 
const mongoose = require ('mongoose')

// schema

const {Schema} = mongoose
const offreSchema = new Schema({
    titre:{
        type: String,
        required: true,
        unique: true

    },
    nom_entreprise:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required: true
    },
    poste:{
        type: String,
        required: true,
    }
})
module.exports = offre = mongoose.model('offre',offreSchema)