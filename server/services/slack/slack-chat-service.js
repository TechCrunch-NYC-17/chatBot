/**
 *  Converts web.chat.postMessage to promise
 *
 */
const WebClient = require('@slack/client').WebClient;
import { SLACK_API_TOKEN } from '../../config/SLACK_API_TOKEN';

const web = new WebClient(SLACK_API_TOKEN);



export const postMessage = (user, message) => {
  return new Promise((resolve, reject) => {
        web.chat.postMessage(user, message, (err, res) => {
          if (err) {
            reject('Error:', err);
          } else {
            resolve('Message sent: ', res);
          }
        });
      })
};
