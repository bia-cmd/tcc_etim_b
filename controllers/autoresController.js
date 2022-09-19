//Maria Isabelly
const { create } = require("domain");
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
    async create (request, response){
        try{

            const {autor_nome, autor_nascimento} = request.body; 
            const sql = 'INSERT into autores (autor_nome, autor_nascimento) VALUES (?,?,?)';
            const values = [autor_id, autor_nome, autor_nascimento];
            const confirmacao = await db.query(sql, values);
            const autor = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: autor});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};

