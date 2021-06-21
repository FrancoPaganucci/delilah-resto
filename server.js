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
      path: ["/login", "/register"]
    })
  );*/

// ============================
// ======== ROUTING ===========
// ============================
// =========================================== USUARIOS ===========================================

// VALIDACIONES
// validación body register
const validarBodyRegister = (req, res, next) => {
  if (
      !req.body.usuario ||
      !req.body.nombre ||
      !req.body.correo ||
      !req.body.telefono ||
      !req.body.direccion ||
      !req.body.contrasena ||
      !req.body.rols_id
  ) {
      res.status(400).json({
          error: "debe registrarse con los datos completos",
      });
  } else {
      next();
  }
};

// validación de usuario en DB (validar nombre y correo por separado)
const validarUsuario = async (req, res, next) => {
  try {
    const usuarioExistente = await Usuario.findOne({
      where: {
        usuario: req.body.usuario
      }
    });
    if (usuarioExistente) {
      res.status(409).json({ error: `El usuario pertenece a un usuario registrado` });
    } else {
      next();
    }
  } catch (error) {
    res.send({ error: error.message });
  }

};

const validarUsuarioCorreo = async (req, res, next) => {
  try {
    const usuarioExistente = await Usuario.findOne({
      where: {
        correo: req.body.correo
      }
    });

    if (usuarioExistente) {
      res.status(409).json({ error: `Ya existe una cuenta registrada con ese correo` });
    } else {
      next();
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};


// validaciones login
const validarBodyLogin = (req, res, next) => {
  if (
      !req.body.correo ||
      !req.body.contrasena
  ) {
      res.status(400).json({
          error: "debe registrarse con los datos completos",
      });
  } else {
      next();
  }
};

const verificarLogin = async (req, res, next) => {
  try {
    const loginOk = await Usuario.findOne({
      where: {
        correo: req.body.correo,
        password: req.body.contrasena
      }
    });

    if (!loginOk) {
      res.status(400).json({
        error: "Credenciales incorrectas"
      })
    } else {
      next();
    }

  } catch (error) {
    res.send({ error: error.message });
  }
};


// RUTAS
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



// =========================================== PLATOS =============================================

// Validación administradores
const validarRolAdmin = async (req, res, next) => {
  const usuario = await Usuario.findOne({
    where: {
      // ¿Cómo puedo leer el rols_id del solicitante? ¿Lo envío en el payload del JWT? ¿Cómo accedo?
    }
  });
};


const validarBodyPlato = (req, res, next) => {
  if (
      !req.body.nombre||
      !req.body.precio ||
      !req.body.imagen
  ) {
      res.status(400).json({
          error: "Debe enviar los datos completos del plato",
      });
  } else {
      next();
  }
};



// Crear plato SOLO ADMINS
server.post('/platos', validarBodyPlato, async (req, res) => {
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
  await Plato.findAll().then(platos => {
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


// Actualizar plato x id SOLO ADMINS


// Borrar plato x id (PUT que actualize el activo de 1 a 0, no eliminar registros de la DB) SOLO ADMINS
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