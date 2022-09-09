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
};