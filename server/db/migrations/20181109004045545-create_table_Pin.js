/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('pins', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },

    image_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    user_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('pins'),
};
