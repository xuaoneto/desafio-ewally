import db from "../database/global-variables.mjs";

class PersonService {
  validateCpf(cpf) {
    const reg = /^[0-9]{11}/;
    const isRepeated =
      db.persons.find((person) => person.cpf === cpf) !== undefined;

    if (isRepeated) return { status: "repeated cpf" };

    if (reg.test(cpf)) return { status: "valid" };
    else return { status: "cpf pattern error" };
  }

  addPerson(person) {
    if (person.name === undefined) person.name = "";
    db.persons.push(person);
  }
}

export const personService = new PersonService();
