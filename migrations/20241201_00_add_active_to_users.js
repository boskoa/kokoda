const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "active", {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "active");
  },
};
