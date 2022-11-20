const express = require("express");
const session = require("express-session");
const uuid = require("uuid").v4;
const app = express();
const routes = require("./routes");

app.use(session({
    genid: (request) => {
      return uuid();
    },
    secret: "Um segredo",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.listen(porta = 8000, () => {
    console.log("Servidor executando na porta "
        + porta);
});


