<<<<<<< HEAD
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

=======
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

>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
module.exports = Roles;