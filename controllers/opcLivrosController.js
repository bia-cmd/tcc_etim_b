const {json} = require("express");
const db = require("../database/connection");

module.exports ={
    async listarOpcLivro(request, response){
        try{
            const sql = 'SELECT opc_id, usu_id, liv_id, opc_lendo, opc_abandonado, opc_li, opc_quero_ler, opc_relendo FROM opcLivros;';
            const opcLivros = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: opcLivros[0].length, message: opcLivros[0]});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },

    async create(request, response) {
        try{
            const {usu_id, liv_id, opc_lendo, opc_abandonado, opc_li, opc_quero_ler, opc_relendo} = request.body;

            const sql = 'INSERT INTO opc_livros (usu_id, liv_id, opc_lendo, opc_abandonado, opc_li, opc_quero_ler, opc_relendo) VALUES (?, ?, ?, ?, ?, ?, ?)';

            const values = [usu_id, liv_id, opc_lendo, opc_abandonado, opc_li, opc_quero_ler, opc_relendo];

            const confirmacao = await db.query(sql, values);

            const opclivro = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: opclivro});
           } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};