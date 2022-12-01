const { request, response } = require("express");

module.exports.verPerfilGet = async (request, response) => {
    id = request.query.id;
    response.send(await db.readUser(id));
};

module.exports.atualizarPerfilPut = async (request, response) => {
    user = request.body;
    response.send(await db.updateUser(user));
};

module.exports.criarPerfilPost = async (request, response) => {
    user = request.body;
    response.send(await db.createUser(user));
};

module.exports.deletarPerfilDelete = async (request, response) => {
    id = request.params.id;
    response.send(await db.deleteUser(id));
};