const Tarefas = require('../models/Tarefas')

module.exports = class TarefasController {
    static paginaCriarTarefas(req, res) {
        res.render('addtarefas')
    }
    static async criarTarefas(req, res) {
        const nome = req.body.nome;
        const prioridade = req.body.select;
        var prioridadeAlta = 0
        var prioridadeMedia = 0
        var prioridadeBaixa = 0
        if (prioridade == 'Alta') {
            prioridadeAlta = 1
        } else if (prioridade == 'Media') {
            prioridadeMedia = 1
        } else {
            prioridadeBaixa = 1
        }
        const tarefas = {
            nome: nome,
            prioridade: prioridade,
            prioridadeAlta: prioridadeAlta,
            prioridadeMedia: prioridadeMedia,
            prioridadeBaixa: prioridadeBaixa
        }
        await Tarefas.create(tarefas)
        res.redirect('/')
    }

    static async mostrarTarefas(req, res) {
        const tarefas = await Tarefas.findAll({ raw: true })
        res.render('tarefas', { tarefas })
    }
    static async prioridadeAlta(req, res) {
        const tarefas = await Tarefas.findAll({ raw: true, where: { prioridade: 'Alta' } })
        res.render('prioridadealta', { tarefas })
    }
    static async prioridadeMedia(req, res) {
        const tarefas = await Tarefas.findAll({ raw: true, where: { prioridade: 'Media' } })
        res.render('prioridademedia', { tarefas })
    }
    static async prioridadeBaixa(req, res) {
        const tarefas = await Tarefas.findAll({ raw: true, where: { prioridade: 'Baixa' } })
        res.render('prioridadebaixa', { tarefas })
    }
    static async editarId(req, res) {
        const id = req.params.id
        const tarefas = await Tarefas.findOne({ raw: true, where: { id: id } })
        res.render('editartarefa', { tarefas: tarefas })
    }
    static async paginaEditarId(req, res) {
        const id = req.body.id
        const nome = req.body.nome;
        const prioridade = req.body.select;
        var prioridadeAlta = 0
        var prioridadeMedia = 0
        var prioridadeBaixa = 0
        if (prioridade == 'Alta') {
            prioridadeAlta = 1
        } else if (prioridade == 'Media') {
            prioridadeMedia = 1
        } else {
            prioridadeBaixa = 1
        }
        const tarefaDados = {
            id,
            nome,
            prioridade,
            prioridadeAlta,
            prioridadeMedia,
            prioridadeBaixa
        }
        await Tarefas.update(tarefaDados, { where: { id: id } })
        res.redirect('/')
    }
    static async removerId(req, res) {
        const id = req.params.id
        await Tarefas.destroy({ where: { id: id } })
        res.redirect('/')
    }

}