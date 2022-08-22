'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_siram_air', { 
      id_siram: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      siram_air: {
        type: Sequelize.DataTypes.INTEGER(1),
        allowNull: false
      },
      time: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_siram_air');
  }
};
