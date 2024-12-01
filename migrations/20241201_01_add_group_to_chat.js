const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("chats", "group", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("chats", "group");
  },
};
