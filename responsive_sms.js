const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser'); //needed to parse http request body info where we grab the FromCountry attribute from

const app = express();

app.use('/sms', bodyParser.urlencoded({ extended: true})); //required to obtain FromCountry info of person sending sms

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Hi! It looks like your phone number was born in ' + req.body.FromCountry); //message sent back from app via Twilio

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});