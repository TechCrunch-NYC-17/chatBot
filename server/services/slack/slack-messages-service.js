/**
 * Created by deniztetik on 5/13/17.
 */
const WebClient = require('@slack/client').WebClient;
const _ = require('lodash');

import { SLACK_API_TOKEN } from '../../config/SLACK_API_TOKEN';

const web = new WebClient(SLACK_API_TOKEN);

/**
 *  Fetches all messages grouped by user
 *  e.g. [{user: 'U1925EOUP' messages: ['hello', 'goodbye', 'thank you', etc..]}, etc..]
 */
export const getUserPublicMessages = () => {
  return getChannelHistories()
    .then(logs => {
      return logs.map(log => log.messages);
    })
    .then(messages => {
      return _.flatMap(messages).reduce((userMessages, message) => {
        if (!_.find(userMessages, {user: message.user})) {
          userMessages.push({user: message.user, messages: [message.text]});
        } else {
          _.find(userMessages, {user: message.user}).messages.push(message.text);
        }
        return userMessages
      }, []);
    })
};


/**
 *  Fetches the chat history for all public
 *  Slack channels
 */

const getChannelHistories = () => {
  return getAllChannels()
    .then(channels => {
      let histories = [];
      channels.forEach(channel => {
        histories.push((webChannelsHistory(channel.id)));
      });
      return Promise.all(histories);
    });
}



const getAllChannels = () => {
    return webChannelsList()
      .then(info => info.channels);
}

/**
 *  Converts web.channels.list to promise
 *  Fetches all channels
 *
 */

const webChannelsList = () => {
  return new Promise((resolve, reject) => {
    web.channels.list((err, info) => {
      if (err) {
        reject('Error: ', err);
      } else {
        resolve(info);
      }
    });
  });
}


/**
 *  Converts web.channels.history to promise
 *
 */

const webChannelsHistory = (channel) => {
  return new Promise((resolve, reject) => {
    web.channels.history(channel, (err, info) => {
      if (err) {
        reject('Error: ', err);
      } else {
        resolve(info);
      }
    });
  });
}

getUserPublicMessages()
.then(res => console.log(res));