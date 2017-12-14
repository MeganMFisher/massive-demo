const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require('./config')

const app = express();
app.use(bodyParser.json());

const port = 3000;

massive(config.connectionString).then(db => {
  app.set('db', db);
});

app.get('/', (req, res) => {
  res.send('massive-demo');
});

app.get('/incidents', (req, res) => {
  res.send([]);
});

app.post('/incidents', (req, res) => {
  res.send({id: 123});
});

app.listen(port, () => {
  console.log('Started server on port', port);
});
