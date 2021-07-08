const { DataTypes } = require('sequelize');
const sequelize = require('./../config');
const Pedidos =require("./pedidos");
const Platos = require('./platos');


const PedidosHasPlatos = sequelize.define('PedidosHasPlatos', {
    pedidos_id: {
        field: "pedidos_id",
        type: DataTypes.INTEGER,
        notNull: true,
        references: {
            model: Pedidos,
            key: "id"
        }
    },
    platos_id: {
        field: "platos_id",
        type: DataTypes.INTEGER,
        notNull: true,
        references: {
            model: Platos,
            key: "id"
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        notNull: true
    }
}, {
    timestamps: false,
    tableName: "pedidos_has_platos",
    underscored: true,
    sequelize
})


module.exports = PedidosHasPlatos;