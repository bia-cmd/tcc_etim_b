const {json} = require("express");
const db = require("../database/connection");

module.exports ={
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

    async update(request, response) {
        try{
            const{ usu_id, liv_id, opc_lendo, opc_abandonado, opc_li, opc_quero_ler, opc_relendo } = request.body;

            const { opc_id } = request.params;

            const sql = 'UPDATE opc_livros SET usu_id = ?, liv_id = ?, opc_lendo = ?, opc_abandonado = ?, opc_li = ?, opc_quero_ler = ?, opc_relendo = ?, WHERE opc_id = ?;';

            const values = [usu_id, liv_id, opc_lendo, opc_abandonado, opc_li, opc_quero_ler, opc_relendo, opc_id];   
 
            const atualizacao = await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
            } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        } 
    },

    async delete(request, response) { 
        try {
            const { opc_id } = request.params;    

            const sql = 'DELETE FROM opc_livros WHERE opc_id = ?'; 

            const values = [opc_id];
  
            await db.query(sql, values);  

            return response.status(200).json({confirma: 'Sucesso', message:'Opção com id ' + opc_id + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },

    async listarOpcLivros(request, response) {
        try {
               const { opc_id = '%%' } = request.body;
               const { usu_id = '%%' } = request.body;
               const { liv_id = '%%' } = request.body;

               const { page = 1, limit = 5 } = request.query;
               const inicio = (page - 1) * limit;

               const nome_opclivro = opc_id === '%%' ? '%%' : '%' + opc_id + '%';

               const sql = 'SELECT o.opc_id, o.usu_id, o.liv_id, o.opc_lendo, o.opc_abandonado, o.opc_li, o.opc_quero_ler, o.opc_relendo FROM opc_livros o INNER JOIN usuario u ON o.usu_id = u.usu_id INNER JOIN livro l ON o.liv_id = l.liv_id WHERE o.opc_id LIKE ? AND o.usu_id LIKE ? AND o.liv_id LIKE ? LIMIT ?, ?;';
               const values = [opc_id, usu_id, liv_id, inicio, parseInt(limit)];
               const opc_livros = await db.query(sql, values);
               return response.status(200).json({confirma: 'Sucesso', nResults: opc_livros[0].lenght, message: opc_livros[0]});
           } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
       }
  },
  
};