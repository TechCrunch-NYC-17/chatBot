const watson = require('watson-developer-cloud');

const tone_analyzer = watson.tone_analyzer({
  username: '40f26cf0-4ac5-4db1-a72d-ecac530f9e83',
  password: 'c32JVLTp5Orh',
  version: 'v3',
  version_date: '2016-05-19'
});

const watsonParserWholeDocument = (arr) => {
  console.log('arr', arr)
  let obj = {};
  arr.document_tone.tone_categories.forEach(a=>{
    a.category_name = a.category_name.replace(' ','_').toLowerCase()
    obj[a.category_name] = {};
    a.tones.forEach(tone => {
      obj[a.category_name][tone.tone_name.toLowerCase()] = tone.score
    })
  });
  return obj
};

const getWatsonAnalysis = (messages) => {
  messages.forEach(message => {
    console.log('Message: ', message)
    tone_analyzer.tone({text: message}, (err,tone) => {
      if(err){
        console.log(err)
      } else {
        let parsed = watsonParserWholeDocument(tone)
        console.log('Parsed: ', parsed);
        userObj.tones.push(parsed);
      }
    })
  })
}


const analyzeText = (slackData) => {
  if(Array.isArray(slackData)) {
    let result = []
    console.log('SlackData: ', slackData);
    let i = 0;
    slackData.forEach(userData => {
      console.log('userData: ', userData)
      result.push(
        getSentimentsForUser(userData.messages)
          .then(res => res.map(message => watsonParserWholeDocument(message)))
          .then(res => {
            return {user: userData.user, tones: getSentimentsForUser(res)};
          })
          .catch(err => console.error(err))
      );

    });
    return Promise.all(result);
  }
}
//
//
//       let promises = [];
//       userData.messages.forEach(message => {
//         console.log('Message: ', message)
//         promises.push(toneAnalyzer(message))
//         // tone_analyzer.tone({text: message}, (err,tone) => {
//         //   console.log("getting here");
//         //   if(err){
//         //     console.log(err)
//         //   } else {
//         //     let parsed = watsonParserWholeDocument(tone)
//         //     console.log('Parsed: ', parsed);
//         //     userObj.tones.push(parsed);
//         //     result.push(userObj);
//         //   }
//         //   i++;
//         // })
//       })
//       Promise.all(promises)
//         .then((res) => {
//
//           });
//       console.log('USER_OBJ: ', userObj);
//     });
//     while (true) {
//       if (i === slackData.length) {
//         console.log(i);
//         console.log('RESULT: ', result)
//         return result;
//       }
//     }
//   } else {
//     tone_analyzer.tone({text: slackData}, (err, tone) => {
//       if (err){
//         console.log(err)
//         return err;
//       }
//       else{
//         return watsonParserWholeDocument(tone);
//       }
//     })
//   }
// }


// const getSentimentsForAllUsers = (slackData) => {
//   let promises = [];
//   slackData.forEach(({user, messages}) => {
//     promises.push(getSentimentsForUser(user, messages));
//   });
//   return Promise.all(promises);
// }

const getSentimentsForAllUsers = (userData) => {
  let promises = [];
  userData.forEach(user => {
    promises.push(getSentimentsForUser((user)));
  });
  return Promise.all(promises);
}


const getSentimentsForUser = ({user, messages}) => {
  messages = messages.join('\n');
  return toneAnalyzer(messages)
    .then(res => ({tone_categories: res.document_tone.tone_categories}))
    .then(res => ({user: user, sentiments: res.tone_categories}))
    .then(res => {
      let tones = { user: user };
      res.sentiments.forEach(sentiment => {
        tones[sentiment.category_id] = sentiment.tones;
      })
      return tones
    })
}

const toneAnalyzer = (message) => {
  return new Promise((resolve, reject) => {
    tone_analyzer.tone({text: message}, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

//figure out how to keep reference for user
// getSentimentsForUser({user: 'U1EGV90', messages: ['hello', 'thank you', 'suckit']})
  // .then(res => console.log(res));
//
// getSentimentsForAllUsers([{user: 'U1EGV90', messages: ['hello', 'thank you', 'suckit']}, {user: 'U2EVIO2', messages: ['hai', 'bai', 'welx']}])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

module.exports = {
  getSentimentsForAllUsers,
};