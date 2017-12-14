const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require('./config')

const app = express();
app.use(bodyParser.json());

const port = 3001;

app.get('/', (req, res) => {
  const db = req.app.get('db')
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })

});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db')
  const { state } = req.query;
  if(state) {
    //If there is a state query do this:
    db.getIncidentsByState(state).then(incidents => {
      res.send(incidents);
    })
  } else {
    //If there is not a query do this:
    db.getAllIncidents().then(incidents => {
      res.send(incidents);
    })
  }
});


app.post('/incidents', (req, res) => {
  const db = req.app.get('db')
  const {state, injuryid, causeid} = req.body;
  db.createIncident([state, injuryid, causeid]).then(results => {
    res.send(results[0]);
  })
});

app.patch('/incidents/:id', (req, res) => {
  const db = req.app.get('db')
  const { state } = req.body
  db.updateIncident([state, req.params.id]).then(results => {
    res.send(results);
  })
})

app.delete('/incidents/:id', (req, res) => {
  const db = req.app.get('db')
  db.deleteIncident(req.params.id).then(results => {
    res.send(results);
  })
})


massive(config.connectionString).then(db => {
  app.set('db', db);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});