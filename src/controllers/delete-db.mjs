import express from "express";
import db from "../database/global-variables.mjs";

const router = express.Router();

router.delete("/:cpf", (req, res) => {
  res.status(200).json({ response: "deleted data" });
});

export default router;
