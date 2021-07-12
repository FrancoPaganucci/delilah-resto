const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // el '/index/' al ser "index" es opcional

const Pedidos = sequelize.define('pedidos', {

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
        type: DataTypes.ENUM('CREDITO','CASH','DEBITO','PAYPAL','MP'),
        notNull: true
    },

}, {
    timestamps: false,
    tableName: "pedidos",
    underscored: true,
    //sequelize
})

module.exports = Pedidos;
