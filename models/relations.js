<<<<<<< HEAD
const Roles = require('./roles');
const Usuarios = require('./usuarios');
const Pedidos = require('./pedidos');
const Platos = require('./platos');
const PedidosHasPlatos = require('./pedidos-has-platos');


Usuarios.belongsTo(Roles, {
    foreignKey: "rols_id"
});

Usuarios.hasMany(Pedidos, {
    foreignKey: "usuarios_id"
});

// permite traer un objeto del usuario que hizo el pedido, importante para el dashboard
Pedidos.belongsTo(Usuarios, {
    foreignKey: "usuarios_id"
});

// !!!!!
Pedidos.belongsToMany(Platos, {
    through: PedidosHasPlatos
})

// Patrón de "decorador", importo, decoro con relaciones, vuelvo a exportar
=======
const Roles = require('./roles');
const Usuarios = require('./usuarios');
const Pedidos = require('./pedidos');
const Platos = require('./platos');
const PedidosHasPlatos = require('./pedidos-has-platos');


Usuarios.belongsTo(Roles, {
    foreignKey: "rols_id"
});

Usuarios.hasMany(Pedidos, {
    foreignKey: "usuarios_id"
});

// permite traer un objeto del usuario que hizo el pedido, importante para el dashboard
Pedidos.belongsTo(Usuarios, {
    foreignKey: "usuarios_id"
});

// !!!!!
Pedidos.belongsToMany(Platos, {
    through: PedidosHasPlatos
})

// Patrón de "decorador", importo, decoro con relaciones, vuelvo a exportar
>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
module.exports = { Roles, Usuarios, Pedidos, Platos, PedidosHasPlatos };