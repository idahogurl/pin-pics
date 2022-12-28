/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('pin', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.fn('gen_random_uuid'),
      allowNull: false,
      primaryKey: true,
    },

    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('pin'),
};
