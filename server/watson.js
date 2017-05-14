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
    messages.map(message => result.push(analyze(message)))
    Promise.all(result).then(res => resolve({user: user, tones:res}))
  })
}

const analyze = (message) => {
  return new Promise((resolve,reject) => { tone_analyzer.tone({text: message}, (err,tone) => {
    if(err){
      reject(err)
    } else {
      let parsed = watsonParserWholeDocument(tone)
      // console.log('Parsed: ', parsed);
      resolve(parsed)
    }
  })})
}

const analyzeText = (slackData) => {
  if(Array.isArray(slackData)){
    let result = []
    // console.log('SlackData: ',slackData);
    slackData.map(userData =>{
      // console.log('userData: ', userData)
      let userObj = {user: userData.user, tones:[]};
      // let temp = [];
      result.push(handleMessages(userData.user,userData.messages))
    })
    return Promise.all(result).then(help => {
      console.log('help: ', help)
      return help
    });
  } else {
    tone_analyzer.tone({text: slackData}, (err, tone) => {
      if (err){
        console.log(err)
        return err;
      }
      else{
        return watsonParserWholeDocument(tone);
      }
    })
  }
}



module.exports = {
  analyzeText,
};