//Maria Isabelly
const {json} = require("express");
const db = require("../database/connection");

module.exports ={
    async listarEditora(request, response){
        try{
            const sql = 'SELECT edit_id, edit_nome from editora;'
            const editora = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: editora[0].length, message: editora[0]});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },
};