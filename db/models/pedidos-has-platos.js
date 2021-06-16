const { DataTypes } = require('sequelize');
const sequelize = require('..');

const PedidoHasPlatos = sequelize.define('PedidoHasPlatos', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull = false
    }
}, {
    timestamps: false,
    tableName: "pedidos_has_platos",
    modelName: "pedido_has_platos",
    sequelize
})

module.exports = PedidoHasPlatos;