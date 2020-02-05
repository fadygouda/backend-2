const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {jwtSecret} = require('../config/secret');

const Users = require('../users/user-model')

router.post('/signup', (req, res) => {
    //const { username, password, email, firstName, lastName } = req.body;
    const user = req.body;
    console.log(user);
    const hash = bc.hashSync(user.password, 10);
    user.password = hash;
    
    //console.log(username, password, email, firstName, lastName)
  //Users.add({ username, password: hash, email, firstName, lastName})
      Users.add(user)
        .then(newUser => {
            console.log(newUser)
            res.status(201).json({
              user: newUser[0].username,
              id: newUser[0].id,
              message: `Welcome to Spotify ${newUser[0].username}`
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                    errorMessage: "User account could not be created",
                    message: err.message
                });
            });
        })


router.post('/signin', (req, res) => {
  let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
      console.log(user);
      if (user && bc.compareSync(password, user.password)) {
        
        const token = signToken(user);

        res.status(200).json({ 
          token: token,
          user: user.username,
          id: user.id,
          message: `Hello ${user.username}, You're logged in!`
         });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({
            errorMessage: err.message
      });
    });
});

router.put('/:id', (req, res) => {
   const id = req.params.id;
      const { username, password } = req.body; 
       if (!username || !password) {
           return res.status(400).json({ 
               errorMessage: "Please provide username and password for the user."
           })
       }
       Users.update(id, {username, password})
       .then(userUpdate => {
           if(userUpdate) {
               Users.findById(id)
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

router.delete('/:id', (req, res) => {
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

function signToken(user) {
  const payload = {
    userId: user.userId,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;