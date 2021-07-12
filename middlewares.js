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
  
  //==============================================================================================
//==============================================================================================
  // validación USUARIOS
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
  
//==============================================================================================
//==============================================================================================
  // validaciones LOGIN
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
// Validación ADMIN
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

//==============================================================================================
//==============================================================================================
// Validaciones PLATOS
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

//==============================================================================================
//==============================================================================================
// Validaciones PEDIDOS
const validarBodyPedido = (req, res, next) => {
  const productos = req.body.platos;
  const forma_de_pago = req.body.forma_de_pago;
  if (
    !productos||
    !forma_de_pago
  ) {
    res.status(400).json({ error: "Información incompleta. Forma de pago, id de plato y cantidad necesarias." })
  } else {
    next();
  }
};

const validarBodyActualizarPedido = (req, res, next) => {
  let nuevoEstado = req.body.estado;

  if (nuevoEstado == 2 || nuevoEstado == 3 || nuevoEstado == 4 || nuevoEstado == 5 || nuevoEstado == 6) {
    req.nuevoEstado = nuevoEstado;
    next();
  } else {
    res.status(400).json({error: "Los estados de un pedido solo pueden ser: 'PREPARANDO', 'CONFIRMADO','ENVIANDO','CANCELADO','ENTREGADO'. Por favor ingrese uno de los estados mencionados para actualizar el estado del pedido."});
  }
};

module.exports = {validarBodyLogin, validarBodyPlato, validarBodyRegister, validarRolAdmin, validarUsuario, validarUsuarioCorreo, verificarLogin, validarBodyPedido, validarBodyActualizarPedido};