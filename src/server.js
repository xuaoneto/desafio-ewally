import express from "express";
import cors from "cors";
import routes from "./routes/index.mjs";

const app = express();
const PORT = 3000;
const HOSTNAME = "http://localhost";

app.use(cors());
app.use(express.json());

for (const route of routes) app.use(route.baseURL, route.controller);

app.use((_req, res) =>
  res.status(404).json({
    ok: "false",
    message: "Looks like you cannot be here. Try another way =)",
  })
);

app.listen(PORT).on("listening", () => {
  console.clear();
  console.log("Server is running on:", `${HOSTNAME}:${PORT}`);
});
