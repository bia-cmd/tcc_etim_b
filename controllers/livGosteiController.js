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
};