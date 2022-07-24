const axios = require("axios");

const baseURL = "http://localhost:3000";

const persons = [
  {
    name: "Cristina",
    cpf: "11111111111",
  },
  {
    name: "Flávio",
    cpf: "22222222222",
  },
  {
    name: "João",
    cpf: "33333333333",
  },
  {
    name: "Maria",
    cpf: "44444444444",
  },
  {
    name: "José",
    cpf: "55555555555",
  },
  {
    name: "Algusto",
    cpf: "66666666666",
  },
];

const relationships = [
  {
    cpf1: persons[0].cpf,
    cpf2: persons[1].cpf,
  },
  {
    cpf1: persons[0].cpf,
    cpf2: persons[2].cpf,
  },
  {
    cpf1: persons[0].cpf,
    cpf2: persons[3].cpf,
  },
  {
    cpf1: persons[1].cpf,
    cpf2: persons[2].cpf,
  },
  {
    cpf1: persons[1].cpf,
    cpf2: persons[3].cpf,
  },
  {
    cpf1: persons[1].cpf,
    cpf2: persons[4].cpf,
  },
  {
    cpf1: persons[2].cpf,
    cpf2: persons[3].cpf,
  },
  {
    cpf1: persons[2].cpf,
    cpf2: persons[4].cpf,
  },
  {
    cpf1: persons[2].cpf,
    cpf2: persons[5].cpf,
  },
  {
    cpf1: persons[2].cpf,
    cpf2: persons[3].cpf,
  },
  {
    cpf1: persons[2].cpf,
    cpf2: persons[4].cpf,
  },
  {
    cpf1: persons[2].cpf,
    cpf2: persons[5].cpf,
  },
];

// Create persons
async function CreatePersons() {
  for (let person of persons) {
    await axios.post(baseURL + "/person", person);
  }
}

// Create Relationship
async function CreateRelationship() {
  for (let relationship of relationships)
    await axios.post(baseURL + "/relationship", relationship);
}

// Checks
async function Checks() {
  for (let person of persons) {
    const response = await axios.get(baseURL + `/person/${person.cpf}`);
    if (response.data) {
      if (!(response.data.cpf === person.cpf && response.status === 200)) {
        throw Error("Person not Created");
      }
    }
  }
}

async function InitialData() {
  await CreatePersons();
  await Checks();
  await CreateRelationship();
}

InitialData();
