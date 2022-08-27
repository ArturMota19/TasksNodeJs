const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

const Tarefas = require('./models/Tarefas')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('public/images'));

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// POST PARA ADICIONAR TAREFA

app.post('/addTarefa', async(req, res) => {
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
    await Tarefas.create({ nome, prioridade, prioridadeAlta, prioridadeMedia, prioridadeBaixa })
    res.redirect('/')
})

// ROTA PRA ADICIONAR TAREFA
app.get('/add', (req, res) => {
    res.render('addtarefas')
})

// ROTA PRA PEGAR TODAS AS TAREFAS

app.get('/', async(req, res) => {
    const tarefas = await Tarefas.findAll({ raw: true })
    res.render('tarefas', { tarefas: tarefas })
})

// ROTAS PRA PRIORIDADES

app.get('/prioridadealta', async(req, res) => {
    const tarefas = await Tarefas.findOne({ where: { prioridade: 'Alta' } })
    res.render('prioridadealta', { tarefas: tarefas })
})

app.get('/prioridademedia', async(req, res) => {
    const tarefas = await Tarefas.findOne({ where: { prioridade: 'Media' } })
    res.render('prioridademedia', { tarefas: tarefas })
})

app.get('/prioridadebaixa', async(req, res) => {
    const tarefas = await Tarefas.findOne({ where: { prioridade: 'Baixa' } })
    res.render('prioridadebaixa', { tarefas: tarefas })
})

// ROTA PRA EDITAR TAREFA

app.get('/edit/:id', async(req, res) => {
    const id = req.params.id
    const tarefas = await Tarefas.findOne({ raw: true, where: { id: id } })
    res.render('editartarefa', { tarefas: tarefas })
})

app.post('/editartarefa', async(req, res) => {
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
})


// POST PARA REMOVER TAREFA
app.post('/remove/:id', async(req, res) => {
    const id = req.params.id
    await Tarefas.destroy({ where: { id: id } })
    res.redirect('/')
})

// Conexão

conn.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))