const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userDb = require('./users-model');

const db = require('../data/db-config');

router.put('/user', async (req, res) => {
    const {email, name} = req.body;
    const newValues = {email};
    Object.keys(newValues).forEach(key => newValues[key] === undefined && delete newValues[key])
    
    for(let val in newValues){
        if(typeof newValues[val] === 'string'){
            newValues[val] = newValues[val].toLowerCase();
        } 
    };

    let {password} = req.body;
    const {newPassword} = req.body;
    
    try{
        if (!password){
            throw 4
        }

        if(email){
            const foundEmail = await db('users')
            .where({email: newValues.email})
            .first();

            if(foundEmail && foundEmail.email !== newValues.email){
                throw 3
            }
        }

        const user = await db('users')
            .where({id: req.user.id})
            .first();

        if(user && bcrypt.compareSync(password, user.password)){
            console.log(password)
            if(newPassword){
                password = bcrypt.hashSync(newPassword, 8);
            }
            const updated = await userDb.update(req.user.id, newPassword ? {...newValues, password} : {...newValues});
            if(updated){
                const updatedUser = await userDb
                .findBy({id: req.user.id})
                .select('id', 'email');
                
                res.status(200).json({...updatedUser});
            }else{
                throw 'User could not be updated'
            }
        }else{
            throw 4
        }
    }catch(err){
        console.log(err);
        switch(err){
            case 3: 
                res.status(422).json({message: `There is already an account associated with that email`});
                break;                
            case 4: 
                res.status(403).json({message: 'Invalid credentials.'});
                break;
            default:  res.status(500).json({message: 'Error updating user.'});
        }
    }
});

router.get('/user', async (req, res) => {
    try{
        const user = await db('users as u')
            .where({'u.id': req.user.id})
            .select('u.id', 'u.email')
            .first();
        if(user){
            res.status(200).json(user)
        }else{
            console.log('get user 404 error', user);
            res.status(404).json({message: `User with id ${req.user.id} not found.`});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error getting user information.'});
    }
});

router.delete('/user', async (req, res) => {
    const {password} = req.body;
    // console.log('password', password);
    // console.log(req.body);
    // console.log(req.body.password);
    try{
        if(password){
            const user = await db('users')
            .where({id: req.user.id})
            .first();

            if(user && bcrypt.compareSync(password, user.password)){
                await userDb.remove(req.user.id);
                res.status(200).json({message: 'User successfully deleted'});
            }else{
                throw 1
            }
        }else{
            throw 2
        }
    }catch(err){
        if(err === 1){
            res.status(403).json({message: 'Invalid credentials.'});
        }else if(err === 2){
            res.status(400).json({message: 'Please provide password.'});
        }
        res.status(500).json({message: 'Error deleting user.'});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const user = await userDb.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            throw 404;
        }
    }catch(err){
        console.log(err);
        switch(err){
            case 404: res.status(404).json({message: 'User with specified ID not found'});
                break;
            default: res.status(500).json({message: 'Error getting user information'});
                break;
        }
    }
});

module.exports = router;