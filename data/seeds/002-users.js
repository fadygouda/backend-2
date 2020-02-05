const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "whitley",
          password: bcrypt.hashSync("abc123", 6),
          email: "whitley@gmail.com",
          firstName: "Whitley",
          lastName: "Gilbert"
        },
        {
          username: "kimberly",
          password: bcrypt.hashSync("abc123", 6),
          email: "danny@gmail.com",
          firstName: "Kimberly",
          lastName: "Reese"
        },
        {
          username: "dwayne",
          password: bcrypt.hashSync("abc123", 6),
          email: "dwayne@gmail.com",
          firstName: "Dwayne",
          lastName: "Wayne"
        }
      ]);
    });
};
