const axios = require("axios");
const app = require("../src/server");

// Testes

test("POST Create Person", (t) => {
  supertest(app)
    .post("/person", {
      cpf: "12345678921",
      name: "Cristina",
    })
    .expect(200)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.assert(res.body.response === "created", "Funcionando!");
      t.end();
    });
});

test("POST Create INVALID Person", (t) => {
  supertest(app)
    .post("/person", {
      cpf: "123456!8921",
      name: "Cristina",
    })
    .expect(400)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.end();
    });
});

test("GET Person", (t) => {
  supertest(app)
    .get("/person/12345678921")
    .expect(200)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.assert(res.body.cpf === "12345678921", "Funcionando!");
      t.end();
    });
});

test("GET NOT FOUND Person", (t) => {
  supertest(app)
    .get("/person/23757483784")
    .expect(404)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.end();
    });
});
