//Maria Isabelly
const { create } = require("domain");
const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    async listarAutores(request, response) {
        try {
            const sql = 'select autor_id, autor_nome, autor_nascimento from autores;';
            const autores = await db.query(sql);
            return response.status(200).json({confirma: 'Sucesso', nResults: autores[0].length, message: autores[0] });
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async create (request, response){
        try{

            const {autor_nome, autor_nascimento} = request.body; 
            const sql = 'INSERT into autores (autor_nome, autor_nascimento) VALUES (?,?,?)';
            const values = [autor_id, autor_nome, autor_nascimento];
            const confirmacao = await db.query(sql, values);
            const autor = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: autor});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const { autor_nome, autor_nascimento} = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const {autor_id } = request.params; 
                // instrução sql para atualização
            const sql = 'update autores set autor_nome= ? , autor_nascimento=? where autor_id=?;' 
                // definição de array com os parâmetros que receberam os valores do front-end
           const values = [ autor_nome, autor_nascimento, autor_id];   
                // executa a instrução de atualização no banco de dados    
            const atualizacao = await db.query(sql, values);
                // Mensagem de retorno no formato JSON
            return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },


async delete(request, response) { 
    try {
        const {autor_id} = request.params;    
        const sql = 'DELETE FROM autores WHERE autor_id = ?'; 
        const values = [autor_id];
        await db.query(sql, values);  
        return response.status(200).json({confirma: 'Sucesso', message:'Autor com id ' + autor_id + ' excluída com sucesso'}); 
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
    }        
},
 

    async listarAutores(request,response){
        try{

            const {autor_id = '%%'}= request.body;
            const{autor_nome= '%%'} = request.body;
            const{autor_nascimento= '%%'} = request.body; 

            const nome_autor = autor_nome === '%%' ? '%%' : '%' + autor_nome + '%';

            const {page= 1, limit= 5} = request.query;
            const inicio = (page -1) * limit;

            const sql= 'select autor_id, autor_nome, autor_nascimento from autores WHERE autor_id like ? AND autor_nome like ? LIMIT ?, ?';
            const values = [autor_id, autor_nome, inicio, parseInt(limit)];
            const autores = await db.query (sql, values);
            return response.status (200).json ({confirm: 'Sucesso', nResults:autores[0].length, message:autores[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
}
};