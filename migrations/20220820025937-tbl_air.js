'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_air', { 
      id_air: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tinggi_air: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      time: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('tbl_air');
  }
};
