const express = require('express');
const router = express.Router();
const dB = require('../data/dbConfig');

const Users = require('./user-model');
const restricted = require('../auth/restricted-middleware');
const bcrypt = require('bcryptjs');

router.get('/', restricted, (req, res) => {
 
 Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            errorMessage: "Error retrieving the list of users", 
            message: err.message
        })
    })
})

router.put('/:id', restricted, (req, res) => {
      const id = req.params.id;
      const userData = req.body; 
      console.log(id);
      console.log(userData);
      Users.findById(id)
      .then(u => {
          console.log(u.id);
          if(u.id == id) {
              if(userData.password){
                  const hash = bcrypt.hashSync(userData.password, 8);
                  userData.password = hash;
              }
              Users.update(id, userData)
              .then(updatedUser => {
                  res.status(201).json({message: 'User updated successfully!!!'})
              })
              .catch(err => {
                console.log(err)
                res.status(404).json({ 
                    message: 'User not found',
                    errorMessage: err.message
            })
              })
          }
      })
      .catch(err => {
          res.status(500).json({
               message: "User could not be updated",
               errorMessage: err.message
            })
      })
 })



module.exports = router;