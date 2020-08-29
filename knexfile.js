// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/spotify_data.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },

    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  production: {
    client: 'pg ',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: { directory: './database/migrations' },
    seeds: { directory: './database/seeds' }
  }
};
