const WebClient = require('@slack/client').WebClient;
import { SLACK_API_TOKEN } from '../../config/SLACK_API_TOKEN';

const web = new WebClient(SLACK_API_TOKEN);



/**
 *  Converts web.chat.postMessage to promise
 *
 */

export const postMessage = (channel, message) => {
  return new Promise((resolve, reject) => {
    web.chat.postMessage(channel, message, (err, res) => {
      if (err) {
        reject('Error:', err);
      } else {
        resolve('Message sent: ', res);
      }
    });
  });
};