const { db } = require("../database/global-variables.js");
const { countOccurrences } = require("../utils/count-occurrences.js");

class PersonService {
  validateCpf(cpf, validateRepeated = true) {
    const reg = /^[0-9]{11}$/;
    if (validateRepeated) {
      const isRepeated =
        db.persons.find((person) => person.cpf === cpf) !== undefined;
      if (isRepeated) return { status: "repeated cpf" };
    }

    if (reg.test(cpf)) return { status: "valid" };
    else return { status: "cpf pattern error" };
  }

  addPerson(person) {
    if (person.name === undefined) person.name = "";
    person.friends = [];
    db.persons.push(person);
  }

  getPersonByCpf(cpf) {
    const result = db.persons.find((person) => person.cpf === cpf);
    return result;
  }

  addRelationship(cpf1, cpf2) {
    this.getPersonByCpf(cpf1).friends.push(cpf2);
    this.getPersonByCpf(cpf2).friends.push(cpf1);
  }

  getRecommendations(existingCpf) {
    const existingRegistration = this.getPersonByCpf(existingCpf);
    const { friends } = existingRegistration;
    if (!friends.length) return;
    let recommendationsList = [];
    let friendOfFriendsList = [];

    for (let friend of friends) {
      const friendOfFriends = this.getPersonByCpf(friend).friends;
      if (friendOfFriends.length) {
        friendOfFriendsList = friendOfFriendsList.concat(friendOfFriends);
      }
    }

    recommendationsList = friendOfFriendsList
      .filter(
        (curr) =>
          !friends.find((friend) => friend === curr) &&
          curr !== existingRegistration.cpf
      )
      .sort(
        (a, b) =>
          countOccurrences(friendOfFriendsList, b) -
          countOccurrences(friendOfFriendsList, a)
      );

    recommendationsList = [...new Set(recommendationsList)];

    return recommendationsList;
  }
}

const personService = new PersonService();

module.exports = { personService };
