const usuarioModel = require(
    "../models/usuarioModel");

exports.paginaHome = (request, response) => {
    const session = request.session;

    if (session.email) {
        const usuario = new usuarioModel(
            session.nome, session.email);
        response.render("index", { usuario });
    } else {
        response.redirect("/login");
    }
};


