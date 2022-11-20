class Login {
    constructor(body) {
        this.body = body;
        this.user = {};
    }
    consultaUsuario() {
        if (this.body.email == "maria@email.com"
            && this.body.senha == "12345") {

            this.user.nome = "Maria";
            this.user.email = "maria@email.com";
            return 1;
        }
        return 0;
    }
}
module.exports = Login;