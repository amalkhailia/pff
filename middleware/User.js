const { validationResult, check } = require("express-validator");

exports.registerValidation = () => [
  check("firstName", "name is required").not().isEmpty(),
  check("lastName", "lastname is required").not().isEmpty(),
  check("email", "enter a valid email").isEmail(),
  check("password", "enter a valid password").isLength({ min: 9 }),
];
exports.signinValidation = () => [
  check("email", "email is required").not().isEmpty(),
  check("email", "enter a valid email").isEmail(),
  check("password", "enter a valid password").isLength({ min: 9 }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};