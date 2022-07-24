const express = require("express");
const routes = require("../routes/routes");
const cors = require("cors");

function createServer(PORT = 3000, HOSTNAME = "http://localhost") {
  const app = express();
  app.use(cors());
  app.use(express.json());

  for (const route of routes) app.use(route.baseURL, route.controller);

  app.use((_req, res) =>
    res.status(404).json({
      ok: "false",
      message: "Looks like you cannot be here. Try another way =)",
    })
  );
  return app;
}

module.exports = createServer;
