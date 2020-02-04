const bcrypt = require('bcryptjs')
const faker = require('faker')

const createFakeUser = () => ({
  username: faker.internet.userName(),
  password: bcrypt.hashSync("abc12345", 8),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  const fakeUsers = [];
  const desiredFakeUsers = 20;

  for(let i=0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser())
  }
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(fakeUsers);
    });
};
