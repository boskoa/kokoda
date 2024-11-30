const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [2, 20] },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [2, 30] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    blockedUsers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "user",
  },
);

module.exports = { User };
