const router = require('express').Router();
const userDb = require('../users/users-model.js');
const db = require('../data/db-config');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const myNumber = process.env.MY_PHONE;
const client = require('twilio')(accountSid, authToken);



router.post('/text', async (req, res) => {
    const {number, message, api_key} = req.body;

    if (api_key === process.env.TOP_SECRET_PASSCODE && number.length === 10){
        client.messages
        .create({
            body: message,
            from: twilioNumber,
            to: number,
        });
        res.status(200).json({message: 'Messages sent successfully'});
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});

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
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/ExtremeHot', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const hot = {extremeHot: false} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, hot)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'IT TOO HOT DONT GO OUT THERE',
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
                res.status(404).json({message: `No users found matching ${city} and hot alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/HighWinds', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const wind = {highWinds: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, wind)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'TOO WINDY, UNACCEPTABLE RISK OF LOSING COOL HAT',
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
                res.status(404).json({message: `No users found matching ${city} and wind alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/HeavyRain', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const rain = {heavyRain: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, rain)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'FREE SHOWER',
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
                res.status(404).json({message: `No users found matching ${city} and rain alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/Lightning', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const lightning = {lightning: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, lightning)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'NO ROOF GOLF TODAY',
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
                res.status(404).json({message: `No users found matching ${city} and lightning alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/Hail', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const hail = {hail: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, hail)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'BASKETBALL SIZED ICE FALLING FROM SKY',
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
                res.status(404).json({message: `No users found matching ${city} and hail alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/FlashFlooding', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const flood = {flashFlooding: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, flood)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'ANGRY SWIMMING POOLS EVERYWHERE',
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
                res.status(404).json({message: `No users found matching ${city} and flood alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/SnowShowers', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const snow = {snowShowers: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, snow)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'IT WILL BE OKAY PLEASE DRIVE THE SPEED LIMIT',
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
                res.status(404).json({message: `No users found matching ${city} and snow alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/Blizzard', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const blizz = {blizzard: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, blizz)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'NOT VIDEO GAMES OR ICE CREAM JUST A BAD TIME',
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
                res.status(404).json({message: `No users found matching ${city} and blizzard alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});
router.post('/Tornado', async (req, res) => {
    const {city, api_key} = req.body;
    const cityObj = {city: city};
    const tornado = {tornado: true} ;

    // console.log('accountsid', accountSid)
    // console.log(api_key, process.env.TOP_SECRET_PASSCODE);
    if (api_key === process.env.TOP_SECRET_PASSCODE){
        userDb.findByMultiple(cityObj, tornado)
        .then(users => {
            if (users.length > 0){
                console.log('USERS RES: ', users);
                for (let i = 0; i < users.length; i++){
                    // console.log('number: ' + `+1${users[i].phonenumber}`);
                    client.messages
                    .create({
                        body: 'INCREASED CHANCE OF FLYING COWS.',
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
                res.status(404).json({message: `No users found matching ${city} and tornado alert`})
            }
        })
        .catch(error => {
            console.log(error);
          res.status(500).json(error);
        });
    }
    else{
        res.status(403).json({ message: 'Invalid Squall api_key' });
    }
});

module.exports = router;