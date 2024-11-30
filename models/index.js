const { Chat } = require("./chat");
const { Message } = require("./message");
const { User } = require("./user");

Chat.hasMany(Message);
Message.belongsTo(Chat);

User.hasMany(Message);
Message.belongsTo(User);

module.exports = {
  Chat,
  Message,
  User,
};
