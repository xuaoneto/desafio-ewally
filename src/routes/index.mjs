import POSTperson from "../controllers/post-person.mjs";
import GETperson from "../controllers/get-person.mjs";

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
    controller: ,
  },
];
export default routes;
