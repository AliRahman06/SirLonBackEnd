'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_nutrisi', { 
      id_nutrisi: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tinggi_nutrisi: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      time: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_nutrisi');
  }
};
