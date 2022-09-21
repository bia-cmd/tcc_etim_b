const {json} = require("express");
const db = require("../database/connection");

module.exports ={
    async listarLivGostei(request, response){
        try{
            const sql = 'SELECT liv_id, usu_id FROM liv_gostei;';
            const livGostei = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: livGostei[0].length, message: livGostei[0]});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },

    async create(request, response) {
        try{
            const {liv_id, usu_id} = request.body;

            const sql = 'INSERT INTO liv_gostei (liv_id, usu_id) VALUES (?, ?)';

            const values = [liv_id, usu_id];

            const confirmacao = await db.query(sql, values);

            const livgostei = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: livgostei});
           } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};