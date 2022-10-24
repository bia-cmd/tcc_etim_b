//Maria Isabelly
const {json} = require("express");
const db = require("../database/connection");

module.exports ={
    async listarEditora(request, response){
        try{
            const sql = 'SELECT edit_id, edit_nome from editora;'
            const editora = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: editora[0].length, message: editora[0]});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },
    async create (request, response){
        try{

            const {edit_nome} = request.body; 
            const sql = 'INSERT into editora (edit_nome) VALUES (?,?,?)';
            const values = [edit_nome];
            const confirmacao = await db.query(sql, values);
            const editora = confirmacao[0].insertId;
            return response.status(200).json({confirma: 'Sucesso', message: editora});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
    async update(request, response) { 
        try {
                // parâmtros passados via corpo da requisição
            const { edit_nome} = request.body;
                // parâmetro passado via url na chamada da api pelo front-end
            const {edit_id} = request.params; 
                // instrução sql para atualização
            const sql = ' update editora set edit_nome= ?  where edit_id=?;' ;
                // definição de array com os parâmetros que receberam os valores do front-end
                const values = [ edit_nome, edit_id];   
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
            const { edit_id} = request.params;    
            const sql = 'DELETE FROM editora WHERE edit_id = ?'; 
            const values = [edit_id]; 
            await db.query(sql, values);  
            return response.status(200).json({confirma: 'Sucesso', message:'Editora com id ' + edit_id + ' excluída com sucesso'}); 
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
        }        
    },
    async Listareditora(request,response){
        try{

            const {edit_id = '%%'}= request.body;
            const{edit_nome= '%%'} = request.body;
    
            const nome_edit = edit_nome === '%%' ? '%%' : '%' + edit_nome+ '%';

            const {page= 1, limit= 5} = request.query;
            const inicio = (page -1) * limit;

            const sql= 'select edit_id, edit_nome from editora where edit_id like ? and  edit_id like ? limit ?,?; ';
            const values = [ edit_id,  edit_id, inicio, parseInt(limit)];
            const editora = await db.query (sql, values);
            return response.status (200).json ({confirm: 'Sucesso', nResults:editora[0].length, message: editora[0]});
        } catch(error){
            return response.status(500).json({confirma: 'Erro', message: error});
        }
}
};


