//Maria Isabelly
const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    async listarAutores(request, response) {
        try {
            const sql = 'select autor_id, autor_nome, autor_nascimento from autores;';
            const autores = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: autores[0].length, message: autores[0] });
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};