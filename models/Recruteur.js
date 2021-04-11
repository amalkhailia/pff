const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RecruteurSchema = new Schema({
  matricule: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: "recruteur" },

  offres: [{ type: Schema.Types.ObjectId, ref: "offre" }],
});

module.exports = User = model("recruteur", RecruteurSchema);
