const { DataTypes } = require('sequelize');
const sequelize = require('..'); // el '/index/' al ser "index" es opcional

const Rol = sequelize.define('rol', {
    nombre: {
        type: DataTypes.STRING,
        allowNull = false
    }
}, {
    timestamps: false,
    tableName: "roles",
    modelName: "rol",
    sequelize
})

module.exports = Rol;