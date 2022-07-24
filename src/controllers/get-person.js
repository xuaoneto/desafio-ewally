const express = require("express");
const { personService } = require("../services/person-service.js");

const router = express.Router();

router.get("/:cpf", (req, res) => {
  const { cpf } = req.params;
  const result = personService.getPersonByCpf(cpf);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ response: "cpf not found" });
  }
});

module.exports = router;
