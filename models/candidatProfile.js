//require mongoose
const mongoose = require("mongoose");

// schema

const { Schema } = mongoose;
const candidatSchema = new Schema({
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tel: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  code_postal: {
    type: String,
    required: true,
  },
  nom_diplome: {
    type: String,
    required: true,
  },
  nom_ecole: {
    type: String,
    required: true,
  },
});
module.exports = candidat = mongoose.model("candidat", candidatSchema);
