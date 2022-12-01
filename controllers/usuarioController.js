const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    async create(request, response) {
        try{
            const {usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone} = request.body;

            const sql = 'INSERT INTO usuario (usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone) VALUES (?, ?, ?, ?, ?, ?, ?)';

            const values = [usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone];

            const confirmacao = await db.query(sql, values);

            const usuario = confirmacao[0].insertId;

            return response.status(200).json({confirma: 'Sucesso', message: usuario});
           } catch (error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },

    async update(request, response) {
        try{
            const{ usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone } = request.body;

            const { usu_id } = request.params;

            const sql = 'UPDATE usuario SET usu_nome = ?, cur_id = ?, usu_rm = ?, usu_email = ?, usu_senha = ?, usu_foto = ?, usu_telefone = ? WHERE usu_id = ?;';

            const values = [usu_nome, cur_id, usu_rm, usu_email, usu_senha, usu_foto, usu_telefone, usu_id];   
 
            const atualizacao = await db.query(sql, values);

            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
            } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        } 
    },

    async delete(request, response) { 
        try {
            const { usu_id } = request.params;    

            const sql = 'DELETE FROM usuario WHERE usu_id = ?'; 

            const values = [usu_id];
  
            await db.query(sql, values);  

            return response.status(200).json({confirma: 'Sucesso', message:'Usuario com id ' + usu_id + ' excluído com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },

    async listarUsuarios(request, response) {
         try {
                const { usu_id = '%%' } = request.body;
                const { usu_nome = '%%' } = request.body;
                const { cur_id = '%%' } = request.body;

                const { page = 1, limit = 5 } = request.query;
                const inicio = (page - 1) * limit;

                const nome_usuario = usu_nome === '%%' ? '%%' : '%' + usu_nome + '%';

                const sql = 'SELECT u.usu_id, u.usu_nome, u.cur_id, u.usu_rm, u.usu_email, u.usu_senha, u.usu_foto, u.usu_telefone FROM usuario u INNER JOIN curso c ON u.cur_id = c.cur_id WHERE u.usu_id LIKE ? AND u.cur_id LIKE ? LIMIT ?, ?;';
                const values = [usu_id, cur_id, inicio, parseInt(limit)];
                const usuarios = await db.query(sql, values);
                return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].lenght, message: usuarios[0]});
            } catch (error) {
             return response.status(500).json({confirma: 'Erro', message: error});
        }
   },

   async login(request, response) {
    const { usu_email, usu_senha } = request.body;
    try {
           const sql = 'SELECT usu_id, usu_nome, cur_id, usu_rm, usu_email, usu_foto, usu_telefone FROM usuario WHERE usu_email = ? AND usu_senha = ?;';
           const values = [usu_email, usu_senha];
           const usuarios = await db.query(sql, values);
           return response.status(200).json({confirma: 'Sucesso', nResults: usuarios[0].lenght, message: usuarios[0]});
       } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
   }
},

};