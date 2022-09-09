//nicolly

const {json} = require("express");
const db = require("../database/connection");

module.exports ={
    async listarLivro(request, response){
        try{
            const sql = 'SELECT liv_id, liv_nome, edit_id, gen_id, liv_quant_paginas, liv_descricao, liv_foto, liv_moderacao FROM livro;';
            const livro = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: livro[0].length, message: livro[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },
};