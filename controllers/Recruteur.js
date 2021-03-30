const Recruteur = require ("../models/Recruteur")
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.signupRec = async(req,res) => {
    try {
      //   req.body
      const { matricule,firstName, lastName, email, password } = req.body;

// check if the email is not found in the database
const FoundRecruteur = await User.findOne({ email });

if (FoundRecruteur) {
res.status(400).send({
 errors: [{ msg: "account already exist email should be unique" }],
});
return;
}
const newRecruteur = new Recruteur({ matricule, firstName, lastName, email, password });

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

res.status(200).send({ msg: "user saved succ", recruteur: newRecruteur, token});
} catch (error) {
res.status(400).send({ errors: [{ msg: "can not save the user" }] });
}
};

exports.signinRec =  async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchRecruteur = await Recruteur.findOne({ email });

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
res.status(200).send({ msg: "login successfully", user: searchRecruteur,token });
} catch (error) {
  res.status(400).send({ errors: [{ msg: "bad credential" }] });
}
};