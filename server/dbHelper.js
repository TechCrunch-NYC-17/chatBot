"use strict";
const Model = require('./database.js');
const ObjectId = require('mongoose').Types.ObjectId;
const http = require('http');
const request = require("request");

const dbFunc = {
  addUser: function(user, res) {
      let newUser = new Model.User(user);
      newUser.save(function(err){
        if(err) {
          console.log('error in saving the hash to database');
        }else{
          res.status(200).send('user added to DB');
        }
      });
  },
  getUsers: function(req, res) {
    Model.User.find({}, function(err, found) {
      if(err){
        console.log('error in fetching hashes', err);
      }
      res.send(found);
    });
  }
};

module.exports = dbFunc;
