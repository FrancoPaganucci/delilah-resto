const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
// esto se guarda como variable de entorno
const secretJWT = "escribiralgomuyseguro123456789-lbjnwef89h234234rbhjuiiiiiiiii";

// require database
const db = require('./db');

// instancia de Express
const server = express();
const PORT = 3000;
// instanciar modelos
const { Rol, Usuario, Pedido, Plato, PedidoHasPlatos } = require('./db/models/relations');

// middlewares
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
/*server.use(
    expressJwt({
      secret: secretJWT,
      algorithms: ["HS256"],
    }).unless({
      path: ["/login"],
    })
  );
  */

// ============================
// ======== ROUTING ===========
// ============================
// =========================================== USUARIOS ===========================================

// VALIDACIONES



// RUTAS
// post register


// post login


// get usuarios

// =========================================== PLATOS =============================================
// Crear plato
server.post('/platos', (req, res) => {
  Plato.create({
    nombre: req.body.nombre,
    precio: req.body.precio,
    activo: 1,
    imagen: req.body.imagen
  }).then(plato => {
    res.status(200).json(plato);
  }).catch(error => {
    res.status(400).json({ error: error.message });
  })
});

// Leer platos
server.get('/platos', (req, res) => {
  Plato.findAll().then(platos => {
    res.status(200).json(platos);
  }).catch(error => {
    res.status(404).json({ error: error.message })
  });
})

// Leer plato x id
server.get('/plato/:id', (req,res) => {
  Plato.findOne({
    where: {
      id: req.params.id
    }
  }).then(plato => {
    res.status(200).json(plato);
  }).catch(error => {
    res.status(404).json({error: error.message});
  })
})


// Actualizar plato x id


// Borrar plato x id (PUT que actualize el activo de 1 a 0, no eliminar registros de la DB)
server.put('/borrarPlato/:platoId', (req,res) => {
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




// =========================================== PEDIDOS ===========================================





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