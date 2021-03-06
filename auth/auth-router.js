const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../data/db-config.js');
const Users = require('../users/users-model.js');
const {generateToken} = require('./token.js');

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log('before', email);
    console.log('after', email.toLowerCase())
    if(email && password){
        const hash = bcrypt.hashSync(password, 14);
        Users.add({ ...req.body, email: email.toLowerCase(), password: hash })
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
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password, req.body);
    if(email && password){
        const user = await db('users as u').where({'u.email': email.toLowerCase()})
            .select('u.*')
            .first();
            console.log('init user: ', user);
        if(user && bcrypt.compareSync(password, user.password)){
            console.log('if user: ', user);
            const token = await generateToken(user);
            res.status(200).json({message: `Welcome ${email.toLowerCase()}`, token, user: {...user, password: undefined}});
        }else{
            console.log('else user: ', user);
            res.status(403).json({message: 'Invalid email or password'});
        }
    }else{
        res.status(400).json({message: 'Please provide a email and password'});
    }
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