const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require('./config')

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db')
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })

});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db')
  db.getAllIncidents().then(incidents => {
    res.send(incidents);
  })
});

app.post('/incidents', (req, res) => {
  res.send({id: 123});
});

massive(config.connectionString).then(db => {
  app.set('db', db);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});