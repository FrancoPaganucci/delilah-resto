<<<<<<< HEAD
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

=======
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

>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
module.exports = PedidosHasPlatos;