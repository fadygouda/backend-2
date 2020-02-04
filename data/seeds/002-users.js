const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([

        {
          "username": "janeDoe",
          "password": bcrypt.hashSync('abc123', 8),
          "email": "janedoe@gmail.com",
          "firstName": "jane",
          "lastName": "doe",
        }

        
      ]);
    });
};
