const data = require('../data/emails.json');
const express = require('express');
const router = express.Router();
fs = require('fs');

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

router.get('/:id', function(req, res, next) {
  const email_id = req.params.id;
  const requestedEmail = data.emails.filter(email => {
    return email.id == email_id;
  });
  res.setHeader('Content-Type', 'application/json');
  console.log('requestedEmail', typeof JSON.stringify(requestedEmail));
  res.send(JSON.stringify({requestedEmail}));
});

router.post('/:id', function(req, res, next) {
  const email_id = Number(req.params.id);
  const emails = data.emails;
  const index = emails.map((e) => {return e.id}).indexOf(email_id);
  console.log('email_id', email_id);
  console.log('index', index);
  console.log('emails[index].isRead before change', emails[index].isRead);
  emails[index].isRead = !emails[index].isRead;
  console.log('emails[index].isRead after change', emails[index].isRead);
  fs.writeFile(data, emails);
  res.send(emails);
});

router.post('/send', function(req, res, next) {
  const newEmail = req.params;
});

module.exports = router;
