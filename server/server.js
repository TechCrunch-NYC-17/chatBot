import express from 'express';
import path from 'path'
import router from './routes.js';
import dbHelper from './dbHelper.js';
import { getUserPublicMessages } from "./services/slack/slack-messages-service";
import Watson from './watson';
const app = express();

require('./routes.js')(app);

getUserPublicMessages().then(result => {
  Watson.analyzeText(result.splice(0,1))
});

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