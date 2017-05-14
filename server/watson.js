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
    obj[a.category_name] = {};
    a.tones.forEach(tone => {
      obj[a.category_name][tone.tone_name] = tone.score
    })
  });
  return obj
};

const analyzeText = (message) => {
  if(Array.isArray(message)){
    console.log(array);
  } else {
    tone_analyzer.tone({text: message}, (err, tone) => {
      if (err){
        console.log(err)
        res.send(err);
      }
      else{
        console.log(watsonParserWholeDocument(tone))
        return watsonParserWholeDocument(tone);
      }
    })
  }
}


module.exports = {
  analyzeText,
  // watsonParserWholeDocument
};