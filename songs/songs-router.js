const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig");
const restricted = require("../auth/restricted-middleware");
const Songs = require("../songs/songs-model");

//Get songs list

router.get('/', restricted, (req, res) => {

    Songs.find()
        .then(songs => {
            res.status(200).json(songs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errorMessage: "Error retrieving the list of songs",
                message: err.message
            })
        })
})

//Retrieve song by id

router.get('/:id', restricted, (req, res) => {
    const id = req.params.id;

    Songs.findById(id)
        .then(songs => {
            const song = songs[0];

            if (song) {
                res.json(song);
            } else {
                res.status(404).json({
                    errorMessage: 'Could not find song'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "Song ID cannot be retrieved",
                message: err.message
            })
        })
})

//Retrieve Suggested Song List 

router.get('/suggested-songs', restricted, (req, res) => {
    
    Songs.findNewSongs()
        .then(newSongs => {
            res.status(200).json(newSongs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errorMessage: "Error retrieving the list of songs",
                message: err.message
            })
        })

});


//Add a song

router.post('/', restricted, (req, res) => {
    const songData = req.body;
    
    Songs.insert(songData)
        .then(id => {
            res.status(201).json({created: id })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errorMessage: "Song could not be created",
                message: err.message
            });
        });
})

router.get('/suggested-songs', restricted, (req, res) => {

})

module.exports = router;
