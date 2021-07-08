const { Sequelize, DataTypes, Model } = require('sequelize');
//const { database } = require('./config'); ===> Este archivo con las variables de entorno ya no es necesario

const {DB_SERVER,DB_USER,DB_NAME,DB_PASS} = process.env;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_SERVER,
        dialect: "mysql"
    }
);

module.exports = sequelize;