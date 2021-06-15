const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // el '/index/' al ser "index" es opcional

const Rol = sequelize.define('rol', {
    nombre: {
        type: DataTypes.STRING,
        allowNull = false
    }
}, {
    timestamps: false,
    tableName: "roles"
})

module.exports = Rol;