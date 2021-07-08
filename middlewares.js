<<<<<<< HEAD
// instanciar modelos
const { Roles, Usuarios, Pedidos, Platos, PedidoHasPlatos } = require('./models/relations');
const { findAll } = require('./models/roles');

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
      const usuarioExistente = await Usuarios.findOne({
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
      const usuarioExistente = await Usuarios.findOne({
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
      const loginOk = await Usuarios.findOne({
        where: {
          correo: req.body.correo,
          contrasena: req.body.contrasena
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


//==============================================================================================
//==============================================================================================
// Validación administradores
const validarRolAdmin = async (req, res, next) => {
  try {
    const usuario = await Usuarios.findOne({
      where: {
        correo: req.user.correo
      }
    });

    if (usuario.rols_id === 1) {
      res.status(400).json({ error: "Acceso denegado. Solo para administradores" });
    } else {
      next();
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
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


// middlewares a hacer : para crear un plato (SOLO ADMIN) / validar vody al crear pedidos

=======
// instanciar modelos
const { Roles, Usuarios, Pedidos, Platos, PedidoHasPlatos } = require('./models/relations');
const { findAll } = require('./models/roles');

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
      const usuarioExistente = await Usuarios.findOne({
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
      const usuarioExistente = await Usuarios.findOne({
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
      const loginOk = await Usuarios.findOne({
        where: {
          correo: req.body.correo,
          contrasena: req.body.contrasena
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


//==============================================================================================
//==============================================================================================
// Validación administradores
const validarRolAdmin = async (req, res, next) => {
  try {
    const usuario = await Usuarios.findOne({
      where: {
        correo: req.user.correo
      }
    });

    if (usuario.rols_id === 1) {
      res.status(400).json({ error: "Acceso denegado. Solo para administradores" });
    } else {
      next();
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
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


// middlewares a hacer : para crear un plato (SOLO ADMIN) / validar vody al crear pedidos

>>>>>>> 6cc2c03532de7cf629d10a5893962c69203215a5
module.exports = {validarBodyLogin, validarBodyPlato, validarBodyRegister, validarRolAdmin, validarUsuario, validarUsuarioCorreo, verificarLogin};