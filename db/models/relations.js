const Rol = require('./rol');
const Usuario = require('./usuario');
const Pedido = require('./pedido');
const Plato = require('./plato');
const PedidoHasPlatos = require('./pedidos-has-platos');

Usuario.belongsTo(Rol, {
    foreignKey: "rols_id"
});

PedidoHasPlatos.belongsTo(Pedido, {
    foreignKey: "pedidos_id"
});
PedidoHasPlatos.belongsTo(Plato, {
    foreignKey: "platos_id"
});


module.exports = { Rol, Usuario, Pedido, Plato, PedidoHasPlatos };