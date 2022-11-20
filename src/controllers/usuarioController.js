const usuarioModel = require(
    "../models/usuarioModel");

exports.paginaUsuario = (request, response) => {
    const usuario = new usuarioModel("Maria", 32);
    response.send(usuario);
};

