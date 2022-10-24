//Maria Isabelly
const {json, response} = require("express");
const { request } = require("http");
const db = require("../database/connection");

module.exports = {

    async create (request, response){
        try{

            const {autor_nome, liv_id} = request.body; 
            const sql = 'insert into autor_livro (autor_id, liv_id) values (?, ?)';
            const values = [autor_nome, liv_id];
            const confirmacao = await db.query(sql, values);
            const autorLivro = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: autorLivro});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async listarAutorLivro(request,response){
        try{

            const {autor_id = '%%'}= request.body;
            const{liv_id= '%%'} = request.body;
    
            const nome_autor = autor_id === '%%' ? '%%' : '%' + autor_id + '%';

            const {page= 1, limit= 5} = request.query;
            const inicio = (page -1) * limit;

            const sql= 'select a.autor_id, a.liv_id  from autor_livro a inner join autores t on a.autor_id = t.autor_id  inner join livro l on a.liv_id = l.liv_id WHERE a.autor_id like ? AND a.liv_id like ? LIMIT ?, ?; ';
            const values = [ autor_id, liv_id, inicio, parseInt(limit)];
            const autorLivro = await db.query (sql, values);
            return response.status (200).json ({confirm: 'Sucesso', nResults:autorLivro[0].length, message: autorLivro[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
}
};


