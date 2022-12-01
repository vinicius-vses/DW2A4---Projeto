const { request, response } = require("express");

module.exports.criarArtigoGet = (request, response) => {

    if (false) { //request.session.user.isUserValid()
        response.redirect("/criarArtigo");
    } else {
        response.send("Sua conta atual não pode criar artigos. Entre em contato conosco para validar seu perfil como criador de conteúdo!");
    }
};

module.exports.criarArtigoPost = async (request, response) => {
    //user = request.session.user;
    artigo = request.body;
    //db.createArt(user, artigo);
    response.send(await db.createArt(artigo));
};

module.exports.lerArtigoGet = async (request, response) => {
    id = request.query.id;
    response.send(await db.readArt(id));
};

module.exports.listaArtigosGet = async (request, response) => {
    response.send(await db.listArt());
};

module.exports.updateArtigoPut = async (request, response) => {
    artigo = request.body;
    response.send(await db.updateArt(artigo));
};

module.exports.excluirArtigoDelete = async (request, response) => {
    id = request.params.id;
    response.send(await db.deleteArt(id));
}