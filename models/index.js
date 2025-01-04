const { Chat } = require("./chat");
const { Message } = require("./message");
const { Unseen } = require("./unseen");
const { User } = require("./user");

Chat.hasMany(Message);
Message.belongsTo(Chat);

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(Unseen);
Unseen.belongsTo(User);

Chat.hasMany(Unseen);
Unseen.belongsTo(Chat);

module.exports = {
  Chat,
  Message,
  User,
  Unseen,
};
