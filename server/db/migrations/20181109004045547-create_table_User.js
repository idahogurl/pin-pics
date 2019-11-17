/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },

    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    screen_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    pin_id: {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
