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
    async create (request, response){
        try{

            const {autor_idautor_id, liv_id} = request.body; 
            const sql = 'insert into autor_livro (autor_id, liv_id) values (?, ?)';
            const values = [autor_id, liv_id];
            const confirmacao = await db.query(sql, values);
            const autorLivro = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: autorLivro});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
