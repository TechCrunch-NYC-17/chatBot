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
    a.category_name = a.category_name.split(' ')
    a.category_name[0] = a.category_name[0].toLowerCase()
    console.log('CATEGORY Name: ', a.category_name)
    a.category_name = a.category_name.join('')
    obj[a.category_name] = {};
    a.tones.forEach(tone => {
      obj[a.category_name][tone.tone_name.toLowerCase()] = tone.score
    })
  });
  console.log('OBJ: ', obj)
  return obj
};

const analyzeText = (slackData) => {
  if(Array.isArray(slackData)){
    console.log('SlackData: ',slackData);
    slackData.map(userData =>{
      console.log('userData: ', userData)
    })
  } else {
    tone_analyzer.tone({text: slackData}, (err, tone) => {
      if (err){
        console.log(err)
        res.send(err);
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