const Recruteur = require("../models/Recruteur");
const Offre = require("../models/offre");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.signupRec = async (req, res) => {
  try {
    //   req.body
    const { matricule, firstName, lastName, email, password } = req.body;

    // check if the email is not found in the database
    const FoundRecruteur = await Recruteur.findOne({ email });

    if (FoundRecruteur) {
      res.status(400).send({
        errors: [{ msg: "account already exist email should be unique" }],
      });
      return;
    }
    const newRecruteur = new Recruteur({
      matricule,
      firstName,
      lastName,
      email,
      password,
    });

    // hash the password
    const hashedpassword = bcrypt.hashSync(password, salt);
    newRecruteur.password = hashedpassword;
    // create a key using json webtoken
    const token = await jwt.sign(
      {
        id: newRecruteur._id,
      },
      process.env.SECRET_KEY
    );

    await newRecruteur.save();

    res
      .status(200)
      .send({ msg: "user saved succ", recruteur: newRecruteur, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};

exports.signinRec = async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchRecruteur = await Recruteur.findOne({ email }).populate(
      "id_rec"
    );
    const offres = await Offre.find({ id_rec: searchRecruteur._id });
    searchRecruteur.offres = offres;

    // send an error if he didnt exist
    if (!searchRecruteur) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // check if the send it password is equal to the current Password
    const hashedpass = searchRecruteur.password;
    const result = await bcrypt.compare(password, hashedpass);
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // create a key using json webtoken
    const token = await jwt.sign(
      {
        id: searchRecruteur._id,
      },
      process.env.SECRET_KEY
    );
    // send the details + token
    res
      .status(200)
      .send({ msg: "login successfully", recruteur: searchRecruteur, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "bad credential" }] });
  }
};

//getAllRec

exports.getAllRec = async (req, res) => {
  try {
    const listRec = await Recruteur.find();
    res.status(200).send({ msg: "recruteur list...", listRec });
  } catch (error) {
    res.status(400).send({ msg: `can not find list of recruteur ${error}` });
  }
};
exports.getOneRec = async (req, res) => {
  try {
    const recruteur = await Recruteur.findOne({ _id: req.recruteur._id });
    const offres = await Offre.find({ id_rec: req.recruteur._id });
    recruteur.offres = offres;
    res.status(200).send({ msg: "I get the recruteur ...", recruteur });
  } catch (error) {
    res.status(400).send({ msg: `can not find the recruteur ${error}` });
  }
};

exports.DeleteOneRec = async (req, res) => {
  try {
    const { id } = req.params;
    const recToDelete = await Recruteur.findOneAndDelete({ _id: id });
    res.status(200).send({ msg: "recruteur is deleted...", recToDelete });
    if (!recToDelete) {
      res.status(400).send({ msg: `recruteur already deleted ${error}` });
      return;
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: `can not find the recruteur to delete ${error}` });
  }
};
