"use strict";
const Model = require('./database.js');
const ObjectId = require('mongoose').Types.ObjectId;
const http = require('http');
const request = require("request");

const dbFunc = {
  addUser: function(user, res) {
    console.log('user', user)
      let newUser = new Model.User(user);
      newUser.find({name: newUser.name}, (user, err) => {
        if(!user) {
          newUser.save(function(err){
            if(err) {
              console.log('error in saving the hash to database');
            }else{
              // res.status(200).send('user added to DB');
            }
          });          
        }
      })
  },
  getUsers: function(req, res) {
    Model.User.find({}, function(err, found) {
      if(err){
        console.log('error in fetching hashes', err);
      }
      res.send(found);
    });
  },
  addMessage: function(message, res) {
      let newMessage= new Model.Message(message);
      newMessage.save(function(err){
        if(err) {
          console.log('error in saving the hash to database');
        }else{
          res.status(200).send('message added to DB');
        }
      });
  },
  getMessage: function(req, res) {
    Model.Message.find({}, function(err, found) {
      if(err){
        console.log('error in fetching hashes', err);
      }
      res.send(found);
    });
  },
  addChannel: function(channel, res) {
      let newUser = new Model.User(user);
      newChannel.save(function(err){
        if(err) {
          console.log('error in saving the hash to database');
        }else{
          res.status(200).send('user added to DB');
        }
      });
  },
  getChannel: function(req, res) {
    Model.Channel.find({}, function(err, found) {
      if(err){
        console.log('error in fetching hashes', err);
      }
      res.send(found);
    });
  }
};

module.exports = dbFunc;
