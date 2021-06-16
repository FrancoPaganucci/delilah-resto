const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
// esto se guarda como variable de entorno
const secretJWT = "escribiralgomuyseguro123456789-lbjnwef89h234234rbhjuiiiiiiiii";

// require database
// const db = require('./database');

// instancia de Express
const server = express();
const PORT = 3000;
// instanciar modelos
const { Rol, Usuario, Pedido } = require('./db/models/relations');

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
      path: ["/login"],
    })
  );
  

// ======== ROUTING ===========

