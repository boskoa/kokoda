const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Message extends Model {}

Message.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "message",
  },
);

module.exports = { Message };
