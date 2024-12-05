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
    name: {
      type: DataTypes.STRING,
      unique: true,
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
    group: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
