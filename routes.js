const express = require("express");
const route = express.Router();
const homeController = require(
    "./src/controllers/homeController");
const sobreController = require(
    "./src/controllers/sobreController");
const usuarioController = require(
    "./src/controllers/usuarioController");
const loginController = require(
    "./src/controllers/loginController");

route.get("/",
    homeController.paginaHome);

route.get("/login",
    loginController.loginGet);
route.post("/login",
    loginController.loginPost);
route.get("/logout",
    loginController.loginDelete);

route.get("/sobre",
    sobreController.paginaSobre);
route.post("/sobre",
    sobreController.paginaSobrePost);
route.get("/usuario",
    usuarioController.paginaUsuario);

module.exports = route;

