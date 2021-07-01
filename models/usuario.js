const { DataTypes } = require('sequelize');
const sequelize = require('./../config'); // el '/index/' al ser "index" es opcional

const Usuario = sequelize.define(
    'usuario', {
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
    sequelize
})

module.exports = Usuario;