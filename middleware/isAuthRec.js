const jwt = require("jsonwebtoken");
const Recruteur = require("../models/Recruteur");
const Offre = require("../models/offre");

const isAuthRec = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];
    // if the token is undefined =>

    if (!token) {
      return res
        .status(400)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    // search the user
    const recruteur = await Recruteur.findById(decoded.id)
    .select("-password");

    // send not authorisation IF NOT USER
    if (!recruteur) {
      return res
        .status(400)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }

    // if user exist
    req.recruteur = recruteur;

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = isAuthRec;
