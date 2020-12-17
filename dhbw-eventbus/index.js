// simple node.js application to receive data from clients and keep this data in memeory

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    // push the events to in memory data
    events.push(event);

    // forward the event to the display service
    axios.post('http://' + process.env.DISPLAYDATA_HOST + ':' + process.env.DISPLAYDATA_PORT + '/events', event);
    console.log("event received",event);
    res.send({status: 'ok event rec. and forwarded'});
});

//  list the events when a get request is received
app.get('/events', (req, res) => {
  console.log(events);
  res.send(events);
});

app.listen(process.env.EVENTBUS_PORT, () => {
    console.log('Listening on ' + process.env.EVENTBUS_HOST + ' on port ' +  process.env.EVENTBUS_PORT);
});