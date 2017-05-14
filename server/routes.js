let express = require('express');
let path = require('path');
let WATSON = require('./watson');
module.exports = (app) => {
  app.get('/', (req, res) => {
    // res.send(WATSON.analyzeText('A word is dead when it is said, some say. Emily Dickinson'))
    res.send('Home');
  })
}