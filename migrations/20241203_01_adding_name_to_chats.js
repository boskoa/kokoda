const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("chats", "name", {
      type: DataTypes.STRING,
      validate: { len: [1, 20] },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("chats", "name");
  },
};
