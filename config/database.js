const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:password@localhost:5432/assignments_db', {
    dialect: 'postgres',
});

module.exports = { sequelize };
