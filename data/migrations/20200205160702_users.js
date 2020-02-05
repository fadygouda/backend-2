


exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 30).notNullable().unique();
        tbl.string('password', 20).notNullable();
        tbl.string('email', 128).notNullable();
        tbl.string('firstName', 128).notNullable();
        tbl.string('lastName', 255).notNullable();
    })
        
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
