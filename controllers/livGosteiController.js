const {json} = require("express");
const db = require("../database/connection");

module.exports ={
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

    async listarLivGostei(request, response) {
        try {
               const { liv_id = '%%' } = request.body;
               const { usu_id = '%%' } = request.body;

               const { page = 1, limit = 5 } = request.query;
               const inicio = (page - 1) * limit;

               const nome_livgostei = usu_id === '%%' ? '%%' : '%' + usu_id + '%';

               const sql = 'SELECT u.usu_id, u.usu_nome, u.cur_id, u.usu_rm, u.usu_email, u.usu_senha, u.usu_foto, u.usu_telefone FROM usuario u INNER JOIN curso c ON u.cur_id = c.cur_id WHERE u.usu_id LIKE ? AND u.cur_id LIKE ? LIMIT ?, ?;';
               const values = [usu_id, liv_id, inicio, parseInt(limit)];
               const livGostei = await db.query(sql, values);
               return response.status(200).json({confirma: 'Sucesso', nResults: livGostei[0].lenght, message: livGostei[0]});
           } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
       }
  },

};