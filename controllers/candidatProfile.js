const Candidat = require("../models/candidatProfile");
const Cv = require("../models/cv");

/**
 * @desc : add candidat
 * @path : 'http://localhost:5000/api/candidat/'
 * @method : POST
 * @data : req.body
 * @access: public
 */
exports.postCandidat = async (req, res) => {
  try {
    const newCandidat = new Candidat({ ...req.body });
    if (!req.body.email) {
      res.status(400).send({ msg: "email is required" });
      return;
    }
    const candidat = await Candidat.findOne({ email: req.body.email });
    if (candidat) {
      res.status(400).send("this email is already existed");
      return;
    }
    const responce = await newCandidat.save();
    res
      .status(200)
      .send({ msg: "candidat added successfully...", responce: responce });
  } catch (error) {
    res.status(400).send({ msg: `can not added this candidat ${error}` });
  }
};

/**
 * @desc : get all candidats
 * @path : 'http://localhost:5000/api/candidat/'
 * @method : GET
 * @data : req.body
 * @access: public
 */
exports.getAllCandidats = async (req, res) => {
  try {
    const listCandidat = await Candidat.find();
    res.status(200).send({ msg: "list of Candidat...", listCandidat });
  } catch (error) {
    res.status(400).send({ msg: `can not find list of Candidat ${error}` });
  }
};

/**
 * @desc : get one candidat
 * @path : 'http://localhost:5000/api/candidat/:id'
 * @method : GET
 * @data : req.params
 * @access: public
 */
exports.getOneCandidat = async (req, res) => {
  try {
    const candidatToFind = await Candidat.findOne({ _id: req.params.id });
    const cv = await Cv.find({ id_rec: req.user._id });
    candidatToFind.cv = cv;
    res.status(200).send({ msg: "I get the candidat ...", candidatToFind });
  } catch (error) {
    res.status(400).send({ msg: `can not find the candidat ${error}` });
  }
};

/**
 * @desc : Delete one candidat
 * @path : 'http://localhost:5000/api/candidat/:id'
 * @method : DELETE
 * @data : req.params
 * @access: public
 */
exports.DeleteOneCandidat = async (req, res) => {
  try {
    const { id } = req.params;
    const candidatToDelete = await Candidat.findOneAndDelete({ _id: id });
    res.status(200).send({ msg: "candidat is deleted...", candidatToDelete });
    if (!candidatToDelete) {
      res.status(400).send({ msg: `candidat already deleted ${error}` });
      return;
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: `can not find the candidat to delete ${error}` });
  }
};

/**
 * @desc : Update one contact
 * @path : 'http://localhost:5000/api/candidat/:_id'
 * @method : PUT
 * @data : req.params && req.body
 * @access: public
 */
exports.UpdateOneCandidat = async (req, res) => {
  try {
    const { id } = req.params;
    const candidatToEdit = await Candidat.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    res.status(200).send({ msg: "candidat is updated ...", candidatToEdit });
  } catch (error) {
    res.status(400).send({ msg: `can not edit this candidat ${error}` });
  }
};
