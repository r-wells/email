const data = require('../data/emails.json');
const sentemails = require('../data/sentemails.json');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

router.get('/email/:id', (req, res, next) => {
  const email_id = req.params.id;
  const requestedEmail = data.emails.filter(email => {
    return email.id == email_id;
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({requestedEmail}));
});

router.post('/edit/:id', (req, res, next) => {
  console.log('post edit called')
  const email_id = Number(req.params.id);
  const emails = data;
  const index = emails.map((e) => {return e.id}).indexOf(email_id);
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  emails[index].isRead = !emails[index].isRead;
  fs.writeFile('../api/data/emails.json', JSON.stringify(emails), 'utf8', err => {
    if(err) throw err;
    console.log('saved successfully');
  });
  res.send(emails[index]);
});

router.post('/send', (req, res, next) => {
  const newEmailID = sentemails.length;
  const newEmailData = {
    id: newEmailID,
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    message: req.body.message,
  };
  sentemails.push(newEmailData);
  fs.writeFile('../api/data/sentemails.json', JSON.stringify(sentemails), 'utf8', err => {
    if(err) throw err;
    console.log('New email saved successfully');
  });
  res.status(201).send(newEmailData);
});

router.delete('/edit/:id', (req, res, next) => {
  console.log('delete edit called');
})

module.exports = router;
