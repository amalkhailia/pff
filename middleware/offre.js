const { validationResult, check } = require("express-validator");

exports.offreValidation = () => [
  check("titre", "title is required").not().isEmpty(),
  check("nom_entreprise", "name is required").not().isEmpty(),
  check("description", "description is required").not().isEmpty(),
  check("adresse", "adress is required").not().isEmpty(),
  check("poste", "poste is required").not().isEmpty(),
  check("domaine", "domain is required").not().isEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
