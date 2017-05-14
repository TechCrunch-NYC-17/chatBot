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

const analyzeText = (slackData) => {
  if(Array.isArray(slackData)){
    let result = []
    console.log('SlackData: ',slackData);
    slackData.map(userData =>{
      console.log('userData: ', userData)
      let userObj = {user: userData.user, tones:[]};
      // let temp = [];
      userData.messages.forEach(message => {
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
      console.log('USER_OBJ: ', userObj)
    })
    console.log('RESULT: ', result)
    return result;
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