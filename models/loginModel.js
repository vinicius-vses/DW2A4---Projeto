const token = require("../middlewares/token");

class Login {
    email; senha;
    constructor(login) {
        this.email = login.email;
        this.senha = login.senha;
    }

    get email() {
        return this.email;
    }

    get senha() {
        return this.senha;
    }

    async getToken() {
        let id = await db.authLogin(this);
        if (id == -1) {
            return "Login inválido"
        } else {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24h
              });
             return JSON.stringify({auth: true, token: token});
        }
    }
}

module.exports = Login;
