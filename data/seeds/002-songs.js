
exports.seed = function(knex) {
  // Resets back to 1 
  return knex('songs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('songs').insert([
        {
          id: 1, 
          user_id: 2,
          song_title: "If It Isn't Love",
          artist: "New Edition",
          favorite: "true"
        },
        {
          id: 2, 
          user_id: 3,
          song_title: "Pretty Young Thing",
          artist: "Michael Jackson",
          favorite: "true",
        },
        {
          id: 3, 
          user_id: 1,
          song_title: "Bring Me To Life",
          artist: "Evanescence",
          favorite: "true"
        }
      ]);
    });
};
