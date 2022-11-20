const express = require("express");
const route = express.Router();
const artigoController = require(
    "./controllers/artigoController");

route.get("/criarArtigo",
    artigoController.criarArtigoGet);

route.post("/criarArtigo",
    artigoController.criarArtigoPost);

route.get("/lerArtigo/:query?",
    artigoController.lerArtigoGet);

route.put("/atualizarArtigo",
    artigoController.updateArtigoPut);

route.delete("/excluirArtigo/:id",
    artigoController.excluirArtigoDelete);

module.exports = route;

