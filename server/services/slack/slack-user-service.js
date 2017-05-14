/**
 * Created by deniztetik on 5/13/17.
 */
const WebClient = require('@slack/client').WebClient;
const _ = require('lodash');

const token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

const web = new WebClient(token);

export const getChannelUsers = () => {
  getAllUsers().then(users=> {
    console.log('this is the returned users');
  })
};

const getAllUsers = () => {
  return webChannelsUsers().then(users => users);
}

/**
 *  Converts web.channels.list to promise
 *  Fetches all channels
 *
 */

 const webChannelsUsers = () => {
   return new Promise((resolve, reject) => {
     web.users.list((err, users) => {
       if (err) {
         reject('Error: ', err);
       } else {
         resolve(users);
       }
     });
   });
 }
