const express = require('express');
const router = express.Router();
const dB = require('../data/dbConfig');

const Users = require('./user-model');
const restricted = require('../auth/restricted-middleware');

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
      const {id} = req.params;
      const user = req.body; 
       if (!user) {
           return res.status(400).json({ 
               errorMessage: "Please provide username, password, firs name, and last name for the user."
           })
       }
         Users.update(user)
       .then(userUpdate => {
           if(userUpdate) {
               dBase.findById(id)
                .then(user => {
                    res.status(201).json(user)
                })
           }else{
               res.status(404).json({
                   errorMessage: "The user with the specified ID does not exist."
               })
           }
       })
       .catch(err => {
           res.status(500).json({
               errorMessage: "The user information could not be modified."
           })
       })
})

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(userRemoved => {
      if (userRemoved) {
        res.status(204).json(userRemoved)
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The user could not be removed"
      })
    })


})


module.exports = router;