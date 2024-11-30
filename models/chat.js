const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    admins: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "chat",
  },
);

module.exports = { Chat };
