'use strict';

const StatsD = require('node-statsd');
const Promise = require('bluebird');

Promise.promisifyAll(StatsD.prototype);

const prefix = 'oredev';
const host = '127.0.0.1';
const options = {
  prefix,
  host,
};

const client = new StatsD(options);
  

function increment(name, value, sampleRate, tags) {
  return client.incrementAsync(name, value, sampleRate, tags);
}

function decrement(name, value, sampleRate, tags) {
  return client.decrementAsync(name, value, sampleRate, tags);
}

function timing(name, value, sampleRate, tags) {
  return client.timingAsync(name, value, sampleRate, tags);
}

function gauge(name, value, sampleRate, tags) {
  return client.gaugeAsync(name, value, sampleRate, tags);
}

function histogram(name, value, sampleRate, tags) {
  return client.histogramAsync(name, value, sampleRate, tags);
}

function set(name, value, sampleRate, tags) {
  return client.setAsync(name, value, sampleRate, tags);
}

function unique(name, value, sampleRate, tags) {
  return client.uniqueAsync(name, value, sampleRate, tags);
}

module.exports = {
  global: {
    increment: increment,
    decrement: decrement,
    timing: timing,
    gauge: gauge,
    histogram: histogram,
    set: set,
    unique: unique
  },
  local: {}
};
