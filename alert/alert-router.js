const router = require('express').Router();
const userDb = require('../users/users-model.js');
const db = require('../data/db-config');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const myNumber = process.env.MY_PHONE;
const client = require('twilio')(accountSid, authToken);


router.post('/ExtremeCold', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const cold = {extremeCold: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, cold)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'IT COLD STAY HOME',
                        from: twilioNumber,
                        to: `+1${users[i].phonenumber}`,
                    });

                    if (i === users.length - 1){
                    //   console.log(i, users.length-1);
                        res.status(200).json({message: 'Messages sent successfully'});
                    }
                }
            }
            else {
                res.status(404).json({message: `No users found matching ${city} and cold alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid API key' });
    }
});

module.exports = router;