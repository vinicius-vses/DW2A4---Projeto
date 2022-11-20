const loginModel = require(
    "../models/loginModel");

exports.loginGet = (request, response) => {
    const session = request.session;

    if (session.email) {
        response.redirect("/");
    } else {
        response.render("login");
    }
};

exports.loginPost = (request, response) => {
    const login = new loginModel(request.body);

    if (login.consultaUsuario()) {
        const session = request.session;

        session.nome = login.user.nome;
        session.email = login.user.email;

        response.redirect("/");
    } else {
        response.send("Verifique suas credenciais...");
    }
};

exports.loginDelete = (request, response) => {
    const session = request.session;

    if (session.email) {
        session.destroy();
        response.send("Usuário desconectado");
    } else {
        response.redirect("/");
    }
};