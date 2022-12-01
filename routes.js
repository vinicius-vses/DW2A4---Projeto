const express = require("express");
const route = express.Router();

//CONTROLE E ROTEAMENTO DOS ARTIGOS
const artigoController = require("./controllers/artigoController");

route.get("/criarArtigo",
    artigoController.criarArtigoGet);

route.post("/criarArtigo",
    artigoController.criarArtigoPost);

route.get("/lerArtigo/:query?",
    artigoController.lerArtigoGet);

route.get("/listaArtigos",
    artigoController.listaArtigosGet);

route.put("/atualizarArtigo",
    artigoController.updateArtigoPut);

route.delete("/excluirArtigo/:id",
    artigoController.excluirArtigoDelete);

//CONTROLE E ROTEAMENTO DOS USUÁRIOS
const userController = require("./controllers/userController");

route.get("/verPerfil", 
    userController.verPerfilGet);

route.put("/atualizarPerfil", 
    userController.atualizarPerfilPut);

route.post("/criarPerfil", 
    userController.criarPerfilPost);

route.delete("/deletarPerfil/:id", 
    userController.deletarPerfilDelete);

//CONTROLE E ROTEAMENTO DE LOGIN
const loginController = require("./controllers/loginController");
//route.post("/authUser", 
//    loginController.authUser);
    
module.exports = route;

