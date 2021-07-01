const Rol = require('./rol');
const Usuario = require('./usuario');
const Pedido = require('./pedido');
const Plato = require('./plato');
const PedidoHasPlatos = require('./pedidos-has-platos');


Usuario.belongsTo(Rol, {
    foreignKey: "rols_id"
});

Usuario.hasMany(Pedido, {
    foreignKey: "usuarios_id"
});

// permite traer un objeto del usuario que hizo el pedido, importante para el dashboard
Pedido.belongsTo(Usuario, {
    foreignKey: "usuarios_id"
});

// !!!!!
Pedido.belongsToMany(Plato, {
    through: PedidoHasPlatos
})

PedidoHasPlatos.belongsTo(Pedido, {
    foreignKey: "pedidos_id"
});
PedidoHasPlatos.belongsTo(Plato, {
    foreignKey: "platos_id"
});

// Patrón de "decorador", importo, decoro con relaciones, vuelvo a exportar
module.exports = { Rol, Usuario, Pedido, Plato, PedidoHasPlatos };