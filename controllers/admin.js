const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.signupAdmin = async (req, res) => {
  try {
    //   req.body
    const { firstName, lastName, email, password } = req.body;

    // check if the email is not found in the database
    const FoundAdmin = await Admin.findOne({ email });

    if (FoundAdmin) {
      res.status(400).send({
        errors: [{ msg: "user already exist email should be unique" }],
      });
      return;
    }
    const newAdmin = new Admin({ firstName, lastName, email, password });

    // hash the password
    const hashedpassword = bcrypt.hashSync(password, salt);
    newAdmin.password = hashedpassword;
    // create a key using json webtoken
    const token = await jwt.sign(
      {
        id: newAdmin._id,
      },
      process.env.SECRET_KEY
    );

    await newAdmin.save();

    res.status(200).send({ msg: "user saved succ", admin: newAdmin, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};
exports.signinAdmin = async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchAdmin = await Admin.findOne({ email });

    // send an error if he didnt exist
    if (!searchAdmin) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // check if the send it password is equal to the current Password
    const hashedpass = searchAdmin.password;
    const result = await bcrypt.compare(password, hashedpass);
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // create a key using json webtoken
    const token = await jwt.sign(
      {
        id: searchAdmin._id,
      },
      process.env.SECRET_KEY
    );
    // send the details + token
    res
      .status(200)
      .send({ msg: "login successfully", user: searchAdmin, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "bad credential" }] });
  }
};
