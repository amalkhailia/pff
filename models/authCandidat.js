const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const authCandidatSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { 
      type: String,
       required: true },
  password: { 
      type: String, 
      required: true },
});

module.exports = authCandidat = model("authCandidat", authCandidatSchema);
