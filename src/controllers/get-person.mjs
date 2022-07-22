import express from "express";
import db from "../database/global-variables.mjs";

const router = express.Router();

router.get("/:cpf", (req, res) => {
  res.status(200).json(db);
});

export default router;
