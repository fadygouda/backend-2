

exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 30).notNullable().unique();
      tbl.string('password', 20).notNullable();
      tbl.string('email', 128).notNullable();
      tbl.string('firstName', 128).notNullable();
      tbl.string('lastName', 255).notNullable();
  })
  .createTable('songs', tbl => {
    tbl.increments();
    tbl.string('song_title', 255).notNullable()
    tbl.string('artist').notNullable()
    tbl.boolean('favorite').defaultTo(false).notNullable()
    tbl.integer('user_id').notNullable().references('id').inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
    tbl.string('suggested_songs', 255)
    tbl.string('suggested_track_id', 255)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
    .dropTableIfExists('songs')
};
