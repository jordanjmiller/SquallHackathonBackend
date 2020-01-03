const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let { email, password } = req.body;
  
    if(email && password){
        const hash = bcrypt.hashSync(password, 14);
        Users.add({ ...req.body, password: hash })
          .then(user => {
                console.log(res.data)
                res.status(200).json({ message: `User created successfully` });
          })
          .catch(error => {
              console.log(error);
            res.status(500).json(error);
          });
    }
  }); 

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    // console.log('req body',req.body);
    // console.log('email', email);
    // console.log('password',password);

  
    Users.findBy({ email })
      .then(user => {
        // check that passwords match
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.email = email;
            res.status(200).json({ message: `Welcome ${user.firstname}!` });
        } else {
          // we will return 401 if the password or username are invalid
          // we don't want to let attackers know when they have a good username
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
          console.log(error);
        res.status(500).json(error);
      });
  }); 

  router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json({message: 'error logging out'});
            }else{
                res.status(200).json({message: 'farewell my good friend'});
            }
        });
    }else{
        res.status(400).json({message: 'you are already logged out'});
    }
})


module.exports = router;