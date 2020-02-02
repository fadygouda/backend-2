
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 255).notNullable();
  })
  .createTable('songs', tbl => {
    tbl.increments();
    tbl.integer('user_id').notNullable().references('id').inTable('users')
    tbl.string('song_title', 255).notNullable()
    tbl.string('artist').notNullable()
    tbl.boolean('favorite').defaultTo(false).notNullable()
  })
  .createTable('users_songs', tbl => {
    tbl.increments()
    tbl.integer('user_id').references('id').inTable('users')
    tbl.integer('song_id').references('id').inTable('songs')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
    .dropTableIfExists('songs')
};
