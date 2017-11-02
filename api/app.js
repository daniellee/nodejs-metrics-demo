'use strict';

const metrics = require('./metrics-client');
const express = require('express');
const { performance } = require('perf_hooks');
const app = express();
const port = 3500;
let responseTime = Math.random() * 3000;

app.use(function profilerMiddleware(req, res, next) {
  const start = performance.now();

  res.once('finish', () => {
    const routename = req.path.replace('/', '');
    const timing = performance.now() - start;
    
    //Send timer metric to statsd
    metrics.global.timing('api.route.' + routename + '.latency.total', timing);

    //Send counter metric for status code count to statsd    
    metrics.global.increment('api.requests.' + res.statusCode);
  });

  next();
});

app.get('/home', (request, response) => {
  //reset response time
  responseTime = Math.random() * 3000;

  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({text: 'HomePageVisited'}));
  metrics.global.increment('api.route.home.visit');
});

app.get('/slow', (request, response) => {
  responseTime += (Math.random() - 0.5) * 500;

  sleep(responseTime, function() {
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({responseTime: responseTime}));

    //Send counter metric to statsd
    metrics.global.increment('api.route.slow.visit');
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});

function sleep(time, callback) {
  var stop = new Date().getTime();
  while(new Date().getTime() < stop + time) {
      ;
  }
  callback();
}
