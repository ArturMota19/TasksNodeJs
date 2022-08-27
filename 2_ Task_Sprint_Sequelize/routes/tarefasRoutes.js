const express = require('express')
const router = express.Router()
const TarefasController = require('../controllers/TarefasController')

router.get('/add', TarefasController.createTarefas)
router.get('/', TarefasController.showTarefas)

module.exports = router