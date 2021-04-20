const Cv = require("../models/cv");
const User = require("../models/User");

/**
 * @desc : add cv
 * @path : 'http://localhost:5000/api/cv/'
 * @method : POST
 * @data : req.body
 * @access: public
 */
exports.postCv = async (req, res) => {
  try {
    const newCv = new Cv({ ...req.body, id_user: req.user._id });
    await User.updateOne({ _id: req.user._id }, { $set: { cv: newCv._id } });
    const cv = await newCv.save();
    res.status(200).send({ msg: "cv created successfully...", cv: cv });
  } catch (error) {
    res.status(400).send({ msg: `can not create this CV ${error}` });
  }
};

/**
 * @desc : get all cv
 * @path : 'http://localhost:5000/api/cv/'
 * @method : GET
 * @data : req.body
 * @access: public
 */
exports.getAllCv = async (req, res) => {
  try {
    const listCv = await Cv.find();
    res.status(200).send({ msg: "list of Cv...", listCv });
  } catch (error) {
    res.status(400).send({ msg: `can not find list of Cv ${error}` });
  }
};

/**
 * @desc : get one Cv
 * @path : 'http://localhost:5000/api/Cv/:id'
 * @method : GET
 * @data : req.params
 * @access: public
 */
exports.getOneCv = async (req, res) => {
  try {
    const cvToFind = await Cv.findOne({ _id: req.params.id }).populate(
      "id_user"
    );
    res.status(200).send({ msg: "I get the cv ...", cvToFind });
  } catch (error) {
    res.status(400).send({ msg: `can not find the cv ${error}` });
  }
};

/**
 * @desc : Delete one cv
 * @path : 'http://localhost:5000/api/cv/:id'
 * @method : DELETE
 * @data : req.params
 * @access: public
 */
exports.DeleteOneCv = async (req, res) => {
  try {
    const { id } = req.params;
    const cvToDelete = await Cv.findOneAndDelete({ _id: id });
    res.status(200).send({ msg: "cv is deleted...", cvToDelete });
    if (!cvToDelete) {
      res.status(400).send({ msg: `cv already deleted ${error}` });
      return;
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: `can not find the candidat to delete ${error}` });
  }
};

/**
 * @desc : Update one cv
 * @path : 'http://localhost:5000/api/cv/:_id'
 * @method : PUT
 * @data : req.params && req.body
 * @access: public
 */
exports.UpdateOneCv = async (req, res) => {
  try {
    const { id } = req.params;
    const cvToEdit = await Cv.updateOne({ _id: id }, { $set: { ...req.body } });
    res.status(200).send({ msg: "cv is updated ...", cvToEdit });
  } catch (error) {
    res.status(400).send({ msg: `can not edit this cv ${error}` });
  }
};
/*exports.addOffreToCv = async (CvId, ad) => {
  try {
    await Cv.updateOne({ _id: CvId }, { $push: { ads: ad._id } });
    res.status(200).send("saved");
  } catch (error) {
    console.log("can not save");
  }
};*/
