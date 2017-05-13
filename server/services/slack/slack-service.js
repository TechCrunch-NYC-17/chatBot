/**
 * Created by deniztetik on 5/13/17.
 */
const WebClient = require('@slack/client').WebClient;

const token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

const web = new WebClient(token);

web.channels.list(function(err, info) {
    if (err) {
        console.log('Error:', err);
    } else {
        for(const i in info.channels) {
            console.log(info.channels[i].name);
        }
    }
});