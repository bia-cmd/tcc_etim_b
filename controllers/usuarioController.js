const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = 'SELECT usu_id, usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone FROM usuario;';
            const usuarios = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].length, message: usuarios[0]});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async create(request, response) {
        try{
            const {usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone} = request.body;

            const sql = 'INSERT INTO usuario (usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone) VALUES (?, ?, ?, ?, ?, ?, ?)';

            const values = [usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone];

            const confirmacao = await db.query(sql, values);

            const usuario = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: usuario});
           } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};