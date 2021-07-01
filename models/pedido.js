const { DataTypes } = require('sequelize');
const sequelize = require('./../config'); // el '/index/' al ser "index" es opcional

const Pedido = sequelize.define('pedido', {
    precio_total: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        notNull: true
    },
    estado: {
        type: DataTypes.ENUM('NUEVO','PREPARANDO','CONFIRMADO','ENVIANDO','CANCELADO','ENTREGADO'),
        notNull: true
    },
    formas_pago: {
        type: DataTypes.ENUM('CREDITO','CASH','DEBITO','MP'),
        notNull: true
    },

}, {
    timestamps: false,
    tableName: "pedidos",
    //sequelize
})

module.exports = Pedido;