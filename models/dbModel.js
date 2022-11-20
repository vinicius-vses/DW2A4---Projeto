const { json } = require("express");
const { JsonDB, Config } = require("node-json-db");
const Artigo = require("./artigoModel");

class Database {
    constructor(dbName) {
        this.db = new JsonDB(new Config(dbName, true, false, '/'));
        this.db.push("/config/db", {contUser: 0, contArtigo: 0});
    }

    //CRUD USUÁRIO
    async createUser() {

    }

    async readUser() {

    }

    async updateUser() {

    }

    async deleteUser() {

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
            return "Erro 404: O artigo com o ID: " + artigo.id + " não foi encontrado no banco de dados...";
        }
        let ARTIGO = await this.db.getData("/artigos/array["+index+"]");
        return JSON.stringify(ARTIGO);
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