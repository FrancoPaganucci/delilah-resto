const Rol = require('./rol');
const Usuario = require('./usuario');

Usuario.belongsTo(Rol, {
    foreignKey: "roles_id"
});

module.exports = { Rol, Usuario };