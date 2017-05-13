let express = require('express');
let path = require('path');
let WATSON = require('./watson');
module.exports = (app) => {
  app.get('/', (req, res) => {
    // WATSON.tone({ text: 'A word is dead when it is said, some say. Emily Dickinson' },
    // function(err, tone) {
    //   if (err){
    //     console.log(err)
    //     res.send(err);
    //   }
    //   else{
    //     res.send(JSON.stringify(tone, null, 2));
    //   }
    // });
    res.send('HOME')
  })
}