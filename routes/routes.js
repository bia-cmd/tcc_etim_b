const db =require("..database/connection");
const express = require('express');
const router = express.Router();

//importação dos controlers utilizados na rotas
const AutoresController =  require('../controllers/autoresController');
const usuarioController =  require('../controllers/usuarioController');
const autorLivroController = require('../controllers/autorLivroController');
const comentariosController =  require('../controllers/comentarioController');
const cursoController =  require('../controllers/cursoController');
const editoraController =  require('../controllers/editoraController');
const generoController =  require('../controllers/generoController');
const livAvaliadosController =  require('../controllers/livAvaliadosController');
const livGosteiController =  require('../controllers/livGosteiController');
const livrosController =  require('../controllers/livrosController');
const opcLivrosController =  require('../controllers/opcLivrosController');





// definição de rotas
router.get('/autores', AutoresController.listarAutores);
router.get('/usuario', usuarioController.listarUsuario);
router.get('/autorLivro',autorLivroController.listarAutorLivro);
router.get('/comentarios',comentariosController.listarComentarios);
router.get('/curso', cursoController.listarCurso);
router.get('/editora', editoraController.listarEditora);
router.get('/genero', generoController.listarGenero);
//router.get('/livAvaliados', livAvaliadosController.livAvaliadosController);
router.get('/autores', AutoresController.listarAutores);
router.get('/autores', AutoresController.listarAutores);
router.get('/autores', AutoresController.listarAutores);
//cadastar
//editar
//excluir

module.exports = router;

