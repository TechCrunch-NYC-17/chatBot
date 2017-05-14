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

setInterval(()=>{
  let date = new Date();
  let day = date.getDay();
  let hour = date.getHours();
  let flag = false;
  if(day === 1 && (hour > 9 && hour < 10)) {
    if(!flag){
      getUserPublicMessages()
      .then(result => getSentimentsForAllUsers(result))
      .then(res => {
        res.forEach(tone => {
          getUser(tone.user)
            .then(res => {
              tone.userName = res[0].name;
              postMessage(tone.user, parseUserSentiment(tone));
              flag = true;
            })
        });
      })
      .catch((err) => console.error(err));
    }
  } else {
    flag = false;
  }
},1000*60*20);


// app.post('/add/user', function(req, res){
//   dbHelper.addUser(req.body, res);
// });

// app.post('/add/channel', function(req, res){
//   // console.log('add/user');
//   dbHelper.addChannel(req.body, res);
// });

// app.get('/get/users', function(req, res) {
//   getChannelUsers()
//   .then(res =>{
//     // console.log('res', res)
//   });
// })

const port = process.env.PORT || 3000;

app.listen(port,(err) => {
  console.log("Listening on port " + port);
});

// e.g. tone format
// const tones = [{user: 'U5BHVEU86',
//   tone: { emotion_tone:
//     { anger: 0.221577,
//       disgust: 0.31794,
//       fear: 0.078204,
//       joy: 0.025548,
//       sadness: 0.582408
//     },
//     language_tone:
//       { analytical: 0,
//         confident: 0,
//         tentative: 0.966403
//       },
//     social_tone:
//       { openness: 0.915827,
//         conscientiousness: 0.064387,
//         extraversion: 0.375757,
//         agreeableness: 0.579473,
//         emotional_range: 0.287825
//       }}}];
//
// const sendMessages = (tones) => {
//   tones.forEach(tone => {
//     postMessage(tone.user, parseUserSentiment(tone))
//   });
// }
