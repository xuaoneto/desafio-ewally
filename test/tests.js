const test = require("tape");
const supertest = require("supertest");

test("GET /", (t) => {
  supertest(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.assert(res.body.message === "Funcionando!", "Funcionando!");
      t.end();
    });
});

test("GET non numeric value fails", (t) => {
  supertest(app)
    .get("/boleto/1!!ac23456789")
    .expect(400)
    .end((err, res) => {
      t.error(err, "Sem erros");
      t.end();
    });
});
