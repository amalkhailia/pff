const User = require("../models/User");
const Cv = require("../models/cv");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.signupCand = async (req, res) => {
  try {
    //   req.body
    const { firstName, lastName, email, password } = req.body;

    // check if the email is not found in the database
    const FoundUser = await User.findOne({ email });

    if (FoundUser) {
      res.status(400).send({
        errors: [{ msg: "user already exist email should be unique" }],
      });
      return;
    }
    const newUser = new User({ firstName, lastName, email, password });

    // hash the password
    const hashedpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashedpassword;
    // create a key using json webtoken
    const token = await jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY
    );

    await newUser.save();

    res.status(200).send({ msg: "user saved succ", user: newUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};
exports.signinCand = async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchUser = await User.findOne({ email }).populate("cv");
    const cv = await Cv.findOne({ id_user: searchUser._id });
    searchUser.cv = cv;

    // send an error if he didnt exist
    if (!searchUser) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // check if the send it password is equal to the current Password
    const hashedpass = searchUser.password;
    const result = await bcrypt.compare(password, hashedpass);
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // create a key using json webtoken
    const token = await jwt.sign(
      {
        id: searchUser._id,
      },
      process.env.SECRET_KEY
    );
    // send the details + token
    res
      .status(200)
      .send({ msg: "login successfully", user: searchUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "bad credential" }] });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const UserToFind = await (
      await User.findOne({ _id: req.user._id })
    ).populate("id_user");
    const cv = await Cv.find({ id_user: req.user._id });
    UserToFind.cv = cv;
    res.status(200).send({ msg: "I get the user ...", UserToFind });
  } catch (error) {
    res.status(400).send({ msg: `can not find the user ${error}` });
  }
};
