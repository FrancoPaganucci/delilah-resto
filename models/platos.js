<<<<<<< HEAD
<<<<<<<< HEAD:models/platos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Platos = sequelize.define('platos', {
    nombre: {
        type: DataTypes.STRING,
        notNull: true
    },
    precio: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        notNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        notNull: true
    },

}, {
    timestamps: false,
    tableName: "platos",
    underscored: true
})

module.exports = Platos;
========
const { DataTypes } = require('sequelize');
const sequelize = require('..');

const Plato = sequelize.define('plato', {
=======
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Platos = sequelize.define('platos', {
>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
    nombre: {
        type: DataTypes.STRING,
        notNull: true
    },
    precio: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    activo: {
<<<<<<< HEAD
        type: DataTypes.TINYINT,
=======
        type: DataTypes.BOOLEAN,
>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
        notNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        notNull: true
    },

}, {
    timestamps: false,
    tableName: "platos",
<<<<<<< HEAD
    modelName: "plato",
    sequelize
})

module.exports = Plato;
>>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5:db/models/plato.js
=======
    underscored: true
})

module.exports = Platos;
>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
