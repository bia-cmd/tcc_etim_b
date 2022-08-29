const {json} = require("express");
const db = require("../database/connection");

module.exports ={
    async listarLivGostei(request, response){
        try{
            return response.status(200).json({confirma: 'livros que gostei'});

        } catch (error) {
            return response.status(500).json({confirma: 'Erro', message: error});
                }
    },
};