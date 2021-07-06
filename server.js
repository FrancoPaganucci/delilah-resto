const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
// esto se guarda como variable de entorno
const secretJWT = process.env.JWT_SECRET;

// require database
const db = require('./config');

// instancia de Express
const server = express();
const PORT = process.env.APP_PORT;
// instanciar modelos
const { Rol, Usuario, Pedido, Plato, PedidoHasPlatos } = require('./models/relations');
const { findAll } = require('./models/rol');

// middlewares
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(
    expressJwt({
      secret: secretJWT,
      algorithms: ["HS256"],
    }).unless({
      path: ["/login", "/register"]
    })
  );

  // Importar middlewares de validación
 const {validarBodyLogin, verificarLogin, validarBodyRegister, validarBodyPlato, validarRolAdmin, validarUsuario, validarUsuarioCorreo} = require('./middlewares');

// ============================
// ======== ROUTING ===========
// ============================
// ================================================================================================
// =========================================== USUARIOS ===========================================

// post register usuario
server.post('/register', validarBodyRegister, validarUsuarioCorreo, validarUsuario, (req, res) => {
  Usuario.create({
      usuario: req.body.usuario,
      nombre: req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      contrasena: req.body.contrasena, 
      rols_id: req.body.rols_id
  }).then(usuario => {
      res.status(200).json({ usuario });
  }).catch(error => {
      res.status(400).json({ error: error.message });
  });
})

// post login
server.post('/login', validarBodyLogin, verificarLogin, async (req, res) => {

  // traer usuario id para mandarlo como payload en token !
  try {
    const token = await jwt.sign(
      {
        usuario: req.body.usuario,
        correo: req.body.correo,
      },
      secretJWT,
      { expiresIn: "60m" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.send({ error: error.message });
  }

});

// get usuarios
server.get('/usuarios', (req, res) => {
  Usuario.findAll().then(usuarios => {
      res.json(usuarios);
  }).catch(error => {
      res.send(error.message);
  })
})


// ================================================================================================
// =========================================== PLATOS =============================================
// Crear plato SOLO ADMINS
server.post('/platos', validarBodyPlato, validarRolAdmin, async (req, res) => {
  try {
    const nuevo_plato = await Plato.create({
      nombre: req.body.nombre,
      precio: req.body.precio,
      activo: 1,
      imagen: req.body.imagen
    });

    res.status(200).json({nuevo_plato});
  } catch (error) {
    res.send({error: error.message});
  };

});

// Leer platos
server.get('/platos', async (req, res) => {
  try {
    const allPlatos = await Plato.findAll({
      where: {
        activo: 1
      }
    });
    res.status(200).json(allPlatos);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// Leer plato x id
server.get('/plato/:id', async (req, res) => {
  try {
    const PlatoOk = await Plato.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(PlatoOk)
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
})

// Actualizar plato x id SOLO ADMINS
server.put('/actualizarPlato/:platoId', validarRolAdmin, (req, res) => {
  // update nombre
  if (req.body.nombre) {
    Plato.update(
      { nombre: req.body.nombre },
      {
        where: {
          id: req.params.platoId
        }
      }
    ).then(update => {
      res.status(200).json(update);
    }).catch(error => {
      res.status(400).send({ error: error.message })
    })
  }

  // update precio
  if (req.body.precio) {
    Plato.update(
      { precio: req.body.precio },
      {
        where: {
          id: req.params.platoId
        }
      }
    ).then(update => {
      res.status(200).json(update);
    }).catch(error => {
      res.status(400).send({ error: error.message })
    })
  }

  // update imagen
  if(req.body.imagen) {
    Plato.update(
      { imagen: req.body.imagen },
      {
        where: {
          id: req.params.platoId
        }
      }
    ).then(update => {
      res.status(200).json(update);
    }).catch(error => {
      res.status(400).send({ error: error.message })
    })
  }
});

// Borrar plato x id (PUT que actualize el activo de 1 a 0, no eliminar registros de la DB) SOLO ADMINS
server.put('/borrarPlato/:platoId', validarRolAdmin, (req,res) => {
  Plato.update(
    {activo : 0},
    {where: {
      id: req.params.platoId
    }}
  ).then(update => {
    res.status(200).json(update);
  }).catch(error => {
    res.status(400).send({error: error.message})
  })
});



// ===============================================================================================
// =========================================== PEDIDOS ===========================================
// crear pedido
server.post('/crearPedido', async (req, res) => {

  const productos = req.body;
  const forma_de_pago = req.body.forma_de_pago;

  // CALCULAR PRECIO TOTAL DEL PEDIDO
  const dataProductos = await Promise.all(
    productos.map(async prod => {
      const productoDB = await Plato.findByPk(prod.id);
      return {
        cantidad: prod.cantidad,
        precio: productoDB.precio,
        id: prod.id
      };
    })
  );
  
  const precio_total = 0;
  dataProductos.forEach(prod => {
    precio_total += parseFloat(prod.precio) * parseFloat(prod.cantidad);
  });

  // CREAR EL PEDIDO
  try {
    const nuevoPedido = await Pedido.create({
      precio_total: precio_total,
      fecha: Date.now(),
      estado: "NUEVO",
      formas_pago: forma_de_pago,
      usuarios_id: req.user.id
    })

    // INSERTAR EN TABLA INTERMEDIA
    await Promise.all(dataProductos.map(async prod => {
      await PedidoHasPlatos.create({
        pedido_id: nuevoPedido.id,
        producto_id: prod.id,
        cantidad: prod.cantidad
      }, {
        // Necesario para insertar en tabla de muchos a muchos
        fields: ["pedido_id", "producto_id", "cantidad"]
      });
    }));

    res.status(200).json(nuevoPedido);

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});


// GET de todos los pedidos ADMIN SOLAMENTE
server.get('/pedidosDashboard', validarRolAdmin, async (req, res) => {
  try {
    const pedidos = await findAll({
      // el include le podes pedir lo que hayas definido en el belongsTo de las relaciones
      include: [{ model: Pedido }, { model: Usuario }]
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET pedidos de un usuario "MIS PEDIDOS"
server.get('/misPedidos', async (req, res) => {
  try {
    const misPedidos = await Pedido.findAll({
      where: {
        // este user id hay que enviarlo por el token, buscarlo en el middleware y sumarlo como variable
        usuarios_id: req.user.id
      },
      include: {
        model: Plato
      }
    });
    res.json(misPedidos)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


// ===============================================================================================
//=================================== INICIALIZAR EL SERVIDOR ====================================
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  // Conectarse a la base de datos cuando levanta el servidor
  // force true: DROP TABLES (no queremos que reinicie las tablas constantemente!)
  db.sync({ force: false }).then(() => {
    console.log("Succesfully connected to database");
  }).catch(error => {
    console.log("Se ha producido un error: " + error);
  });
})