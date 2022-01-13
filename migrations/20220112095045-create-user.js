'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: Sequelize.Datatypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.Datatypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.Datatypes.STRING,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
