const mongoose = require('mongoose');
mongoose.connect('mongodb://techcrunchslackapp:techcrunchslackapp1@ds149700.mlab.com:49700/chatbot');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  messages: []
});
const User = mongoose.model('User', userSchema);

const messageSchema = new Schema({
  message: String
});
const Message = mongoose.model('Message', messageSchema);

const channelSchema = new Schema({
  message: String
});
const Channel = mongoose.model('Message', channelSchema);

module.exports = {User: User, Message: Message};
