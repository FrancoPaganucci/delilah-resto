const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // el '/index/' al ser "index" es opcional

const Roles = sequelize.define('roles', {
    nombre: {
        type: DataTypes.STRING,
        notNull: true
    }
}, {
    timestamps: false,
    tableName: "roles",
    /*modelName: "rol",
    sequelize*/
})

module.exports = Roles;