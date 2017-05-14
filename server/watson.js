const watson = require('watson-developer-cloud');
const tone_analyzer = watson.tone_analyzer({
  username: '40f26cf0-4ac5-4db1-a72d-ecac530f9e83',
  password: 'c32JVLTp5Orh',
  version: 'v3',
  version_date: '2016-05-19'
});

const watsonParserWholeDocument = (arr) => {
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

const handleMessages = (user, messages) => {
  return new Promise((resolve, reject) => {
    let result = [];
    messages.map(message => {
      if(message) {
        result.push(analyze(message))
      }
    })
    Promise.all(result).then(res => resolve({user: user, tones:res}))
  })
};

const analyze = (message) => {
  return new Promise((resolve,reject) => { tone_analyzer.tone({text: message}, (err,tone) => {
    if(err){
      reject(err)
    } else {
      let parsed = watsonParserWholeDocument(tone)
      resolve(parsed)
    }
  })})
};

const getWatsonAnalysis = (messages) => {
  messages.forEach(message => {
    tone_analyzer.tone({text: message}, (err,tone) => {
      if(err){
        console.log(err)
      } else {
        let parsed = watsonParserWholeDocument(tone)
        userObj.tones.push(parsed);
      }
    })
  })
};

const analyzeText = (slackData) => {
  if(Array.isArray(slackData)) {
    let result = []
    let i = 0;
    slackData.forEach(userData => {
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
};

const getSentimentsForAllUsers = (userData) => {
  let promises = [];
  userData.forEach(user => {
    promises.push(getSentimentsForUser((user)));
  });
  return Promise.all(promises);
};

const filterMessagesArray = messages => {
  let result = [];
  messages.forEach(message => {
    if(!message.includes('joined') && !message.includes('left') && !message.includes('integration')){
      result.push(message);
    }
  })
  return result;
}

const getSentimentsForUser = ({user, messages}) => {
  messages = filterMessagesArray(messages);
  if(messages.length > 0){
    messages = messages.join('\n');
    return toneAnalyzer(messages)
    .then(res => ({tone_categories: res.document_tone.tone_categories}))
    .then(res => ({user: user, sentiments: res.tone_categories}))
    .then(res => {
      let tones = { user: user };
      res.sentiments.forEach(sentiment => {
        tones[sentiment.category_id] = sentiment.tones;
      })
      return tones;
    })
  }
};

const toneAnalyzer = (message) => {
  return new Promise((resolve, reject) => {
    tone_analyzer.tone({text: message}, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
};

module.exports = {
  getSentimentsForAllUsers,
};