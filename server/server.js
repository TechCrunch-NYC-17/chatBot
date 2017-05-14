import express from 'express';
import path from 'path'
import router from './routes.js';
import dbHelper from './dbHelper.js';
import { getUserPublicMessages } from "./services/slack/slack-messages-service";
import { getChannelUsers } from "./services/slack/slack-user-service.js";
import Watson from './watson';
const app = express();

require('./routes.js')(app);
getChannelUsers().then(users => {
  console.log('users', users)
}).catch(err => console.log(err));


getUserPublicMessages().then(result => {
  Watson.analyzeText('result.splice(0,1)')
});

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
