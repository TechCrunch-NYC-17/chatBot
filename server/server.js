const express = require('express');
const path = require('path')
const router = require('./routes.js')
const app = express();
const dbHelper = require('./dbHelper.js');
import { getUserPublicMessages } from "./services/slack/slack-messages-service";

require('./routes.js')(app);

app.post('/add/user', function(req, res){
  console.log('add/user');
  dbHelper.addUser(req.body, res);
});

app.post('/add/channel', function(req, res){
  console.log('add/user');
  dbHelper.addChannel(req.body, res);
});

const port = process.env.PORT || 3000;

app.listen(port,(err) => {
  console.log("Listening on port " + port);
});