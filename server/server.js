const express = require('express');
const path = require('path')
const router = require('./routes.js')
const app = express();
const dbHelper = require('./dbHelper.js');
import { getChannelUsers } from "./services/slack/slack-user-service.js";

require('./routes.js')(app);

app.post('/add/user', function(req, res){
  dbHelper.addUser(req.body, res);
});

app.post('/add/channel', function(req, res){
  console.log('add/user');
  dbHelper.addChannel(req.body, res);
});

app.get('/get/users', function(req, res) {
  getChannelUsers()
  .then(res =>{
    console.log('res', res)
  });
})

const port = process.env.PORT || 3000;

app.listen(port,(err) => {
  console.log("Listening on port " + port);
});
