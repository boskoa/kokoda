const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("chats", "name", {
      type: DataTypes.STRING,
      unique: true,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("chats", "name", {
      type: DataTypes.STRING,
      validate: { len: [1, 20] },
    });
  },
};
