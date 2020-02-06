const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateNewUser = require('./validateNewUser')


const {jwtSecret} = require('../config/secret');

const Users = require('../users/user-model')

router.post('/signup', validateNewUser, (req, res) => {
    //const { username, password, email, firstName, lastName } = req.body;
    const user = req.body;
    console.log(user);
    const hash = bc.hashSync(user.password, 10);
    user.password = hash;
    
  
      Users.add(user)
        .then(newUser => {
            console.log(newUser)
            res.status(201).json({
              user: newUser[0].username,
              id: newUser[0].id,
              message: `Welcome to Spotify ${newUser[0].firstName}`
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