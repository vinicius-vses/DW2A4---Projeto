const { response } = require("express");
const express = require("express");
const app = express();

app.listen(porta = 8000, () => {
    console.log("Servidor executando na porta "
        + porta);
});
