const express = require("express");
const { personService } = require("../services/person-service.js");

const router = express.Router();

router.post("/", (req, res) => {
  const { cpf1, cpf2 } = req.body;
  const resultCpf1 = personService.getPersonByCpf(cpf1);
  const resultCpf2 = personService.getPersonByCpf(cpf2);

  if (resultCpf1 && resultCpf2 && cpf1 !== cpf2) {
    personService.addRelationship(cpf1, cpf2);
    res.status(200).json({ response: "created" });
  } else {
    res
      .status(404)
      .json({ response: "insert two different and existing cpfs" });
  }
});

module.exports = router;
