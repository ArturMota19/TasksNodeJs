const express = require('express')
const router = express.Router()
const TarefasController = require('../controllers/TarefasController')

router.get('/', TarefasController.mostrarTarefas)
router.get('/add', TarefasController.paginaCriarTarefas)
router.post('/addTarefa', TarefasController.criarTarefas)
router.get('/prioridadealta', TarefasController.prioridadeAlta)
router.get('/prioridademedia', TarefasController.prioridadeMedia)
router.get('/prioridadebaixa', TarefasController.prioridadeBaixa)
router.get('/prioridadebaixa', TarefasController.prioridadeBaixa)
router.get('/edit/:id', TarefasController.editarId)
router.post('/editartarefa', TarefasController.paginaEditarId)
router.post('/remove/:id', TarefasController.removerId)


module.exports = router