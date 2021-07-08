<<<<<<< HEAD
<<<<<<<< HEAD:models/usuarios.js
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
========
const { DataTypes } = require('sequelize');
const sequelize = require('..'); // el '/index/' al ser "index" es opcional

const Usuario = sequelize.define(
    'usuario', {
=======
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // el '/index/' al ser "index" es opcional

const Usuarios = sequelize.define(
    'Usuario', {
>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
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
<<<<<<< HEAD
    sequelize
})

module.exports = Usuario;
>>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5:db/models/usuario.js
=======
    underscored: true,
    sequelize
})

module.exports = Usuarios;
>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
