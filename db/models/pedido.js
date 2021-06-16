const { DataTypes } = require('sequelize');
const sequelize = require('..'); // el '/index/' al ser "index" es opcional

const Pedido = sequelize.define('pedido', {
    precio_total: {
        type: DataTypes.DOUBLE,
        allowNull = false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull = false
    },
    estado: {
        type: DataTypes.ENUM('NUEVO','PREPARANDO','CONFIRMADO','ENVIANDO','CANCELADO','ENTREGADO'),
        allowNull = false
    },
    formas_pago: {
        type: DataTypes.ENUM('CREDITO','CASH','DEBITO','MP'),
        allowNull = false
    },

}, {
    timestamps: false,
    tableName: "pedidos",
    modelName: "pedido",
    sequelize
})

module.exports = Pedido;