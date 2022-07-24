const POSTperson = require("../controllers/post-person.js");
const GETperson = require("../controllers/get-person.js");
const DELETEdbdata = require("../controllers/delete-db.js");
const POSTcreaterelationship = require("../controllers/post-create-relationship.js");
const GETrecommendations = require("../controllers/get-recommendations.js");

const routes = [
  {
    baseURL: "/person",
    controller: POSTperson,
  },
  {
    baseURL: "/person",
    controller: GETperson,
  },
  {
    baseURL: "/clean",
    controller: DELETEdbdata,
  },
  {
    baseURL: "/relationship",
    controller: POSTcreaterelationship,
  },
  {
    baseURL: "/recommendations",
    controller: GETrecommendations,
  },
];

module.exports = routes;
