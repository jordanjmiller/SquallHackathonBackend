const router = require('express').Router();
const userDb = require('../users/users-model.js');

const db = require('../data/db-config');


router.post('/ExtremeCold', async (req, res) => {
    const {city, api_key} = req.body;



    
    // try{
    //     const user = await db('users as u')
    //         .where({'u.id': req.user.id})
    //         .select('u.id', 'u.username', 'u.name', 'u.email')
    //         .first();
    //     if(user){
    //         res.status(200).json(user)
    //     }else{
    //         console.log('get user 404 error', user);
    //         res.status(404).json({message: `User with id ${req.user.id} not found.`});
    //     }
        
    // }catch(err){
    //     console.log(err);
    //     res.status(500).json({message: 'Error getting user information.'});
    // }
});

module.exports = router;