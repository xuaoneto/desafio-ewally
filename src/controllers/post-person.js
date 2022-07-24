const express = require("express");
const { personService } = require("../services/person-service.js");

const router = express.Router();

router.post("/", (req, res) => {
  const { cpf, name } = req.body;
  const isValid = personService.validateCpf(cpf);

  if (isValid.status === "valid") {
    personService.addPerson({ cpf, name });
    res.status(200).json({ response: `created` });
  } else {
    res.status(400).json({ response: `${isValid.status}` });
  }
});

module.exports = router;
