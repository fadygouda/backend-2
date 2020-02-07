const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig");
const restricted = require("../auth/restricted-middleware");
const Suggested = require("../songs/songs-model");

//Get Suggested Songs list

router.get("/", restricted, (req, res) => {
  Suggested.findNewSongs()
    .then(songs => {
      res.status(200).json(songs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "Error retrieving the list of songs",
        message: err.message
      });
    });
});

module.exports = router;
