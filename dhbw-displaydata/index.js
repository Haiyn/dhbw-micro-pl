// simple node.js application to receive data  from eventbus store the data in memory
//   and on get request print the data to console.log

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Measurement = require('./models/measurement.js').Measurement;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const measurements = {};
const connectionString = buildConnectionString();

// Connect to MongoDB with a retry function incase mongodb is not ready yet
let connect = function() {
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch((e) => {
        console.log("Couldn't connect to MongoDB: " + e)
        setTimeout(connect, 3000)
    });
};
connect();

// get request received - print the measurement data to console log and return it to requester
app.get('/data',(req,res)=> {
    console.log(measurements);
    res.send(measurements);
}); 

// post event is received from eventbus - so put the data into memory
app.post('/events',(req,res)=> {
  const { type, measurementdata } = req.body;

  console.log(type); 
  console.log(measurementdata);
  
  const { id, data } = measurementdata;
  
  // save data in memory
  measurements[id] = { id, data };
  console.log(data);

  // and in database
  const model = new Measurement({
      id, data
  });

  model.save(function (e) {
      if (e) {
          console.log("ERROR: Couldn't save to MongoDB:" + e);
          return res.status(500).send();
      }
      // show saved entry
      Measurement.find(function (e, measurements) {
          if (e) {
              console.log("ERROR: Could not retrieve saved measurements from MongoDB: " + e);
              return res.status(500).send();
          }
          console.log(measurements);
      });
  });



  res.send({});
});

app.listen(process.env.DISPLAYDATA_PORT, () => {
    console.log('Listening on ' + process.env.DISPLAYDATA_HOST + ' on port ' + process.env.DISPLAYDATA_PORT);
});

function buildConnectionString() {
    let connectionString = "mongodb://";
    if(process.env.MONGO_INITDB_USERNAME !== '') {
        connectionString += process.env.MONGO_INITDB_USERNAME;
        if(process.env.MONGO_INITDB_PASSWORD !== '') {
            connectionString += ':' + process.env.MONGO_INITDB_PASSWORD;
        }
        connectionString += '@'
    }
    // we have to use the container name as a host name
    connectionString += process.env.MONGO_INITDB_HOST + ":" + process.env.MONGO_INITDB_PORT + "/" + process.env.MONGO_INITDB_DATABASE
    console.log("Built connection string: " + connectionString);
    return connectionString;
}

process.on('uncaughtException', err => {
    console.log(`Uncaught Exception: ${err.message}`)
    process.exit()
});