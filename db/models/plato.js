const { DataTypes } = require('sequelize');
const sequelize = require('..');

const Plato = sequelize.define('plato', {
    nombre: {
        type: DataTypes.STRING,
        allowNull = false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull = false
    },
    activo: {
        type: DataTypes.TINYINT,
        allowNull = false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull = false
    },

}, {
    timestamps: false,
    tableName: "platos",
    modelName: "plato",
    sequelize
})

module.exports = Plato;