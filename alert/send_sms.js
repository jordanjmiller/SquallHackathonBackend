const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const myNumber = process.env.MY_PHONE;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'WHO YOU CALLING SASSY I KNOW WHERE U SLEEP',
     from: twilioNumber,
     to: myNumber,
   })
  .then(message => console.log(message.sid));