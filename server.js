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
const { Roles, Usuarios, Pedidos, Platos, PedidosHasPlatos } = require('./models/relations');
const { findAll } = require('./models/roles');

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
  Usuarios.create({
      usuario: req.body.usuario,
      nombre: req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      contrasena: req.body.contrasena, 
      // DEJAR EN DEFAULT ROL DE USUARIO, SOLO SE PUEDE ASIGNAR ADMINS DESDE EL ACCESO A LA DB
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

    const thisUsuario = await Usuarios.findOne({
      where: {
        correo: req.body.correo
      }
    });
    console.log(thisUsuario.id);
    const token = await jwt.sign(
      {
        usuario: thisUsuario.usuario,
        correo: req.body.correo,
        id: thisUsuario.id
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
  Usuarios.findAll().then(usuarios => {
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
    const nuevo_plato = await Platos.create({
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
    const allPlatos = await Platos.findAll({
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
    const PlatoOk = await Platos.findOne({
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
    Platos.update(
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
    Platos.update(
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
    Platos.update(
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
  Platos.update(
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

  const productos = req.body.platos;
  const forma_de_pago = req.body.forma_de_pago;

  // CALCULAR PRECIO TOTAL DEL PEDIDO
  const dataProductos = await Promise.all(
    productos.map(async prod => {
      const productoDB = await Platos.findByPk(prod.id);
      return {
        cantidad: prod.cantidad,
        precio: productoDB.precio,
        id: prod.id
      };
    })
  );
  
  let precio_total = 0;
  dataProductos.forEach(prod => {
    precio_total += parseFloat(prod.precio) * parseFloat(prod.cantidad);
  });

  // CREAR EL PEDIDO
  try {
    const nuevoPedido = await Pedidos.create({
      precio_total: precio_total,
      fecha: Date.now(),
      estado: "NUEVO",
      formas_pago: forma_de_pago,
      usuarios_id: req.user.id
    })

    // INSERTAR EN TABLA INTERMEDIA
    await Promise.all(dataProductos.map(async prod => {
      await PedidosHasPlatos.create({
        pedidos_id: nuevoPedido.id,
        platos_id: prod.id,
        cantidad: prod.cantidad
      }, {
        // Necesario para insertar en tabla de muchos a muchos
        fields: ["pedidos_id", "platos_id", "cantidad"]
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
    const pedidos = await Pedidos.findAll({
      // el include le podes pedir lo que hayas definido en el belongsTo de las relaciones
      include: [
        { model: Platos },
        { model: Usuarios, attributes: ["nombre"] },
      ],
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET pedidos de un usuario "MIS PEDIDOS"
server.get('/misPedidos', async (req, res) => {
  try {
    const misPedidos = await Pedidos.findAll({
      where: {
        usuarios_id: req.user.id
      },
      include: [{ model: Platos }]
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
  db.authenticate().then(() => {
    console.log("Succesfully connected to database");
  }).catch(error => {
    console.log("Se ha producido un error: " + error);
  });
})