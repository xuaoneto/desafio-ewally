import express from "express";
import { personService } from "../services/person-service.mjs";

const router = express.Router();

router.post("/", (req, res) => {
  const { cpf, name } = req.body;
  const isValid = personService.validateCpf(cpf);

  if (isValid.status === "valid") {
    personService.addPerson({ cpf, name });
    res.status(200).json({ response: `created` });
  } else {
    res.status(400).json({ response: `error: ${isValid.status}` });
  }
});

export default router;
