const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data
const web = new WebClient(token);



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