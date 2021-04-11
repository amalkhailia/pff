const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const isAuthAdmin = async (req, res, next) => {
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
    const admin = await Admin.findById(decoded.id).select("-password");

    // send not authorisation IF NOT USER
    if (!admin) {
      return res
        .status(400)
        .send({ errors: [{ msg: "you are not authorized" }] });
    }

    // if user exist
    req.admin = admin;

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = isAuthAdmin;
