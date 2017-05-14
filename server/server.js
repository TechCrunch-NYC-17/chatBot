import express from 'express';
import path from 'path'
import router from './routes.js';
import dbHelper, { getUser } from './dbHelper.js';
import { getUserPublicMessages } from "./services/slack/slack-messages-service";
import { getChannelUsers } from "./services/slack/slack-user-service.js";
import Watson, {getSentimentsForAllUsers} from './watson';
const app = express();
import { postMessage } from "./services/slack/slack-chat-service";
import { parseUserSentiment } from './services/misc/parse-user-sentiment-service';
require('./routes.js')(app);

/**
 * getsAllUsers from Channel and stores in database
 */
getChannelUsers().then(users => {
  users.forEach((user, idx) => {
    if(user){
      let userObj = {
        name: user.name,
        slackId: user.id,
        teamId: user.team_id
      }
      dbHelper.addUser(userObj)
    }
  })
}).catch(err => console.log(err));

/**
 * setInterval will run every 20 minutes and check for the day and hour
 * It will dispatch the stats for a user every Monday between 9 and 10am
 */
// setInterval(()=>{
//   let date = new Date();
//   let day = date.getDay();
//   let hour = date.getHours();
//   let flag = false;
//   if(day === 1 && (hour > 9 && hour < 10)) {
//     if(!flag){
      getUserPublicMessages()
      .then(result => getSentimentsForAllUsers(result))
      .then(res => {
        res.forEach(tone => {
          if(tone){
            getUser(tone.user)
            .then(res => {
              tone.userName = res[0].name;
              postMessage(tone.user, parseUserSentiment(tone));
              // flag = true;
            })
          }
        });
      })
      .catch((err) => console.error(err));
//     }
//   } else {
//     flag = false;
//   }
// },1000*60*20);

const port = process.env.PORT || 3000;

app.listen(port,(err) => {
  console.log("Listening on port " + port);
});
