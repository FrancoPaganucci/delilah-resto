const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // el '/index/' al ser "index" es opcional

const Usuarios = sequelize.define(
    'Usuario', {
    usuario: {
        type: DataTypes.STRING,
        notNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        notNull: true
    },
    correo: {
        type: DataTypes.STRING,
        notNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        notNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        notNull: true
    },
    contrasena: {
        type: DataTypes.STRING,
        notNull: true
    },

}, {
    timestamps: false,
    tableName: "usuarios",
    modelname: "usuario",
    underscored: true,
    sequelize
})

module.exports = Usuarios;