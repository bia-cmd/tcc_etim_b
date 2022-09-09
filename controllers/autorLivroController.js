//Maria Isabelly
const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    async listarAutorLivro(request, response){
        try{
            const sql= 'select autor_id, liv_id from autor_livro;'
            const autorLivro = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: autorLivro[0].length, message: autorLivro[0]});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },
};