const supertest = require("supertest");
const { describe, it, expect } = require("@jest/globals");
const createServer = require("../utils/server");

const app = createServer();

// Initial data
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

// Initial data
const relationships = [
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

// Testes
describe("POST Create Person", () => {
  it("normal", async () => {
    const { status } = await supertest(app).post("/person").send({
      cpf: "12345678931",
      name: "Cristina",
    });
    expect(status).toBe(200);
  });
  it("INVALID CPF", async () => {
    const { status } = await supertest(app).post("/person").send({
      cpf: "1234567893!1",
      name: "Cristina",
    });
    expect(status).toBe(400);
  });
  it("Repeated CPF", async () => {
    const { status } = await supertest(app).post("/person").send({
      cpf: "12345678931",
      name: "Cristina",
    });
    expect(status).toBe(400);
  });
});

describe("GET Person", () => {
  it("normal", async () => {
    const { status, body } = await supertest(app).get("/person/12345678931");
    expect(status).toBe(200);
    expect(body.cpf).toBe("12345678931");
  });
  it("NOT REGISTERED CPF", async () => {
    const { status, body } = await supertest(app).get("/person/12312312312");
    expect(status).toBe(404);
    expect(body.response).toBe("cpf not found");
  });
});

describe("POST Create Relationship", () => {
  it("INSERT INITIAL DATA", async () => {
    for (let person of persons)
      await supertest(app).post("/person").send(person);
    for (let relationship of relationships)
      await supertest(app).post("/relationship").send(relationship);
  });
  it("normal Relationship Test", async () => {
    const { status } = await supertest(app).post("/relationship").send({
      cpf1: "11111111111",
      cpf2: "22222222222",
    });
    expect(status).toBe(200);
  });
});

describe("GET Recommendations", () => {
  it("normal", async () => {
    const { status, body } = await supertest(app).get(
      "/recommendations/11111111111"
    );
    expect(status).toBe(200);
    expect(body[0]).toBe("55555555555");
    expect(body[1]).toBe("66666666666");
  });
  it("REGEX TEST CPF", async () => {
    const { status } = await supertest(app).get("/recommendations/1111111111!");
    expect(status).toBe(400);
  });
  it("NOT FOUND CPF TEST", async () => {
    const { status } = await supertest(app).get("/recommendations/11111111112");
    expect(status).toBe(404);
  });
});

describe("DELETE Clean DB data", () => {
  it("normal", async () => {
    const { status } = await supertest(app).delete("/clean");
    expect(status).toBe(200);
  });
  it("GET After deleted data", async () => {
    const { body } = await supertest(app).get("/person/11111111111");
    expect(body.response).toBe("cpf not found");
  });
});
