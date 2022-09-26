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


    async create(request, response){
      try {
        const { liv_nome, edit_id, gen_id, liv_quant_paginas, liv_descricao, liv_foto, liv_moderacao, usu_id } = request.body;
        const sql = 'INSERT INTO livro (liv_nome, edit_id, gen_id, liv_quant_paginas, liv_descricao, liv_foto, liv_moderacao, usu_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);';
        const values = [liv_nome, edit_id, gen_id, liv_quant_paginas, liv_descricao, liv_foto, liv_moderacao, usu_id];
        const confirmacao = await db.query(sql, values);
        const liv_id = confirmacao[0].insertId;

        return response.status(200).json({confirma: 'Sucesso', message: liv_id});
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
            }


},

async update(request, response) { 
    try {
            // parâmtros passados via corpo da requisição
        const { liv_nome, edit_id, gen_id, liv_quant_paginas, liv_descricao, liv_foto, liv_moderacao } = request.body;
            // parâmetro passado via url na chamada da api pelo front-end
        const { liv_id } = request.params; 
            // instrução sql para atualização
        const sql = 'UPDATE livro SET liv_nome = ?, edit_id = ?, gen_id = ?, liv_quant_paginas = ?, liv_descricao = ?, liv_foto = ?, liv_moderacao = ? WHERE liv_id;';  
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [liv_nome, edit_id, gen_id, liv_quant_paginas, liv_descricao, liv_foto, liv_moderacao];   
            // executa a instrução de atualização no banco de dados    
        const atualizacao = await db.query(sql, values);
            // Mensagem de retorno no formato JSON
        return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    }
},        
};