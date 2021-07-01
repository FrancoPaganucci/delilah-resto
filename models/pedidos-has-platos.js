const { DataTypes } = require('sequelize');
const sequelize = require('./../config');
const Pedido =require("./pedido");
const Plato = require('./plato');


const PedidoHasPlatos = sequelize.define('PedidoHasPlatos', {
    cantidad: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    /*pedidos_id: {
        field: "pedidos_id",
        type: DataTypes.NUMBER,
        notNull: true,
        references: {
            model: Pedido,
            key: "id"
        }
    },
    platos_id: {
        field: "platos_id",
        type: DataTypes.NUMBER,
        notNull: true,
        references: {
            model: Plato,
            key: "id"
        }
    }*/
}, {
    timestamps: false,
    tableName: "pedidos_has_platos",
    modelName: "pedido_has_platos",
    sequelize
})

module.exports = PedidoHasPlatos;