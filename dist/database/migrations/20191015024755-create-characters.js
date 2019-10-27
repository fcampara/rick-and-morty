"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('characters', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_character_original: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dimensions_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      episode: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('characters')
  }
}
