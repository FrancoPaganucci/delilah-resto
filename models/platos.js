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