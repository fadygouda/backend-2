
exports.seed = function (knex) {
  // Resets back to 1 
  return knex('songs').del()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        {
          song_title: "If It Isn't Love",
          artist: "New Edition",
          favorite: "true",
          user_id: 1
        },
        {
          song_title: "Pretty Young Thing",
          artist: "Michael Jackson",
          favorite: "true",
          user_id: 1
        },
        {
          song_title: "Bring Me To Life",
          artist: "Evanescence",
          favorite: "true",
          user_id: 1
        }
      ]);
    });
};
