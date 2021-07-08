<<<<<<< HEAD
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

=======
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

>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
module.exports = sequelize;