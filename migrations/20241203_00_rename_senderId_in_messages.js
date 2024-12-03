module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("messages", "sender_id", "user_id");
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("messages", "user_id", "sender_id");
  },
};
