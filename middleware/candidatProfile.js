const { validationResult, check } = require("express-validator");

exports.profileValidation = () => [
  check("cin", "CIN is required").not().isEmpty().isLength(8),
  check("tel", "enter a valid phone number").isLength({ min: 8 }),
  check("pays", "adress is required").not().isEmpty(),
  check("region", "adress is required").not().isEmpty(),
  check("ville", "adress is required").not().isEmpty(),
  check("code_postal", "adress is required").not().isEmpty(),
  check("nom_diplome", "diplome is required").not().isEmpty(),
  check("nom_ecole", "university is required").not().isEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
