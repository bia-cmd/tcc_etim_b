const db = require('../database/connection');
const express = require('express');
const router = express.Router();

//importação dos controlers utilizados na rotas
const AutoresController =  require('../controllers/autoresController');
const usuarioController =  require('../controllers/usuarioController');
const autorLivroController = require('../controllers/autorLivroController');
const comentariosController =  require('../controllers/comentariosController');
const cursoController =  require('../controllers/cursoController');
const editoraController =  require('../controllers/editoraController');
const generoController =  require('../controllers/generoController');
const livAvaliadosController =  require('../controllers/livAvaliadosControler');
const livGosteiController =  require('../controllers/livGosteiController');
const livrosController =  require('../controllers/livroController');
const opcLivrosController =  require('../controllers/opcLivrosController');


// definição de rotas
router.get('/autores', AutoresController.listarAutores);
//cadastar
//editar
//excluir

router.get('/usuario', usuarioController.listarUsuarios);
router.post('/usuario', usuarioController.create);
//editar
//excluir

router.get('/autorLivro', autorLivroController.listarAutorLivro);
//cadastar
//editar
//excluir

router.get('/comentarios', comentariosController.listarComentario);
//cadastar
//editar
//excluir

router.get('/curso', cursoController.listarCurso);
//cadastar
//editar
//excluir

router.get('/editora', editoraController.listarEditora);
//cadastar
//editar
//excluir

router.get('/genero', generoController.listarGenero);
//cadastar
//editar
//excluir

router.get('/livavaliados', livAvaliadosController.listarLivAvaliados);
//cadastar
//editar
//excluir

router.get('/livgostei', livGosteiController.listarLivGostei);
router.post('/livgostei', livGosteiController.create);
//editar
//excluir

router.get('/livros', livrosController.listarLivro);
//cadastar
//editar
//excluir

router.get('/opclivro', opcLivrosController.listarOpcLivro); 
router.post('/opclivro', opcLivrosController.create); 
//editar
//excluir


module.exports = router;

