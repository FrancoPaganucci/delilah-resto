const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // el '/index/' al ser "index" es opcional

const Usuario = sequelize.define(
    'usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    timestamps: false,
    tableName: "usuarios"
})

module.exports = Usuario;