const { Model, DataTypes } = require("sequelize");

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "chats",
      key: "id",
    },
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
