const { DataTypes } = require('sequelize');
const sequelize = require('..');

const Plato = sequelize.define('plato', {
    nombre: {
        type: DataTypes.STRING,
        notNull: true
    },
    precio: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    activo: {
        type: DataTypes.TINYINT,
        notNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        notNull: true
    },

}, {
    timestamps: false,
    tableName: "platos",
    modelName: "plato",
    sequelize
})

module.exports = Plato;