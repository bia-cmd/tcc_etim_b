//nicolly
const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    
    async create(request, response){
        try {
          const { usu_id, liv_id, liv_nota } = request.body;
  
          const sql = 'INSERT INTO liv_avalidos (usu_id, liv_id, liv_nota) VALUES ( ?, ?, ?);';  
          const values = [usu_id, liv_id, liv_nota];  
          const confirmacao = await db.query(sql, values);  
  
          return response.status(200).json({confirma: 'Sucesso', message: {usu_id, liv_id}});
      } catch (error) {
          return response.status(500).json({confirma: 'Erro', message: error});
              }
  
  
  },

  async update(request, response) { 
    try {
            // parâmtros passados via corpo da requisição
        const { liv_id, liv_nota } = request.body;
            // parâmetro passado via url na chamada da api pelo front-end
        const { usu_id } = request.params; 
            // instrução sql para atualização
        const sql = 'UPDATE liv_avalidos SET liv_nota = ?, liv_id = ? WHERE usu_id = ?;';  
            // definição de array com os parâmetros que receberam os valores do front-end
        const values = [liv_id, liv_nota, usu_id,];   
            // executa a instrução de atualização no banco de dados    
        const atualizacao = await db.query(sql, values);
            // Mensagem de retorno no formato JSON
        return response.status(200).json({confirma: 'Sucesso', message: 'Dados atualizados'});            
    } catch (error) { 
        return response.status(500).json({confirma: 'Erro', message: error});
    }
}, 

async listarLivAvaliados(request, response) {
    try {

        const {liv_id = '%%'} = request.body; 
        const {usu_id = '%%'} = request.body;
        const {liv_nota = '%%'} = request.body;

        const nota_livro = liv_nota === '%%' ? '%%' : '%' + liv_nota + '%';
        
        const {page= 1, limit= 5} = request.body;
        const inicio = (page -1) * limit;

        const sql = 'select a.usu_id, a.liv_id, a.liv_nota FROM liv_avalidos a INNER JOIN usuario u ON a.usu_id = u.usu_id INNER JOIN livro l ON a.liv_id = l.liv_id WHERE a.liv_id like ? AND a.liv_nota LIKE ?';
        const values = [ liv_id, usu_id, liv_nota, inicio, parseInt(limit)];
        const liv_avalidos = await db.query(sql, values);

        return response.status(200).json({confirma: 'Sucesso', nResults: liv_avalidos[0].length, message: liv_avalidos[0]});
    } catch (error) {
        return response.status(500).json({confirma: 'Erro', message: error});
            }
    },
};
