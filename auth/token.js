const jwt = require('jsonwebtoken');
const db = require('../data/db-config');

const secret = process.env.JWT_SECRET;

async function generateToken(user){
    console.log('gadsgasdgasdhsadhsd')
    console.log(secret);
    const payload = {
        subject: user.id,
    };

    const options = {
        expiresIn: "24h"
    };

    return jwt.sign(payload, secret, options);
}

module.exports = {
    secret,
    generateToken
}