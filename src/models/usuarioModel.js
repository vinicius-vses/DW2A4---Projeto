class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    imprime() {
        return "Nome: " + this.nome + "\n"
            + "E-mail: " + this.email;
    }
};

module.exports = Usuario;