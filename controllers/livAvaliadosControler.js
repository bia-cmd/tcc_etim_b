//nicolly
const {json} = require("express");
const db = require("../database/connection");

module.exports = {
    async listarLivAvaliados(request, response){
        try{
           const sql= 'SELECT usu_id, liv_id, liv_nota FROM liv_avalidos;';
           const liv_avalidos = await db.query(sql);

            return response.status(200).json({confirma: 'Sucesso', nResults: liv_avalidos[0].length, message: liv_avalidos[0]});
        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },

    async create(request, response){
        try {
          const { usuario, livros, nota } = request.body;
  
          const sql = 'INSERT INTO liv_avalidos (usu_id, liv_id, liv_nota) VALUES ( ?, ?, ?, ?);';
  
          const values = [usu_id, liv_id, liv_nota];
  
          const confirmacao = await db.query(sql, values);
  
          const liv_avalidos = confirmacao[0].insertId;
  
          return response.status(200).json({confirma: 'Sucesso', nResults: liv_avalidos[0].length, message: liv_avalidos[0]});
      } catch (error) {
          return response.status(500).json({confirma: 'Erro', message: error});
              }
  
  
  },
};