const express = require("express");
const { personService } = require("../services/person-service.js");

const router = express.Router();

router.get("/:cpf", (req, res) => {
  const { cpf } = req.params;
  const isValid = personService.validateCpf(cpf, false).status === "valid";
  if (!isValid) {
    res.status(400).json({ response: "cpf pattern error" }).end();
  }
  const registration = personService.getPersonByCpf(cpf);

  if (registration) {
    const recommendations = personService.getRecommendations(cpf);
    res.status(200).json(recommendations);
  } else {
    res.status(404).json({ response: "cpf not found" });
  }
});

module.exports = router;
