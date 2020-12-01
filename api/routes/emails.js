const data = require('../data/emails.json');
const sentemails = require('../data/sentemails.json');
const deletedemails = require('../data/deletedemails.json');
const spamemails = require('../data/spamemails.json');
const archivedemails = require('../data/archivedemails.json');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

router.get('/email/:id', (req, res, next) => {
  const email_id = req.params.id;
  const requestedEmail = data.filter(email => {
    return email.id == email_id;
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({requestedEmail}));
});

router.put('/edit/:id', (req, res, next) => {
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
  const email_id = Number(req.params.id);
  const index = data.map((e) => {return e.id}).indexOf(email_id);
  const deletedEmail = data.splice(index, 1);
  const lastDeletedIndex = deletedemails.length;
  deletedEmail.id = lastDeletedIndex;
  deletedemails.push(deletedEmail);
  fs.writeFile('../api/data/emails.json', JSON.stringify(data), 'utf8', err => {
    if(err) throw err;
    console.log('Deleted email removed from emails successfully');
  });
  fs.writeFile('../api/data/deletedemails.json', JSON.stringify(deletedemails), 'utf8', err => {
    if(err) throw err;
    console.log('Deleted emails saved to deleted folder successfully');
  });
  res.status(201).send(deletedEmail);
})

router.put('/spam/:id', (req, res, next) => {
  const email_id = Number(req.params.id);
  const index = data.map((e) => {return e.id}).indexOf(email_id);
  const spamEmail = data.splice(index, 1);
  const lastSpamIndex = spamemails.length;
  spamEmail.id = lastSpamIndex;
  spamemails.push(spamEmail);
  fs.writeFile('../api/data/emails.json', JSON.stringify(data), 'utf8', err => {
    if(err) throw err;
    console.log('Spam email removed from emails successfully');
  });
  fs.writeFile('../api/data/spamemails.json', JSON.stringify(spamemails), 'utf8', err => {
    if(err) throw err;
    console.log('Spam emails saved to spam folder successfully');
  });
  res.status(201).send(deletedEmail);
})

router.put('/archive/:id', (req, res, next) => {
  const email_id = Number(req.params.id);
  const index = data.map((e) => {return e.id}).indexOf(email_id);
  const archivedEmail = data.splice(index, 1);
  const lastArchiveIndex = archivedemails.length;
  archivedEmail.id = lastArchiveIndex;
  archivedemails.push(archivedEmail);
  fs.writeFile('../api/data/emails.json', JSON.stringify(data), 'utf8', err => {
    if(err) throw err;
    console.log('Archived email removed from emails successfully');
  });
  fs.writeFile('../api/data/archivedemails.json', JSON.stringify(archivedemails), 'utf8', err => {
    if(err) throw err;
    console.log('Archived emails saved to Archived folder successfully');
  });
  res.status(201).send(archivedEmail);
})

module.exports = router;
