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
router.post('/autores', AutoresController.create);
router.patch('/autores/:autor_id', AutoresController.update);
router.delete('/autores/:autor_id', AutoresController.delete);

router.get('/usuario', usuarioController.listarUsuarios);
//cadastar
//editar
//excluir

router.get('/autorLivro', autorLivroController.listarAutorLivro);
router.post('/autorLivro', autorLivroController.create);
// atualiza - não tem
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
router.post('/editora', editoraController.create);
router.patch('/editora/:edit_id', editoraController.update);
router.delete('/editora/:edit_id', editoraController.delete);

router.get('/genero', generoController.listarGenero);
//cadastar
//editar
//excluir

router.get('/livavaliados', livAvaliadosController.listarLivAvaliados);
//cadastar
//editar
//excluir

router.get('/livgostei', livGosteiController.listarLivGostei);
//cadastar
//editar
//excluir

router.get('/livros', livrosController.listarLivro);
//cadastar
//editar
//excluir

router.get('/opclivro', opcLivrosController.listarOpcLivro); 
//cadastar
//editar
//excluir


module.exports = router;

