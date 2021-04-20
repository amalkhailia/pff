const Offre = require("../models/offre");
// const {id_rec} = require ('../middleware/isAuthRec')

exports.postOffre = async (req, res) => {
  try {
    const newOffre = new Offre({ ...req.body, id_rec: req.recruteur._id });

    const offre = await newOffre.save();
    res.status(200).send({ msg: " added successfully...", offre: offre });
  } catch (error) {
    res.status(400).send({ msg: `failed to add ${error}` });
  }
};
exports.getAllOffres = async (req, res) => {
  try {
    const listOffres = await Offre.find();

    res.status(200).send({ msg: "ad list...", listOffres });
  } catch (error) {
    res.status(400).send({ msg: `can not find list of ads ${error}` });
  }
};
exports.getOneOffre = async (req, res) => {
  try {
    const OffreToFind = await Offre.findOne({ _id: req.params.id }).populate(
      "id_rec"
    );
    res.status(200).send({ msg: "I get the ad ...", OffreToFind });
  } catch (error) {
    res.status(400).send({ msg: `can not find the ad ${error}` });
  }
};

exports.DeleteOneOffre = async (req, res) => {
  try {
    const { id } = req.params;
    const offreToDelete = await Offre.findOneAndDelete({ _id: id });
    res.status(200).send({ msg: "ad is deleted...", offreToDelete });
    if (!offreToDelete) {
      res.status(400).send({ msg: `ad already deleted ${error}` });
      return;
    }
  } catch (error) {
    res.status(400).send({ msg: `can not find the ad to delete ${error}` });
  }
};
exports.UpdateOneOffre = async (req, res) => {
  try {
    const { id } = req.params;
    const offreToEdit = await Offre.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    res.status(200).send({ msg: "ad is updated ...", offreToEdit });
  } catch (error) {
    res.status(400).send({ msg: `can not edit this ad ${error}` });
  }
};
