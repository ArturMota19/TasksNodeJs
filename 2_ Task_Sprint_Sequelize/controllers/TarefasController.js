const Tarefas = require('../models/Tarefas')

module.exports = class TarefasController {
    static createTarefas(req, res) {
        res.render('/addtarefas')
    }
    static showTarefas(req, res) {
        res.render('/tarefas')
    }
}