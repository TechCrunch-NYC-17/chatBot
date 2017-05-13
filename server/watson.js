const watson = require('watson-developer-cloud');

let tone_analyzer = watson.tone_analyzer({
  username: '40f26cf0-4ac5-4db1-a72d-ecac530f9e83',
  password: 'c32JVLTp5Orh',
  version: 'v3',
  version_date: '2016-05-19'
});

module.exports = tone_analyzer;