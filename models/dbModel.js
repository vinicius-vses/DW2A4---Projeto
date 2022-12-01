const { json } = require("express");
const { JsonDB, Config } = require("node-json-db");
const Artigo = require("./artigoModel");
const User = require("./userModel");
const fs = require('fs')

class Database {
    constructor(dbName) {
        this.db = new JsonDB(new Config(dbName, true, false, '/'));
        if (!fs.existsSync('./'+dbName+'.json')) {
            this.db = new JsonDB(new Config(dbName, true, false, '/'));
            this.db.push("/config/db", {contUser: 0, contArtigo: 0});
        } else {
            this.db = new JsonDB(new Config(dbName, true, false, '/'));
        }
        
    }

    //CRUD USUÁRIO
    async createUser(user) {
        let contUser = await this.db.getData("/config/db/contUser");
        contUser++;
        await this.db.push("/config/db/contUser", contUser);

        const PUB_DATE = new Date();
        const NEW_USER = new User(contUser, user.nome, user.email, user.senha, PUB_DATE, 0, new Array);

        await this.db.push("/users/array[]", NEW_USER);
        return JSON.stringify(NEW_USER);
    }

    //readUser com a senha junto
    async readUserFull(id) {
        let index = await this.db.getIndex("/users/array", parseInt(id), "id");
        if (index == -1) {
            return "Erro 404: O usuário com o ID: " + id + " não foi encontrado no banco de dados...";
        }
        let user = await this.db.getData("/users/array["+index+"]");
        return JSON.stringify(user);
    }
    
    //readUser sem enviar a senha
    async readUser(id) {
        let index = await this.db.getIndex("/users/array", parseInt(id), "id");
        if (index == -1) {
            return "Erro 404: O usuário com o ID: " + id + " não foi encontrado no banco de dados...";
        }
        let userBuffer = await this.db.getData("/users/array["+index+"]");
        let user = {
            id: userBuffer.id,
            nome: userBuffer.nome,
            email: userBuffer.email,
            dataIni: userBuffer.dataIni,
            numArt: userBuffer.numArt,
            notas: userBuffer.notas
        }
        return JSON.stringify(user);
    }

    async updateUser(user) {
        let index = await this.db.getIndex("/users/array", user.id, "id");
        if (index == -1) {
            return "Erro 404: O artigo com o ID: " + user.id + " não foi encontrado no banco de dados...";
        }
        await this.db.push("/users/array[" + index + "]", user, true);
        return JSON.stringify(await this.db.getData("/users/array["+index+"]"));
    }

    async deleteUser(id) {
        let index = await this.db.getIndex("/users/array", parseInt(id), "id");
        //console.log(index);
        if (index == -1) {
            return "Erro 404: O usuário com o ID: " + id + " não foi encontrado no banco de dados...";
        }
        await this.db.delete("/users/array["+index+"]");
        index = await this.db.getIndex("/users/array", parseInt(id), "id");
        if (index == -1) {
            return "Seu usuário foi deletado permanentemente...";
        }
    }

    //CRUD ARTIGO
    async createArt(artigo) { //faltando pegar o input de sessão do user para o id do autor
        let contArtigo = await this.db.getData("/config/db/contArtigo");
        contArtigo++;
        //console.log("Antes do push: " + await this.db.getData("/config/db/contArtigo"));
        await this.db.push("/config/db/contArtigo", contArtigo);
        //console.log("Depois do push: " + await this.db.getData("/config/db/contArtigo"));
        
        const PUB_DATE = new Date();

        //console.log(artigo);
        
        const NEW_ARTIGO = new Artigo(contArtigo, artigo.autorId, artigo.disciplina, artigo.titulo, artigo.conteudo, PUB_DATE, PUB_DATE);
        
        await this.db.push("/artigos/array[]", NEW_ARTIGO);
        return JSON.stringify(NEW_ARTIGO);
    }

    async readArt(id) {
        let index = await this.db.getIndex("/artigos/array", parseInt(id), "id");
        if (index == -1) {
            return "Erro 404: O artigo com o ID: " + id + " não foi encontrado no banco de dados...";
        }
        let ARTIGO = await this.db.getData("/artigos/array["+index+"]");
        return JSON.stringify(ARTIGO);
    }

    async listArt() {
        let ARTIGOS = await this.db.getData("/artigos");
        //console.log(ARTIGOS.array[0]);
        const length = ARTIGOS.array.length;
        //console.log(length);
        let LISTA_ARTIGOS = new Array; 
        for (let i=0; i < length; i++) {
            LISTA_ARTIGOS.push(
                {
                    idArtigo: ARTIGOS.array[i].id,
                    autor: ARTIGOS.array[i].autorId,
                    titulo: ARTIGOS.array[i].titulo
                }
            );
            //console.log(LISTA_ARTIGOS[i]);
        }
        return JSON.stringify(LISTA_ARTIGOS);
    }

    async updateArt(artigo) { //faltando pegar o input de sessão do user para o id do autor --- Será que precisa??
        artigo.dataEdt = new Date();
        let index = await this.db.getIndex("/artigos/array", artigo.id, "id");
        if (index == -1) {
            return "Erro 404: O artigo com o ID: " + artigo.id + " não foi encontrado no banco de dados...";
        }
        await this.db.push("/artigos/array[" + index + "]", artigo, true);
        return JSON.stringify(await this.db.getData("/artigos/array["+index+"]"));
    }

    async deleteArt(id) {
        //console.log(id);
        let index = await this.db.getIndex("/artigos/array", parseInt(id), "id");
        //console.log(index);
        if (index == -1) {
            return "Erro 404: O artigo com o ID: " + id + " não foi encontrado no banco de dados...";
        }
        await this.db.delete("/artigos/array["+index+"]");
        index = await this.db.getIndex("/artigos/array", parseInt(id), "id");
        if (index == -1) {
            return "O artigo foi deletado permanentemente...";
        }
    }
};

module.exports = Database;