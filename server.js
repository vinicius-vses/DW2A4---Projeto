//Require de Módulos Necessários
const express = require("express");
const session = require("express-session");
const uuid = require("uuid").v4;
const Database = require("./models/dbModel");
const routes = require("./routes");

//Instanciando servidor Express
const app = express();

//Estabelecendo sessão para uso de cookies
/*app.use(session({
    genid: (request) => {
      return uuid();
    },
    secret: "Um segredo",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));*/

//Referenciando rotas e pasta pública
app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

//Inicializando servidor
app.listen(porta = 8000, () => {
    console.log("Servidor executando na porta "
        + porta);
});

//Instanciando banco de dados
db = new Database("Phi4Free");




